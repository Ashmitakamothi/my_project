import express from 'express';
import { getMyProjects, createServiceRequest } from '../controllers/clientController';
import { getServices } from '../controllers/serviceController';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';

const router = express.Router();

router.use(protect);
router.use(authorize(UserRole.CLIENT));

router.get('/projects', getMyProjects);
router.post('/service-request', createServiceRequest);
router.get('/services', getServices);

export default router;
