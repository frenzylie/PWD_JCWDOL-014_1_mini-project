import { Router } from 'express';
import { 
    register,
    login,
    me
} from '../controllers/auth.controller';
import { verifyToken } from '../middleware/jwt.middleware';

const router = Router();

router.get('/me', verifyToken, me);
router.post('/register', register);
router.post('/login', login)

export default router;