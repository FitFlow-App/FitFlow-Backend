import { Router } from 'express';
import {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  updateRoutine,
  deleteRoutine,
} from '../controllers/routines.controller';

const router = Router();

router.get('/', getAllRoutines);
router.get('/:id', getRoutineById);
router.post('/', createRoutine);
router.put('/:id', updateRoutine);
router.delete('/:id', deleteRoutine);

export default router;
