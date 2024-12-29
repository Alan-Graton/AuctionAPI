import { Injectable } from "@nestjs/common";

@Injectable()
export class ItemsService {
  create(createItemDto: any) {
    return "This action adds a new item";
  }

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: any) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
