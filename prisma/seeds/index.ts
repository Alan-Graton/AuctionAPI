import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";

configDotenv({ path: ".env.local" });

async function main() {
  const prisma = new PrismaClient();

  try {
    console.log("[Prisma] Initializing seeders...");

    console.log("[Prisma] Connecting prisma client...");
    await prisma.$connect();
    console.log("[Prisma] Prisma client connected");

    console.log("[Prisma] Planting ITEM seed...");
    const itemSeed = await prisma.items.create({
      data: {
        title: "Maquinários",
        description: "Maquinários seminovos juntamente com algumas ferramentas",
        status: "active",
      },
    });
    console.log("[Prisma] Seed planted!\n\n", itemSeed);

    console.log("[Prisma] Planting BID seed...");
    const bidSeed = await prisma.bids.create({
      data: {
        id_item: 1,
        id_user: 5,
        price: 50,
      },
    });
    console.log("[Prisma] Seed planted!\n\n", bidSeed);

    process.exit(0);
  } catch (error) {
    console.error("[Prisma] Seeders failed: ", error);
    process.exit(1);
  } finally {
    console.log("[Prisma] Disconnecting prisma client");
    await prisma.$disconnect();
    console.log("[Prisma] Prisma client disconnected");
  }
}

main();
