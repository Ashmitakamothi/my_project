import express from 'express';
import { sendMessage, getMessages, getChatUsers } from '../controllers/messageController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.get('/users', getChatUsers);
router.post('/', sendMessage);
router.get('/:otherUserId', getMessages);




export default router;
