import express from 'express';
import { getMyProjects, updateProjectStatus } from '../controllers/employeeController';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';

const router = express.Router();

router.use(protect);
router.use(authorize(UserRole.EMPLOYEE));

router.get('/projects', getMyProjects);
router.put('/projects/:id/status', updateProjectStatus);

export default router;
