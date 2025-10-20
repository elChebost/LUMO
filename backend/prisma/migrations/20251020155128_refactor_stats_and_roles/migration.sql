-- Migration: Refactor student stats and add role tracking
-- CreateTable for new columns and rename statWriting to statLanguage

-- Step 1: Add new columns to Student table
ALTER TABLE "Student" ADD COLUMN "statLanguage" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Student" ADD COLUMN "rolesLogicCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Student" ADD COLUMN "rolesCreativityCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Student" ADD COLUMN "rolesLanguageCount" INTEGER NOT NULL DEFAULT 0;

-- Step 2: Copy data from statWriting to statLanguage
UPDATE "Student" SET "statLanguage" = "statWriting";

-- Step 3: Drop the old statWriting column
PRAGMA foreign_keys=off;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "ci" TEXT,
    "age" INTEGER NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "schedule" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "statLogic" INTEGER NOT NULL DEFAULT 0,
    "statCreativity" INTEGER NOT NULL DEFAULT 0,
    "statLanguage" INTEGER NOT NULL DEFAULT 0,
    "rolesLogicCount" INTEGER NOT NULL DEFAULT 0,
    "rolesCreativityCount" INTEGER NOT NULL DEFAULT 0,
    "rolesLanguageCount" INTEGER NOT NULL DEFAULT 0,
    "avgTimeMinutes" INTEGER NOT NULL DEFAULT 0,
    "missionsCompleted" INTEGER NOT NULL DEFAULT 0,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "new_Student" SELECT "id", "name", "email", "password", "ci", "age", "level", "xp", "schedule", "schoolId", "teacherId", "classroomId", "statLogic", "statCreativity", "statLanguage", "rolesLogicCount", "rolesCreativityCount", "rolesLanguageCount", "avgTimeMinutes", "missionsCompleted", "isOnline" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
CREATE UNIQUE INDEX "Student_ci_key" ON "Student"("ci");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=on;

-- Step 4: Add new columns to StudentMissionProgress
ALTER TABLE "StudentMissionProgress" ADD COLUMN "selectedRoleName" TEXT;
ALTER TABLE "StudentMissionProgress" ADD COLUMN "completedAt" DATETIME;
