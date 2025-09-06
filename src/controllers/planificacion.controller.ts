import { Request, Response } from 'express';
import { planificacionService } from '../services/planificacion.service';

export const planificacionController = {
  async getAllByUsuario(req: Request, res: Response) {
    try {
      const usuarioId = parseInt(req.params.usuarioId);
      const planificaciones = await planificacionService.getAllByUsuario(usuarioId);
      res.json(planificaciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener planificaciones' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const planificacion = await planificacionService.getById(Number(req.params.id));
      planificacion ? res.json(planificacion) : res.status(404).json({ error: 'Planificación no encontrada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener planificación' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { nombre, numero, usuarioId } = req.body;

      if (!nombre || !numero || !usuarioId) {
        return res.status(400).json({ error: 'Nombre, número y usuarioId son requeridos' });
      }

      const planificacion = await planificacionService.create({ nombre, numero, usuarioId });
      res.status(201).json(planificacion);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear planificación' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const planificacion = await planificacionService.update(Number(req.params.id), req.body);
      res.json(planificacion);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar planificación' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await planificacionService.delete(Number(req.params.id));
      res.status(200).send({ message: 'Planificación eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar planificación' });
    }
  },

  async activate(req: Request, res: Response) {
    try {
      const { usuarioId } = req.body;
      await planificacionService.activatePlanificacion(usuarioId, Number(req.params.id));
      res.status(200).send({ message: 'Planificación activada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al activar planificación' });
    }
  },

  // Métodos para días planificados
  async createDia(req: Request, res: Response) {
    try {
      const { nombre, diaSemana, planificacionId, rutinaId } = req.body;

      if (!nombre || !diaSemana || !planificacionId || !rutinaId) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      const dia = await planificacionService.createDia({ nombre, diaSemana, planificacionId, rutinaId });
      res.status(201).json(dia);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear día planificado' });
    }
  },

  async updateDia(req: Request, res: Response) {
    try {
      const dia = await planificacionService.updateDia(Number(req.params.id), req.body);
      res.json(dia);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar día planificado' });
    }
  },

  async deleteDia(req: Request, res: Response) {
    try {
      await planificacionService.deleteDia(Number(req.params.id));
      res.status(200).send({ message: 'Día planificado eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar día planificado' });
    }
  },

  async getDiasByPlanificacion(req: Request, res: Response) {
    try {
      const dias = await planificacionService.getDiasByPlanificacion(Number(req.params.planificacionId));
      res.json(dias);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener días planificados' });
    }
  },

  async getDiaById(req: Request, res: Response) {
    try {
      const dia = await planificacionService.getDiaById(Number(req.params.id));
      dia ? res.json(dia) : res.status(404).json({ error: 'Día planificado no encontrado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener día planificado' });
    }
  }
};