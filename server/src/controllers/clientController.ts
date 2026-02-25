import { Request, Response } from 'express';
import Project from '../models/Project';
import ServiceRequest from '../models/ServiceRequest';

export const getMyProjects = async (req: any, res: Response) => {
    const projects = await Project.find({ client: req.user._id }).populate('assignedEmployees', 'name email');
    res.json(projects);
};

export const createServiceRequest = async (req: any, res: Response) => {
    const { service, description } = req.body;
    const request = await ServiceRequest.create({
        service,
        description,
        client: req.user._id,
    });

    res.status(201).json(request);
};
