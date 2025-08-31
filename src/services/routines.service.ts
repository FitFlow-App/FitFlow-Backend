import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tipos para los datos de la rutina
interface RoutineData {
  nombre: string;
  descripcion?: string;
  usuarioId: number;
}

export const getAll = async () => {
  return await prisma.rutina.findMany();
};

export const getById = async (id: number) => {
  return await prisma.rutina.findUnique({
    where: { id },
  });
};

export const create = async (data: RoutineData) => {
  return await prisma.rutina.create({
    data,
  });
};

export const update = async (id: number, data: Partial<RoutineData>) => {
  return await prisma.rutina.update({
    where: { id },
    data,
  });
};

export const remove = async (id: number) => {
  return await prisma.rutina.delete({
    where: { id },
  });
};
