import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function buyTicket(req: Request, res: Response) {
  try {
    const { eventId, ticketAmount, useCoupon, usePoints } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.occupancy + ticketAmount > event.capacity) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    let totalPrice = event.price * ticketAmount;
    let discount = 0;
    let couponId = null;
    let pointsToUse = 0;

    if (useCoupon) {
      const coupon = await prisma.coupon.findFirst({
        where: {
          userId: userId,
          transactionId: null,
        },
      });
      if (coupon) {
        discount = totalPrice * 0.1;
        couponId = coupon.id;
      } else {
        return res
          .status(400)
          .json({ message: 'Invalid or coupon already used' });
      }
    } else if (usePoints) {
      const pointTransactions = await prisma.pointTransaction.findMany({
        where: {
          userId,
          expiryDate: {
            gte: new Date(),
          },
        },
        select: { id: true, points: true },
      });

      const totalPoints = pointTransactions.reduce(
        (acc, pt) => acc + pt.points,
        0,
      );

      if (totalPoints > 0) {
        const pointsToUse = Math.min(totalPoints, totalPrice);
        discount += pointsToUse;

        let remainingPointsToUse = pointsToUse;

        for (const transaction of pointTransactions) {
          if (remainingPointsToUse <= 0) break;

          const pointsToDeduct = Math.min(
            transaction.points,
            remainingPointsToUse,
          );
          remainingPointsToUse -= pointsToDeduct;

          await prisma.pointTransaction.update({
            where: { id: transaction.id },
            data: { points: { decrement: pointsToDeduct } },
          });
        }
      } else {
        return res.status(400).json({ message: 'No points available' });
      }
    }

    totalPrice -= discount;

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        subtotal: totalPrice,
        couponId: useCoupon ? couponId : null,
      },
    });

    if (useCoupon && couponId !== null) {
      await prisma.coupon.update({
        where: { id: couponId },
        data: { transactionId: transaction.id },
      });
    }

    const tickets = [];
    for (let i = 0; i < ticketAmount; i++) {
      tickets.push({
        eventId,
        userId,
        price: event.price,
        transactionId: transaction.id,
      });
    }

    await prisma.ticket.createMany({ data: tickets });

    await prisma.event.update({
      where: { id: eventId },
      data: { occupancy: event.occupancy + ticketAmount },
    });

    return res.status(201).json({
      message: 'Tickets purchased successfully',
      transaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
