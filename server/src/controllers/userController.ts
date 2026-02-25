import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export const updateProfile = async (req: any, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name && name.trim()) user.name = name;
        if (email && email.trim()) user.email = email;
        if (password && password.trim()) user.password = await bcrypt.hash(password, 10);

        await user.save();


        res.json({ message: 'Profile updated successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

