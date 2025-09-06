// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // 1. Crear usuario por defecto
  const hashedPassword = await bcrypt.hash('12345', 10);
  
  const user = await prisma.usuario.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      nombre: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
    },
  });

  console.log('Usuario creado/actualizado:', user);

  // 2. Crear ejercicios de ejemplo (simplificado)
  const ejerciciosData = [
    {
      nombre: 'Press de banca',
      descripcion: 'Ejercicio para pecho',
      musculo: 'Pecho',
    },
    {
      nombre: 'Sentadillas',
      descripcion: 'Ejercicio para piernas',
      musculo: 'Piernas',
    },
    {
      nombre: 'Dominadas',
      descripcion: 'Ejercicio para espalda',
      musculo: 'Espalda',
    },
  ];

  const ejercicios: Awaited<ReturnType<typeof prisma.ejercicio.findFirst>>[] = [];
  for (const data of ejerciciosData) {
    // Try to find the ejercicio by nombre first
    let ejercicio = await prisma.ejercicio.findFirst({
      where: { nombre: data.nombre },
    });

    if (!ejercicio) {
      ejercicio = await prisma.ejercicio.create({
        data: data,
      });
    }

    ejercicios.push(ejercicio);
  }

  console.log('Ejercicios creados:', ejercicios.length);

  // 3. Crear rutina de ejemplo
  // Buscar rutina por nombre para obtener el id
  let rutinaExistente = await prisma.rutina.findFirst({
    where: { nombre: 'Rutina Inicial' },
  });

  const rutina = await prisma.rutina.upsert({
    where: rutinaExistente ? { id: rutinaExistente.id } : { id: 0 }, // id: 0 nunca existirá, for create
    update: {},
    create: {
      nombre: 'Rutina Inicial',
      descripcion: 'Rutina básica para empezar',
      usuarioId: user.id,
      ejercicios: {
        create: [
          {
            ejercicioId: ejercicios[0]?.id ?? 0,
            series: 4,
            repeticiones: 10,
            peso: 60.5,
          },
          {
            ejercicioId: ejercicios[1]?.id ?? 0,
            series: 4,
            repeticiones: 12,
            peso: 70.0,
          },
        ],
      },
    },
    include: {
      ejercicios: {
        include: {
          ejercicio: true,
        },
      },
    },
  });

  console.log('Rutina creada:', rutina.nombre);

  // 4. Crear planificación semanal
  const planificacion = await prisma.planificacionSemanal.upsert({
    where: { usuarioId_numero: { usuarioId: user.id, numero: 1 } },
    update: {},
    create: {
      nombre: 'Semana 1 - Inicio',
      numero: 1,
      usuarioId: user.id,
      activa: true,
      dias: {
        create: [
          {
            nombre: 'Lunes - Pecho y Espalda',
            diaSemana: 1,
            rutinaId: rutina.id,
          },
          {
            nombre: 'Miércoles - Piernas',
            diaSemana: 3,
            rutinaId: rutina.id,
          },
        ],
      },
    },
    include: {
      dias: {
        include: {
          rutina: true,
        },
      },
    },
  });

  console.log('Planificación creada:', planificacion.nombre);
  console.log('Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });