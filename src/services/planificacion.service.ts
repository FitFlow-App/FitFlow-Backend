import { PrismaClient, PlanificacionSemanal, DiaPlanificado } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreatePlanificacionData {
  nombre: string;
  numero: number;
  usuarioId: number;
}

export interface UpdatePlanificacionData {
  nombre?: string;
  numero?: number;
  activa?: boolean;
}

export interface CreateDiaPlanificadoData {
  nombre: string;
  diaSemana: number;
  planificacionId: number;
  rutinaId: number;
}

export interface UpdateDiaPlanificadoData {
  nombre?: string;
  diaSemana?: number;
  rutinaId?: number;
  completado?: boolean;
  fecha?: Date;
}

export const planificacionService = {
  // Planificaciones
  async getAllByUsuario(usuarioId: number): Promise<PlanificacionSemanal[]> {
    return prisma.planificacionSemanal.findMany({
      where: { usuarioId },
      include: {
        dias: {
          include: {
            rutina: {
              include: {
                ejercicios: {
                  include: {
                    ejercicio: true
                  }
                }
              }
            }
          }
        }
      }
    });
  },

  async getById(id: number): Promise<PlanificacionSemanal | null> {
    return prisma.planificacionSemanal.findUnique({
      where: { id },
      include: {
        dias: {
          include: {
            rutina: {
              include: {
                ejercicios: {
                  include: {
                    ejercicio: true
                  }
                }
              }
            }
          }
        }
      }
    });
  },

  async create(data: CreatePlanificacionData): Promise<PlanificacionSemanal> {
    return prisma.planificacionSemanal.create({
      data,
      include: {
        dias: {
          include: {
            rutina: {
              include: {
                ejercicios: {
                  include: {
                    ejercicio: true
                  }
                }
              }
            }
          }
        }
      }
    });
  },

  async update(id: number, data: UpdatePlanificacionData): Promise<PlanificacionSemanal> {
    return prisma.planificacionSemanal.update({
      where: { id },
      data,
      include: {
        dias: {
          include: {
            rutina: {
              include: {
                ejercicios: {
                  include: {
                    ejercicio: true
                  }
                }
              }
            }
          }
        }
      }
    });
  },

  async delete(id: number): Promise<void> {
    await prisma.planificacionSemanal.delete({
      where: { id }
    });
  },

  async activatePlanificacion(usuarioId: number, planificacionId: number): Promise<void> {
    // Desactivar todas las planificaciones del usuario
    await prisma.planificacionSemanal.updateMany({
      where: { usuarioId },
      data: { activa: false }
    });

    // Activar la planificación específica
    await prisma.planificacionSemanal.update({
      where: { id: planificacionId },
      data: { activa: true }
    });
  },

  // Días planificados
  async createDia(data: CreateDiaPlanificadoData): Promise<DiaPlanificado> {
    return prisma.diaPlanificado.create({
      data,
      include: {
        rutina: {
          include: {
            ejercicios: {
              include: {
                ejercicio: true
              }
            }
          }
        }
      }
    });
  },

  async updateDia(id: number, data: UpdateDiaPlanificadoData): Promise<DiaPlanificado> {
    return prisma.diaPlanificado.update({
      where: { id },
      data,
      include: {
        rutina: {
          include: {
            ejercicios: {
              include: {
                ejercicio: true
              }
            }
          }
        }
      }
    });
  },

  async deleteDia(id: number): Promise<void> {
    await prisma.diaPlanificado.delete({
      where: { id }
    });
  },

  async getDiasByPlanificacion(planificacionId: number): Promise<DiaPlanificado[]> {
    return prisma.diaPlanificado.findMany({
      where: { planificacionId },
      include: {
        rutina: {
          include: {
            ejercicios: {
              include: {
                ejercicio: true
              }
            }
          }
        }
      }
    });
  },

  async getDiaById(id: number): Promise<DiaPlanificado | null> {
    return prisma.diaPlanificado.findUnique({
      where: { id },
      include: {
        rutina: {
          include: {
            ejercicios: {
              include: {
                ejercicio: true
              }
            }
          }
        }
      }
    });
  }
};