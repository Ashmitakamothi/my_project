import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { UserRole } from '../models/User';
import Project from '../models/Project';
import ServiceRequest, { RequestStatus } from '../models/ServiceRequest';

// User Management
export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find({ role: { $ne: UserRole.ADMIN } });
    res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, role, clientCompany } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            clientCompany,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
};

// Project Management
export const createProject = async (req: Request, res: Response) => {
    const { name, description, client, assignedEmployees } = req.body;
    const project = await Project.create({ name, description, client, assignedEmployees });
    res.status(201).json(project);
};

export const getProjects = async (req: Request, res: Response) => {
    const projects = await Project.find().populate('client', 'name email').populate('assignedEmployees', 'name email');
    res.json(projects);
};

export const assignEmployees = async (req: Request, res: Response) => {
    const { employeeIds } = req.body;
    const project = await Project.findByIdAndUpdate(req.params.id, { assignedEmployees: employeeIds }, { new: true });
    res.json(project);
};

// Service Requests
export const getServiceRequests = async (req: Request, res: Response) => {
    const requests = await ServiceRequest.find()
        .populate('client', 'name email')
        .populate('service', 'name');
    res.json(requests);
};

export const approveServiceRequest = async (req: Request, res: Response) => {
    const request = await ServiceRequest.findById(req.params.id).populate('service');
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = RequestStatus.APPROVED;
    await request.save();

    // Automatically create a project when approved
    const project = await Project.create({
        name: (request.service as any).name,
        description: request.description,
        client: request.client,
    });

    res.json({ request, project });
};


// Dashboard Stats
export const getStats = async (req: Request, res: Response) => {
    const projectsCount = await Project.countDocuments();
    const employeesCount = await User.countDocuments({ role: UserRole.EMPLOYEE });
    const clientsCount = await User.countDocuments({ role: UserRole.CLIENT });
    const pendingRequestsCount = await ServiceRequest.countDocuments({ status: RequestStatus.PENDING });

    res.json({ projectsCount, employeesCount, clientsCount, pendingRequestsCount });
};
