import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const tokenFromHeader = (request.headers.authorization ?? "").split(" ")[1];
    const tokenFromCookie = request.cookies?.token;
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) return false;

    try {
      const userData = await this.auth.extractPayload(
        token,
        this.auth.passwordLoginJwtOptions,
      );

      request.payload = userData;

      request.user = await this.prisma.user.findUnique({
        where: { id: userData.id },
      });

      // return true;
    } catch (error) {
      try {
        const userData = await this.auth.extractPayload(
          token,
          this.auth.passwordlessLoginJwtOptions,
        );

        request.payload = userData;

        request.user = await this.prisma.user.findUnique({
          where: { id: userData.id },
        });

        // return true;
      } catch (error) {
        return false;
      }
    }
    return true;
  }
}
