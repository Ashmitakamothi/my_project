import { Request, Response } from 'express';
import Service from '../models/Service';

export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createService = async (req: Request, res: Response) => {
    try {
        const { name, description, price } = req.body;
        const service = await Service.create({ name, description, price });
        res.status(201).json(service);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateService = async (req: Request, res: Response) => {
    try {
        const { name, description, price } = req.body;
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            { name, description, price },
            { new: true }
        );
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteService = async (req: Request, res: Response) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json({ message: 'Service deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
