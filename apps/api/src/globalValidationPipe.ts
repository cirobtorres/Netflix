import {
  BadRequestException,
  Injectable,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";
import { StatusMessage } from "utils/enums/StatusMessage";
import { returnMessage } from "utils/helpers/returnMessage";

@Injectable()
export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((err) => {
          const constraints = err.constraints
            ? Object.values(err.constraints)
            : [];
          return {
            field: err.property,
            errors: constraints,
          };
        });

        // Exceptions from DTOs that cannot be validated by providers
        return new BadRequestException(
          returnMessage({
            ok: false,
            statusCode: 400,
            statusMessage: StatusMessage.BAD_REQUEST,
            data: null,
          }),
        );
      },
    });
  }
}
