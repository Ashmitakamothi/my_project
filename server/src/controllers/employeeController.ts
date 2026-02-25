import { Request, Response } from 'express';
import Project, { ProjectStatus } from '../models/Project';

export const getMyProjects = async (req: any, res: Response) => {
    const projects = await Project.find({ assignedEmployees: req.user._id }).populate('client', 'name email');
    res.json(projects);
};

export const updateProjectStatus = async (req: any, res: Response) => {
    const { status } = req.body;
    const project = await Project.findOneAndUpdate(
        { _id: req.params.id, assignedEmployees: req.user._id },
        { status },
        { new: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found or not assigned to you' });
    res.json(project);
};
