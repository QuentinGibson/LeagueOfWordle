-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '/img/defaultProfile.webp',
    "plays" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "loses" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Champion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "healthRate" DECIMAL NOT NULL,
    "attack" INTEGER NOT NULL,
    "attackRate" DECIMAL NOT NULL,
    "attackSpeed" DECIMAL NOT NULL,
    "moveSpeed" INTEGER NOT NULL,
    "roleId" TEXT NOT NULL,
    "subRoleId" TEXT,
    CONSTRAINT "Champion_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Champion_subRoleId_fkey" FOREIGN KEY ("subRoleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Champion_name_key" ON "Champion"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
