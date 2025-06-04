import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { AuthGuard } from "utils/guards/auth.guard";
import { UserDecorator } from "utils/decorators/user.decorator";
import { returnMessage } from "utils/helpers/returnMessage";
import { StatusMessage } from "utils/enums/StatusMessage";
import { User } from "../../node_modules/@generated/prisma/client";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() data: RegisterAuthDto) {
    return this.authService.register(data);
  }

  @Post("login")
  async login(@Body() data: LoginAuthDto) {
    return this.authService.login(data);
  }

  @Post("forget")
  async forget() {}

  @Post("reset")
  async reset() {}

  // Authentication required--------------------------------------------------
  @Post("me")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async me(@UserDecorator() user: User) {
    return returnMessage({
      statusCode: 200,
      statusMessage: StatusMessage.OK,
      data: user,
    });
  }

  @Post("update")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async update(@UserDecorator() user: User, @Body() data: UpdateAuthDto) {
    return this.authService.update(user, data);
  }

  @Delete("delete")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async delete(@UserDecorator() user: User) {}
}
