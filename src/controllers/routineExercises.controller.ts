import { Request, Response } from 'express';
import * as routineExerciseService from '../services/routineExercises.service';

export const addExerciseToRoutine = async (req: Request, res: Response) => {
  try {
    const { rutinaId, ejercicioId, series, repeticiones, peso } = req.body;

    // Validaciones básicas
    if (!rutinaId || !ejercicioId) {
      return res
        .status(400)
        .json({ message: 'rutinaId and ejercicioId are required' });
    }
    const data = {
      rutinaId: parseInt(rutinaId, 10),
      ejercicioId: parseInt(ejercicioId, 10),
      series: series ? parseInt(series, 10) : undefined,
      repeticiones: repeticiones ? parseInt(repeticiones, 10) : undefined,
      peso: peso ? String(peso) : undefined,
    };

    const newLink = await routineExerciseService.addExerciseToRoutine(data);
    res.status(201).json(newLink);
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Unique constraint failed
      res
        .status(409)
        .json({ message: 'This exercise is already in the routine.' });
    } else if (error.code === 'P2003') {
      // Foreign key constraint failed
      res.status(404).json({ message: 'Routine or Exercise not found.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getExercisesByRoutineId = async (req: Request, res: Response) => {
  try {
    const rutinaId = parseInt(req.params.rutinaId, 10);
    const exercises = await routineExerciseService.getExercisesByRoutineId(
      rutinaId
    );
    res.status(200).json(exercises);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExerciseInRoutine = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { series, repeticiones, peso } = req.body;

    // --- CORRECCIÓN AQUÍ ---
    const data = {
      series: series ? parseInt(series, 10) : undefined,
      repeticiones: repeticiones ? parseInt(repeticiones, 10) : undefined,
      peso: peso ? String(peso) : undefined, // Convertimos a string para cumplir con el tipo
    };

    const updatedLink = await routineExerciseService.updateExerciseInRoutine(
      id,
      data
    );
    res.status(200).json(updatedLink);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const removeExerciseFromRoutine = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id, 10);
    await routineExerciseService.removeExerciseFromRoutine(id);
    res.status(204).send(); // No Content
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
