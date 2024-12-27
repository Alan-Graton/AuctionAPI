import { Injectable } from '@nestjs/common';

import { AuthenticateSchema } from 'src/schemas/authenticate.schema';
import { CreateAccountSchema } from 'src/schemas/create-account.schema';

@Injectable()
export class AuthService {
  create(createAuthDto: AuthenticateSchema) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: CreateAccountSchema) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
