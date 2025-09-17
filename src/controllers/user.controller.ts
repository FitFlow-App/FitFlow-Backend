import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { errorHandler } from '../middlewares/errorHandle';
import { logger } from '../middlewares/logger';

export const userController = {
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const user = await userService.getById(Number(req.params.id));

      console.log(req.params.id);
      user
        ? res.json(user)
        : res.status(404).json({ error: 'Usuario no encontrado' });
    } catch (error) {
      errorHandler(error, req, res, () => {});
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Error: el usuario ya existe' });
    }
  },

  async update(req: Request, res: Response) {
    logger(req, res, () => {});
    try {
      const user = await userService.update(Number(req.params.id), req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar usuario' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await userService.delete(Number(req.params.id));
      res.status(201).send({ message: 'Usuario eliminado.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  },

  async changePassword(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res
          .status(400)
          .json({ message: 'Se requiere la contraseña actual y la nueva.' });
      }

      await userService.changePassword(userId, currentPassword, newPassword);
      res.status(200).json({ message: 'Contraseña actualizada con éxito.' });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error.message || 'Error al cambiar la contraseña.' });
    }
  },
};
