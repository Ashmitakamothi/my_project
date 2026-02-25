import express from 'express';
import { login, getMe } from '../controllers/authController';
import { updateProfile } from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);



export default router;
