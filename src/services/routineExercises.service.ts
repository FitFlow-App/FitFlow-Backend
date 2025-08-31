import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interface para los datos de la relación
export interface RoutineExerciseData {
  rutinaId: number;
  ejercicioId: number;
  series?: number;
  repeticiones?: number;
  peso?: string;
}

export const addExerciseToRoutine = async (data: RoutineExerciseData) => {
  // Convert 'peso' from string to number if present
  const { peso, ...rest } = data;
  return await prisma.rutinaEjercicio.create({
    data: {
      ...rest,
      peso: peso !== undefined ? Number(peso) : undefined,
    },
  });
};

export const getExercisesByRoutineId = async (rutinaId: number) => {
  return await prisma.rutinaEjercicio.findMany({
    where: { rutinaId },
    include: {
      // Incluimos los detalles del ejercicio para que sea más útil
      ejercicio: true,
    },
  });
};

export const updateExerciseInRoutine = async (
  id: number,
  data: Partial<RoutineExerciseData>
) => {
  // Exclude 'rutinaId' and 'ejercicioId' from update data
  const { rutinaId, ejercicioId, peso, ...rest } = data;
  return await prisma.rutinaEjercicio.update({
    where: { id },
    data: {
      ...rest,
      ...(peso !== undefined ? { peso: Number(peso) } : {}),
    },
  });
};

export const removeExerciseFromRoutine = async (id: number) => {
  return await prisma.rutinaEjercicio.delete({
    where: { id },
  });
};
