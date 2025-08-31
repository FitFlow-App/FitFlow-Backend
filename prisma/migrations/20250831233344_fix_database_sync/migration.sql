/*
  Warnings:

  - The primary key for the `RutinaEjercicio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[rutinaId,ejercicioId]` on the table `RutinaEjercicio` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RutinaEjercicio" DROP CONSTRAINT "RutinaEjercicio_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "RutinaEjercicio_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "RutinaEjercicio_rutinaId_ejercicioId_key" ON "RutinaEjercicio"("rutinaId", "ejercicioId");
