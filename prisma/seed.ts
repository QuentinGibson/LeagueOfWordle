import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.role.create({
    data: {
      name: "Tank"
    }
  })
  await prisma.role.create({
    data: {
      name: "Support"
    }
  })
  await prisma.role.create({
    data: {
      name: "Marksmen"
    }
  })
  await prisma.role.create({
    data: {
      name: "Fighter"
    }
  })
  await prisma.role.create({
    data: {
      name: "Mage"
    }
  })
  await prisma.role.create({
    data: {
      name: "Assassin"
    }
  })

  await prisma.champion.create({
    data: {
      name: "Aatrox",
      avatar: "/champions/aatrox.webp",
      role: { connect: { name: "Fighter" } },
      subRole: { connect: { name: "Tank" } },
      health: 650,
      healthRate: 14,
      attack: 60,
      attackRate: 5,
      attackSpeed: 0.651,
      moveSpeed: 345
    }
  })

  await prisma.champion.create({
    data: {
      name: "Lux",
      avatar: "/champions/lux.webp",
      role: { connect: { name: "Mage" } },
      subRole: { connect: { name: "Support" } },
      health: 560,
      healthRate: 99,
      attack: 50,
      attackRate: 3.3,
      attackSpeed: 0.669,
      moveSpeed: 330
    }
  })

  await prisma.champion.create({
    data: {
      name: "Annie",
      avatar: "/champions/annie.webp",
      role: { connect: { name: "Mage" } },
      health: 560,
      healthRate: 102,
      attack: 50,
      attackRate: 2.65,
      attackSpeed: 0.579,
      moveSpeed: 335
    }
  })

  await prisma.champion.create({
    data: {
      name: "Bard",
      avatar: "/champions/bard.webp",
      role: { connect: { name: "Support" } },
      subRole: {connect: {name: "Mage"}},
      health: 630,
      healthRate: 103,
      attack: 52,
      attackRate: 3,
      attackSpeed: 0.625,
      moveSpeed: 330
    }
  })

  await prisma.champion.create({
    data: {
      name: "Blitzcrank",
      avatar: "/champions/blitzcrank.webp",
      role: { connect: { name: "Tank" } },
      subRole: {connect: {name: "Fighter"}},
      health: 633,
      healthRate: 109,
      attack: 62,
      attackRate: 3.5,
      attackSpeed: 0.65,
      moveSpeed: 325
    }
  })

  await prisma.champion.create({
    data: {
      name: "Dr.Mundo",
      avatar: "/champions/drmundo.webp",
      role: { connect: { name: "Fighter" } },
      subRole: {connect: {name: "Tank"}},
      health: 613,
      healthRate: 103,
      attack: 61,
      attackRate: 2.5,
      attackSpeed: 0.67,
      moveSpeed: 345
    }
  })

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
