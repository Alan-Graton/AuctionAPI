import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("items")
export class ItemsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    const getItems = await this.prisma.items.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        bids: {
          select: {
            id: true,
            price: true,
            users: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return getItems.map((item) => ({
      ...item,
      bids: item.bids.map((bid) => ({
        id: bid.id,
        price: bid.price,
        author: bid.users.name,
      })),
    }));
  }
}
