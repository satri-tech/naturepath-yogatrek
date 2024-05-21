/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - The `emailVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" TIMESTAMP(3);
