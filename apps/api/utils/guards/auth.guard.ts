import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const userData = await this.auth.extractPayload(
        (authorization ?? "").split(" ")[1],
      );
      request.payload = userData;
      request.user = await this.prisma.user.findUnique({
        where: { id: userData.id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
