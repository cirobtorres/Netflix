import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { returnMessage } from "utils/helpers/returnMessage";
import { StatusMessage } from "utils/enums/StatusMessage";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { User } from "../../node_modules/@generated/prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private user: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
        },
        {
          expiresIn: "7 days",
          issuer: "login",
          audience: "users",
        },
      ),
    };
  }

  async extractPayload(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        issuer: "login",
        audience: "users",
      });
      return payload;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async isValidToken(token: string) {
    try {
      this.extractPayload(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async register({ email, password }: RegisterAuthDto) {
    // TODO: validate user email

    const user = await this.user.create({ email, password });

    const token = this.createToken(user.data as User);

    return returnMessage({
      statusCode: 201,
      statusMessage: StatusMessage.CREATED,
      data: token,
    });
  }

  async login({ email, password }: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    // LoginAuthDto cuts off users with pending password
    // user.password || "" is a fallback for bcrypt
    if (!user || !(await bcrypt.compare(password, user.password || ""))) {
      throw new UnauthorizedException(
        returnMessage({
          ok: false,
          statusCode: 401,
          statusMessage: StatusMessage.UNAUTHORIZED,
          data: null,
        }),
      );
    }

    const token = await this.createToken(user);

    return returnMessage({
      statusCode: 200,
      statusMessage: StatusMessage.OK,
      data: token,
    });
  }

  async forget(email: string) {
    // Search user by EMAIL
    // Sign Token with user.id and email him
    // Return an ok message
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

    const token = await this.createToken(userUpdatedData);

    return returnMessage({
      statusCode: 200,
      statusMessage: StatusMessage.OK,
      data: token,
    });
  }

  async delete(id: string) {
    const userDeleted = this.user.delete(id); // TODO: delete after 7 or 30 days

    return returnMessage({
      statusCode: 200,
      statusMessage: StatusMessage.OK,
      data: userDeleted,
    });
  }
}
