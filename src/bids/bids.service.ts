import { Injectable } from "@nestjs/common";

@Injectable()
export class BidsService {
  create(createBidDto: any) {
    return "This action adds a new bid";
  }

  findAll() {
    return `This action returns all bids`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bid`;
  }

  update(id: number, updateBidDto: any) {
    return `This action updates a #${id} bid`;
  }

  remove(id: number) {
    return `This action removes a #${id} bid`;
  }
}
