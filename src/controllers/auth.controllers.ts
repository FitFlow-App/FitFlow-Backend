import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { error } from 'console';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET!;

const prisma = new PrismaClient();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar usuario
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }
    // 2. Verificar password
    const verificarPassword = await bcrypt.compare(password, user.password);

    if (!verificarPassword) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    // 3. Crear token
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login exitoso', token, userId: user.id });
  } catch (err) {
    res.status(500).json({ error: 'Error en el login' });
  }
};
