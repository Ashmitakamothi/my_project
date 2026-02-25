import express from 'express';
import { getUsers, createUser, deleteUser, createProject, getProjects, assignEmployees, getServiceRequests, approveServiceRequest, getStats } from '../controllers/adminController';
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';

const router = express.Router();

router.use(protect);
router.use(authorize(UserRole.ADMIN));

router.get('/users', getUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);

router.get('/projects', getProjects);
router.post('/projects', createProject);
router.put('/projects/:id/assign', assignEmployees);

router.get('/service-requests', getServiceRequests);
router.put('/service-requests/:id/approve', approveServiceRequest);

router.get('/services', getServices);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

router.get('/stats', getStats);

export default router;
