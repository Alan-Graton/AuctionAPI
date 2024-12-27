import { Controller, Post, Body, HttpCode, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/ZodValidation.pipe';
import {
  AuthenticateSchema,
  authenticateSchema,
} from 'src/schemas/authenticate.schema';
import {
  CreateAccountSchema,
  createAccountSchema,
} from 'src/schemas/create-account.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateSchema))
  authenticate(@Body() data: AuthenticateSchema) {
    return this.authService.create(data);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  createAccount(@Body() data: CreateAccountSchema) {
    return this.authService.create(data);
  }
}
