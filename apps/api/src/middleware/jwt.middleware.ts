import { Request, Response, NextFunction } from 'express';
import { verify, Secret } from 'jsonwebtoken';
import { config } from 'dotenv';

config({ path: './.env.development' });

type User = {
  email: string;
  name: string;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const secret: Secret = process?.env?.JWT_SECRET as Secret;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const verifyUser = verify(token, secret);

    if (!verifyUser) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    req.user = verifyUser as User;

    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
    });
  }
}

export async function organizerGuard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (req.user?.role !== 'Organizer') {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: 'Error',
    });
  }
}
