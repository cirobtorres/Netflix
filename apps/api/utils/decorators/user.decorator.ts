import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from "@nestjs/common";

export const UserDecorator = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request.user) return request.user;
    else
      throw new NotFoundException(
        "User not found. Use AuthGuard to obtain user information.",
      );
  },
);
