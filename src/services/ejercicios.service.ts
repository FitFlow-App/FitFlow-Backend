import { PrismaClient, Ejercicio } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateEjercicioData {
  nombre: string;
  descripcion?: string;
  musculo?: string;
}

interface UpdateEjercicioData {
  nombre?: string;
  descripcion?: string;
  musculo?: string;
}

export const ejercicioService = {
  async getAll(): Promise<Ejercicio[]> {
    return prisma.ejercicio.findMany({
      include: {
        rutinas: {
          include: {
            rutina: true
          }
        }
      }
    });
  },

  async getById(id: number): Promise<Ejercicio | null> {
    return prisma.ejercicio.findUnique({
      where: { id },
      include: {
        rutinas: {
          include: {
            rutina: true
          }
        }
      }
    });
  },

  async create(data: CreateEjercicioData): Promise<Ejercicio> {
    return prisma.ejercicio.create({
      data,
      include: {
        rutinas: {
          include: {
            rutina: true
          }
        }
      }
    });
  },

  async update(id: number, data: UpdateEjercicioData): Promise<Ejercicio> {
    return prisma.ejercicio.update({
      where: { id },
      data,
      include: {
        rutinas: {
          include: {
            rutina: true
          }
        }
      }
    });
  },

  async delete(id: number): Promise<void> {
    // Primero eliminar las relaciones en RutinaEjercicio
    await prisma.rutinaEjercicio.deleteMany({
      where: { ejercicioId: id }
    });

    // Luego eliminar el ejercicio
    await prisma.ejercicio.delete({
      where: { id }
    });
  },

  async searchByMuscle(musculo: string): Promise<Ejercicio[]> {
    return prisma.ejercicio.findMany({
      where: {
        musculo: {
          contains: musculo,
          mode: 'insensitive'
        }
      },
      include: {
        rutinas: {
          include: {
            rutina: true
          }
        }
      }
    });
  }
};