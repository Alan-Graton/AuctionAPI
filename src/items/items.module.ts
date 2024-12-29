import { Module } from "@nestjs/common";
import { ItemsController } from "./items.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [ItemsController],
  providers: [PrismaService],
})
export class ItemsModule {}
