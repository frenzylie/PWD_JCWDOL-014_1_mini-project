import { Router } from 'express';
import { buyTicket } from '../controllers/transaction.controller';
import { verifyToken } from '../middleware/jwt.middleware';

const router = Router();

router.post('/buy-ticket', verifyToken, buyTicket);

export default router;