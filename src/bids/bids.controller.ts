import { Controller, Post, Body, HttpCode, Logger } from "@nestjs/common";
import { MessageBody, SubscribeMessage } from "@nestjs/websockets";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("bids")
export class BidsController {
  private logger = new Logger(BidsController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @SubscribeMessage("bids_events")
  create(@MessageBody() data: any) {
    this.logger.log("Triggering websocket event...");

    return data;
  }
}
