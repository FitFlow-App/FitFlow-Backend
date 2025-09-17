import { PrismaClient, Usuario } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface CreateUserData {
  nombre: string;
  email: string;
  password: string;
}

interface UpdateUserData {
  nombre?: string;
  email?: string;
  password?: string;
}

export const userService = {
  async getAll(): Promise<Omit<Usuario, 'password'>[]> {
    return prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        rutinas: true,
      },
    });
  },

  async getById(id: number): Promise<Omit<Usuario, 'password'> | null> {
    return prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        rutinas: true,
      },
    });
  },

  async create(data: CreateUserData): Promise<Omit<Usuario, 'password'>> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.usuario.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        rutinas: true,
      },
    });
  },

  async update(
    id: number,
    data: UpdateUserData
  ): Promise<Omit<Usuario, 'password'>> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.usuario.update({
      where: { id },
      data,
      select: {
        id: true,
        nombre: true,
        email: true,
        rutinas: true,
      },
    });
  },

  async delete(id: number): Promise<void> {
    await prisma.usuario.delete({
      where: { id },
    });
  },

  async changePassword(
    id: number,
    oldPass: string,
    newPass: string
  ): Promise<boolean> {
    const user = await prisma.usuario.findUnique({ where: { id } });
    if (!user) {
      throw new Error('Usuario no encontrado.');
    }

    const isMatch = await bcrypt.compare(oldPass, user.password);
    if (!isMatch) {
      throw new Error('La contraseña actual es incorrecta.');
    }

    const hashedNewPassword = await bcrypt.hash(newPass, 10);

    await prisma.usuario.update({
      where: { id },
      data: { password: hashedNewPassword },
    });

    return true;
  },
};
