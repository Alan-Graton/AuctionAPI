import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  Logger,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import {
  AuthenticateSchema,
  authenticateSchema,
} from 'src/schemas/authenticate.schema';
import {
  CreateAccountSchema,
  createAccountSchema,
} from 'src/schemas/create-account.schema';

import { ZodValidationPipe } from 'src/pipes/zod-schema-validation';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('/authenticate')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateSchema))
  authenticate(@Body() data: AuthenticateSchema) {
    this.logger.log('Incoming authentication payload: ', data);

    return this.authService.create(data);
  }

  @Post('/create-account')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  createAccount(@Body() data: CreateAccountSchema) {
    this.logger.log('Incoming account creation payload: ', data);

    return this.authService.create(data);
  }
}
