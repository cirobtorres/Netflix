import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from "@nestjs/common";

export const UserDecorator = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      const user = request.user;
      user.has_password = !!user.password;
      delete user.password;
      return user;
    } else
      throw new NotFoundException(
        "User not found. Use AuthGuard to obtain user information.",
      );
  },
);
