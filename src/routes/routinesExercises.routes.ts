import { Router } from 'express';
import * as routineExerciseController from '../controllers/routineExercises.controller';

const router = Router();

// Rutas para gestionar los ejercicios dentro de las rutinas

// Añadir un ejercicio a una rutina
router.post('/', routineExerciseController.addExerciseToRoutine);

// Obtener todos los ejercicios de una rutina específica
router.get(
  '/rutina/:rutinaId',
  routineExerciseController.getExercisesByRoutineId
);

// Actualizar los detalles de un ejercicio en una rutina (series, repeticiones, etc.)
router.put('/:id', routineExerciseController.updateExerciseInRoutine);

// Eliminar un ejercicio de una rutina
router.delete('/:id', routineExerciseController.removeExerciseFromRoutine);

export default router;
