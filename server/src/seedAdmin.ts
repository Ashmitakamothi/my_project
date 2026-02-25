import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User, { UserRole } from './models/User';
import connectDB from './config/db';

dotenv.config();

const seedAdmin = async () => {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ashmita.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
        console.log('Admin already seeded');
        process.exit();
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
        name: 'Ashmita Admin',
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMIN,
    });

    console.log('Admin user created successfully');
    process.exit();
};

seedAdmin();
