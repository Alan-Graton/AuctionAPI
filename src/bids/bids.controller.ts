import { Controller, Post, Body } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("bids")
export class BidsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  create(@Body() createBidDto: any) {}
}
