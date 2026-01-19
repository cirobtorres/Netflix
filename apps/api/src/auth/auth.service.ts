import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { returnMessage } from "utils/helpers/returnMessage";
import { StatusMessage } from "utils/enums/StatusMessage";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { ExtractPayloadOptionsDto } from "./dto/extract-payload-options.dto";
import { User } from "../../node_modules/@generated/prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private user: UserService,
    private readonly jwtService: JwtService,
    private readonly mailer: MailerService,
  ) {}

  confirmEmailJwtOptions = {
    expiresIn: "30 minutes",
    issuer: "confirm",
    audience: "users",
  };

  passwordlessLoginJwtOptions = {
    expiresIn: "1 day",
    issuer: "passwordless",
    audience: "users",
  };

  passwordLoginJwtOptions = {
    expiresIn: "1 day",
    issuer: "password",
    audience: "users",
  };

  async createToken(user: User, options?: JwtSignOptions) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
        },
        options ?? {},
      ),
    };
  }

  async extractPayload(token: string, options?: ExtractPayloadOptionsDto) {
    try {
      const payload = await this.jwtService.verify(token, options);
      return payload;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async isValidToken({
    token,
    options,
  }: {
    token: string;
    options?: ExtractPayloadOptionsDto;
  }) {
    try {
      const payload = await this.extractPayload(token, options);
      return returnMessage({
        data: { payload },
      });
    } catch (e) {
      return returnMessage({
        ok: false,
        statusCode: 400,
        statusMessage: StatusMessage.BAD_REQUEST,
        data: "Token de confirmação inválido ou expirado",
      });
    }
  }

  async validateEmail({
    token,
    options,
  }: {
    token: string;
    options?: ExtractPayloadOptionsDto;
  }) {
    const isValidToken = await this.isValidToken({ token, options });

    if (!isValidToken.ok) return isValidToken;

    const {
      data: { payload },
    } = isValidToken;

    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user)
      return returnMessage({
        ok: false,
        statusCode: 404,
        statusMessage: StatusMessage.NOT_FOUND,
        data: "Usuário não encontrado",
      });

    if (user.email_confirmation) {
      return returnMessage({ data: { user } });
    }

    const userUpdated = await this.user.patch(payload.id, {
      email_confirmation: true,
    });

    return userUpdated.ok
      ? userUpdated
      : returnMessage({
          ok: false,
          statusCode: 400,
          statusMessage: StatusMessage.BAD_REQUEST,
          data: "Email não validado",
        });
  }

  async register({ email, password }: RegisterAuthDto) {
    const userExists = await this.prisma.user.findUnique({ where: { email } });

    if (userExists) {
      // Retorno genérico no lugar de ConflictException para impedir usuários
      // maliciosos de tirarem pistas das respostas HTTP no console do navegador,
      // uma vez que ConflictException vai levantar esse erro no lado cliente.
      return returnMessage({
        ok: false,
        statusCode: 409,
        statusMessage: StatusMessage.CONFLICT,
        data: null,
      });
      // throw new ConflictException(
      //   returnMessage({
      //     ok: false,
      //     statusCode: 409,
      //     statusMessage: StatusMessage.CONFLICT,
      //     data: null,
      //   }),
      // );
    }

    const userResponse = await this.user.create({
      email,
      password,
    });

    const confirmToken = await this.createToken(
      userResponse.data.user,
      this.confirmEmailJwtOptions,
    );

    const root = process.env.API_URL || "http://localhost:3001";
    const verificationLink = `${root}/api/auth/confirm-email?token=${confirmToken.accessToken}&type=confirm`;
    const sender = {
      address: "hello@example.com",
      name: "Mailtrap Test",
    };
    const recipients = [email];

    await this.mailer.sendMail({
      from: sender,
      to: recipients,
      subject: "Confirm link",
      template: "confirm",
      context: {
        logoLink: "http://localhost:3000",
        verificationLink,
      },
    });

    return returnMessage({
      statusCode: 201,
      statusMessage: StatusMessage.CREATED,
      data: null,
    });
  }

  async login({ email, password }: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    const hasPassword = !!user?.password;

    if (!user) {
      throw new NotFoundException(
        returnMessage({
          ok: false,
          statusCode: 404,
          statusMessage: StatusMessage.NOT_FOUND,
          data: null,
        }),
      );
    }

    if (hasPassword) {
      if (password !== undefined) {
        const wrongPassword = !(await bcrypt.compare(
          password,
          user.password || "", // fallback
        ));
        if (wrongPassword) {
          throw new UnauthorizedException(
            returnMessage({
              ok: false,
              statusCode: 401,
              statusMessage: StatusMessage.UNAUTHORIZED,
              data: null,
            }),
          );
        }
      } else {
        const token = await this.createToken(
          user,
          this.passwordLoginJwtOptions,
        );
        // password = undefined
        // Login attempt with no password
        // This request comes from HomeForm login
        return returnMessage({
          data: {
            token,
          },
        });
      }
    }

    const token = await this.createToken(
      user,
      this.passwordlessLoginJwtOptions,
    );

    return returnMessage({
      data: {
        token,
      },
    });
  }

  async forget(email: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new NotFoundException(
          returnMessage({
            data: null,
          }),
        );
      }

      const token = this.jwtService.sign(
        {
          id: user.id,
        },
        {
          expiresIn: "30 minutes",
          issuer: "forget",
          audience: "users",
        },
      );

      const verificationLink = `http://localhost:3000/auth/confirm?token_hash=${token}&type=forget`;

      const sender = {
        address: "hello@example.com",
        name: "Mailtrap Test",
      };
      const recipients = [email];

      await this.mailer.sendMail({
        from: sender,
        to: recipients,
        subject: "Reset your password",
        template: "forget",
        context: {
          logoLink: "http://localhost:3000",
          verificationLink,
        },
      });

      return returnMessage({
        data: null,
      });
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }

      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      }

      // Fallback
      throw new InternalServerErrorException(e.message || "Unexpected error");
    }
  }

  async reset(newPassword: string, token: string) {
    try {
      // Authenticate if JWT Token is valid
      // Hash new password
      // Update database password
      // Return new JWT Token
    } catch (e) {
      throw new BadRequestException(e);
      // throw new BadRequestException(
      //   returnMessage({
      //     ok: false,
      //     statusCode: 400,
      //     statusMessage: StatusMessage.BAD_REQUEST,
      //     data: null,
      //   }),
      // );
    }
  }

  async update(user: User, data: UpdateAuthDto) {
    const { id } = user;

    const userUpdated = await this.user.patch(id, data);

    const {
      data: { user: userUpdatedData },
    } = userUpdated;

    const token = await this.createToken(
      userUpdatedData,
      this.passwordLoginJwtOptions,
    );

    return returnMessage({
      data: {
        token,
      },
    });
  }

  async delete(id: string) {
    const userDeleted = await this.user.delete(id); // TODO: delete after 7 or 30 days

    const {
      data: { user },
    } = userDeleted;

    return returnMessage({
      data: {
        userId: user.id,
      },
    });
  }
}
