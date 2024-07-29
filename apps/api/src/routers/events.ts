import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  createPromotion,
  createReview,
} from '../controllers/events.controller';
import { verifyToken } from '../middleware/jwt.middleware';

const router = express.Router();

router.get('/events', getEvents);
router.get('/events/:id', getEventById);
router.post('/events', verifyToken, createEvent);
router.put('/events/:id', verifyToken, updateEvent);
router.delete('/events/:id', verifyToken, deleteEvent);
router.post('/events/:id/promotions', verifyToken, createPromotion);
router.post('/events/:id/reviews', verifyToken, createReview);

export default router;
