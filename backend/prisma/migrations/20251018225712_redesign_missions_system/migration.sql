/*
  Warnings:

  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `activationDate` on the `Mission` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Mission` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Mission` table. All the data in the column will be lost.
  - You are about to drop the column `dueTime` on the `Mission` table. All the data in the column will be lost.
  - You are about to drop the column `narrative` on the `Mission` table. All the data in the column will be lost.
  - You are about to drop the column `previewImage` on the `Mission` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Mission` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Mission` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Mission` table. All the data in the column will be lost.
  - Added the required column `descripcionBreve` to the `Mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaFin` to the `Mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicio` to the `Mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `historia` to the `Mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roles` to the `Mission` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Activity";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcionBreve" TEXT NOT NULL,
    "historia" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    "imagenURL" TEXT,
    "estado" TEXT NOT NULL,
    "roles" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Mission_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Mission" ("createdAt", "id", "teacherId", "updatedAt") SELECT "createdAt", "id", "teacherId", "updatedAt" FROM "Mission";
DROP TABLE "Mission";
ALTER TABLE "new_Mission" RENAME TO "Mission";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
