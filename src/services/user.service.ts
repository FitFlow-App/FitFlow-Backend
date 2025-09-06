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
};
