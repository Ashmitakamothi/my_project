import { Request, Response } from 'express';
import Message from '../models/Message';
import User, { UserRole } from '../models/User';

export const getChatUsers = async (req: any, res: Response) => {
    try {
        // For simplicity, allow discovery of all users except the current one
        // In a production app, you might only show project members or admins
        const users = await User.find({ _id: { $ne: req.user._id } }).select('name role email');
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const sendMessage = async (req: any, res: Response) => {
    const { receiverId, content } = req.body;
    const message = await Message.create({
        sender: req.user._id,
        receiver: receiverId,
        content,
    });
    res.status(201).json(message);
};



export const getMessages = async (req: any, res: Response) => {
    const { otherUserId } = req.params;
    const messages = await Message.find({
        $or: [
            { sender: req.user._id, receiver: otherUserId },
            { sender: otherUserId, receiver: req.user._id },
        ],
    }).sort({ createdAt: 1 });
    res.json(messages);
};
