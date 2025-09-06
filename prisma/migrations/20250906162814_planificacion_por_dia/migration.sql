-- CreateTable
CREATE TABLE "PlanificacionSemanal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PlanificacionSemanal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaPlanificado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "diaSemana" INTEGER NOT NULL,
    "planificacionId" INTEGER NOT NULL,
    "rutinaId" INTEGER NOT NULL,
    "completado" BOOLEAN NOT NULL DEFAULT false,
    "fecha" TIMESTAMP(3),

    CONSTRAINT "DiaPlanificado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanificacionSemanal_usuarioId_numero_key" ON "PlanificacionSemanal"("usuarioId", "numero");

-- CreateIndex
CREATE UNIQUE INDEX "DiaPlanificado_planificacionId_diaSemana_key" ON "DiaPlanificado"("planificacionId", "diaSemana");

-- AddForeignKey
ALTER TABLE "PlanificacionSemanal" ADD CONSTRAINT "PlanificacionSemanal_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaPlanificado" ADD CONSTRAINT "DiaPlanificado_planificacionId_fkey" FOREIGN KEY ("planificacionId") REFERENCES "PlanificacionSemanal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaPlanificado" ADD CONSTRAINT "DiaPlanificado_rutinaId_fkey" FOREIGN KEY ("rutinaId") REFERENCES "Rutina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
