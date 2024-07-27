import { Request, Response } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';

const prisma = new PrismaClient();
config({ path: './.env.development' });

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role, referredByNum } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(500).json({
        message: 'Email already registered',
      });
    }

    if (!Object.values(Role).includes(role)) {
      return res.status(400).json({
        message: 'Please choose between customer or organizer',
      });
    }

    if (referredByNum) {
      const referredBy = await prisma.user.findFirst({
        where: {
          ownReferralNum: referredByNum,
        },
      });
      if (!referredBy) {
        return res.status(400).json({
          message: 'Invalid referral number',
        });
      }
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
      ownReferralNum: Math.floor(Math.random() * 1000000000000000).toString(),
      referredByNum: referredByNum === '' ? null : referredByNum,
    };

    const newUser = await prisma.user.create({
      data: userData,
    });

    if (referredByNum) {
      const referredBy = await prisma.user.findFirst({
        where: {
          ownReferralNum: referredByNum,
        },
      });
        
      if (referredBy) {
        const pointsToAdd = 10000;
        const expiryDate = new Date(new Date().setMonth(new Date().getMonth() + 3));
      
        const existingUser = await prisma.pointTransaction.findFirst({
          where: {
            userId: referredBy.id,
          },
        });
      
        if (existingUser) {
          await prisma.pointTransaction.update({
            where: {
              id: existingUser.id,
            },
            data: {
              points: {
                increment: pointsToAdd,
              },
              expiryDate: expiryDate,
            },
          });
        } else {
          await prisma.pointTransaction.create({
            data: {
              userId: referredBy.id,
              points: pointsToAdd,
              expiryDate: expiryDate,
            },
          });
        }

        await prisma.coupon.create({
          data: {
            userId: newUser.id,
            expiryDate: new Date(
              new Date().setMonth(new Date().getMonth() + 3),
            ),
          },
        });
      }
    }

    return res.status(201).json({
      message: 'User created',
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }

    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined. Please check your .env file.');
      return res.status(500).json({ message: 'Internal server error' });
    }

    const token = await sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      message: 'User logged in',
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

export async function me(req: Request, res: Response) {
  const user = {
    name: req.user?.name,
    email: req.user?.email,
  };

  return res.status(200).json({
    message: 'User found',
    data: user,
  });
}
