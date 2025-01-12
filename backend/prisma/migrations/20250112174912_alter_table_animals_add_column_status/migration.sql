-- CreateEnum
CREATE TYPE "AnimalStatus" AS ENUM ('available', 'adopted', 'removed');

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "status" "AnimalStatus" NOT NULL DEFAULT 'available';
