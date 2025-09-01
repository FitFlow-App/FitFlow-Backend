import { Request, Response } from 'express';
import { ejercicioService } from '../services/ejercicios.service';

export const ejercicioController = {
  async getAll(req: Request, res: Response) {
    try {
      const { musculo } = req.query;

      if (musculo && typeof musculo === 'string') {
        const ejercicios = await ejercicioService.searchByMuscle(musculo);
        return res.json(ejercicios);
      }

      const ejercicios = await ejercicioService.getAll();
      res.json(ejercicios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener ejercicios' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const ejercicio = await ejercicioService.getById(Number(req.params.id));
      ejercicio ? res.json(ejercicio) : res.status(404).json({ error: 'Ejercicio no encontrado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener ejercicio' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { nombre, descripcion, musculo } = req.body;

      if (!nombre) {
        return res.status(400).json({ error: 'El nombre es requerido' });
      }

      const ejercicio = await ejercicioService.create({ nombre, descripcion, musculo });
      res.status(201).json(ejercicio);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear ejercicio' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const ejercicio = await ejercicioService.update(Number(req.params.id), req.body);
      res.json(ejercicio);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar ejercicio' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await ejercicioService.delete(Number(req.params.id));
      res.status(201).send({ message: 'Ejercicio eliminado.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar ejercicio' });
    }
  }
};