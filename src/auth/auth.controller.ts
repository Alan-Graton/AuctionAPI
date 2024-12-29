import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  Logger,
  HttpException,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

import {
  AuthenticateSchema,
  authenticateSchema,
} from "src/schemas/authenticate.schema";
import {
  CreateAccountSchema,
  createAccountSchema,
} from "src/schemas/create-account.schema";

import { ZodValidationPipe } from "src/pipes/zod-schema-validation";

import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private prisma: PrismaService) {}

  @Post("/authenticate")
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateSchema))
  async authenticate(@Body() data: AuthenticateSchema) {
    try {
      this.logger.log("Looking for user...");
      const getUser = await this.prisma.users.findFirst({
        select: { id: true, email: true, password: true },
        where: { email: data.email },
      });

      if (!getUser) {
        throw new NotFoundException(
          "Usuário não encontrado. Você tem uma conta?",
        );
      }

      this.logger.log("Comparing passwords...");
      const isPasswordCorrect = compare(data.password, getUser.password);

      if (!isPasswordCorrect) {
        throw new UnauthorizedException("E-mail ou senha incorretos");
      }

      this.logger.log("Generating Access Token...");
      const token = sign({ id: getUser.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      this.logger.log("Access Token created");

      return token;
    } catch (error) {
      this.logger.error("User authentication failed: ", error);

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException("Unexpected error!");
    }
  }

  @Post("/create-account")
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async createAccount(@Body() data: CreateAccountSchema) {
    try {
      const findDuplicateUser = await this.prisma.users.findUnique({
        where: { email: data.email },
      });

      if (findDuplicateUser) {
        throw new ConflictException("E-mail já em uso");
      }

      this.logger.log("Hashing user password");
      data.password = await hash(data.password, 10);

      this.logger.log("Inserting data into database...");
      const createdUser = await this.prisma.users.create({ data: { ...data } });
      this.logger.log("New user stored in database: ", createdUser);

      this.logger.log("Creating Refresh Token...");
      const refreshToken = sign(
        {
          id: createdUser.id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30 days",
        },
      );
      this.logger.log("Refresh Token created");

      this.logger.log("Binding user with Refresh Token...");
      await this.prisma.users.update({
        data: { refresh_token: refreshToken },
        where: { id: createdUser.id },
      });
      this.logger.log("User binded with Refresh Token");

      this.logger.log("Creating Access Token...");
      const accessToken = sign(
        {
          id: createdUser.id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );
      this.logger.log("Access Token created");

      return accessToken;
    } catch (error) {
      this.logger.error("User creation failed: ", error);

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException("Unexpected error!");
    }
  }

  @Post("/refresh_token")
  @HttpCode(201)
  async refreshUserToken() {
    try {
    } catch (error) {}
  }
}
