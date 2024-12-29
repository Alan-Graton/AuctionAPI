import { Module } from "@nestjs/common";
import { BidsController } from "./bids.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [BidsController],
  providers: [PrismaService],
})
export class BidsModule {}
