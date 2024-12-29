import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";

import { ZodError, ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedData = this.schema.parse(value);

      return parsedData;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "Incorrect fields",
          statusCode: 400,
          error: fromZodError(error),
        });
      }

      throw new BadRequestException("Incorrect fields");
    }
  }
}
