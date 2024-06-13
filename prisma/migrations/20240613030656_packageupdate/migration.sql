/*
  Warnings:

  - Added the required column `Duration` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PrivatePrice` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SharingPrice` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "Duration" TEXT NOT NULL,
ADD COLUMN     "PrivateOffer" TEXT,
ADD COLUMN     "PrivatePrice" TEXT NOT NULL,
ADD COLUMN     "SharingOffer" TEXT,
ADD COLUMN     "SharingPrice" TEXT NOT NULL;
