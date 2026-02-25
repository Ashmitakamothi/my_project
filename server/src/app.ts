import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import employeeRoutes from './routes/employeeRoutes';
import clientRoutes from './routes/clientRoutes';
import messageRoutes from './routes/messageRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
    res.send('Ashmita Software Solutions API is running...');
});


export default app;
