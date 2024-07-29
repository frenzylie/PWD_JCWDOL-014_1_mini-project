import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Failed to fetch event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};
export const createEvent = async (req: Request, res: Response) => {
  const { title, description, location, date, price, capacity, type, organizerId } = req.body;
  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        location,
        date: new Date(date),
        price,
        capacity,
        type,
        organizerId,
      },
    });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Failed to create event', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};


export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, location, date, price, capacity, type, organizerId } = req.body;

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        location,
        date: new Date(date),
        price,
        capacity,
        type,
        organizerId,
      },
    });
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Failed to update event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.event.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Failed to delete event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

export const createPromotion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, details } = req.body;

  try {
    const newPromotion = await prisma.promotion.create({
      data: {
        name,
        details,
      },
    });
    res.status(201).json(newPromotion);
  } catch (error) {
    console.error('Failed to create promotion:', error);
    res.status(500).json({ error: 'Failed to create promotion' });
  }
};

export const createReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment, userId } = req.body;

  if (!rating || !comment || !userId) {
    return res.status(400).json({ error: 'Rating, comment, and userId are required' });
  }

  try {
    const newReview = await prisma.review.create({
      data: {
        rating,
        comment,
        eventId: Number(id),
        userId,
      },
    });
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Failed to create review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};
