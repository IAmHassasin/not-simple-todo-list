/*
  Warnings:

  - The `status` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `updatedAt` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "taskStatus" AS ENUM ('ToDo', 'InProgress', 'Done', 'Cancelled');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "status",
ADD COLUMN     "status" "taskStatus" NOT NULL DEFAULT 'ToDo',
ALTER COLUMN "updatedAt" SET NOT NULL;
