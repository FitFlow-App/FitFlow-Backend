import { Request, Response } from 'express';
import * as routineService from '../services/routines.service';

export const getAllRoutines = async (req: Request, res: Response) => {
  try {
    const routines = await routineService.getAll();
    res.status(200).json(routines);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoutineById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const routine = await routineService.getById(id);
    if (routine) {
      res.status(200).json(routine);
    } else {
      res.status(404).json({ message: 'Routine not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createRoutine = async (req: Request, res: Response) => {
  try {
    const newRoutine = await routineService.create(req.body);
    res.status(201).json(newRoutine);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRoutine = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updatedRoutine = await routineService.update(id, req.body);
    if (updatedRoutine) {
      res.status(200).json(updatedRoutine);
    } else {
      res.status(404).json({ message: 'Routine not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRoutine = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deletedRoutine = await routineService.remove(id);
    if (deletedRoutine) {
      res.status(200).json({ message: 'Routine deleted successfully' });
    } else {
      res.status(404).json({ message: 'Routine not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
