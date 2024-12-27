import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  Logger,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import {
  AuthenticateSchema,
  authenticateSchema,
} from 'src/schemas/authenticate.schema';
import {
  CreateAccountSchema,
  createAccountSchema,
} from 'src/schemas/create-account.schema';

import { ZodValidationPipe } from 'src/pipes/zod-schema-validation';

import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private prisma: PrismaService) {}

  @Post('/authenticate')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateSchema))
  async authenticate(@Body() data: AuthenticateSchema) {
    this.logger.log('Incoming authentication payload: ', data);

    const getUser = await this.prisma.users.findFirst({
      select: { id: true, email: true, password: true },
      where: { email: data.email },
    });

    this.logger.log('Comparing passwords...');
    const isPasswordCorrect = compare(data.password, getUser.password);

    if (!isPasswordCorrect) {
      throw new Error('E-mail ou senha incorretos').message;
    }

    this.logger.log('Generating Access Token...');
    const token = sign(String(getUser.id), process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    this.logger.log('Access Token created: ', token);

    return token;
  }

  @Post('/create-account')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async createAccount(@Body() data: CreateAccountSchema) {
    this.logger.log('Hashing user password');
    data.password = await hash(data.password, 10);

    this.logger.log('Inserting data into database...');
    const createdUser = await this.prisma.users.create({ data: { ...data } });
    this.logger.log('New user stored in database: ', createdUser);

    this.logger.log('Creating Access Token...');
    const token = sign(String(createdUser.id), process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    this.logger.log('Access Token created: ', token);

    return token;
  }
}
