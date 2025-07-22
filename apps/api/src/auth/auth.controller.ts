import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { ForgetPasswordDto } from "./dto/forget-auth.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "utils/guards/auth.guard";
import { UserDecorator } from "utils/decorators/user.decorator";
import { returnMessage } from "utils/helpers/returnMessage";
import { Response } from "express";
import { User } from "../../node_modules/@generated/prisma/client";
import { StatusMessage } from "utils/enums/StatusMessage";

@Controller("auth")
export class AuthController {
  frontendBaseUrl = process.env.WEB_URL || "http://localhost:3000";
  constructor(private readonly auth: AuthService) {}

  @Get("confirm-email")
  async validateEmail(
    @Query()
    { token, type }: { token: string; type: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    if (type !== "confirm") return res.redirect("http://localhost:3000/error");

    const validation = await this.auth.validateEmail({
      token,
      options: this.auth.confirmEmailJwtOptions,
    });

    if (!validation.ok)
      return res.redirect(`${this.frontendBaseUrl}/signup?status=error`);

    const user = validation.data.user;

    const jwt = await this.auth.createToken(
      user,
      this.auth.passwordlessLoginJwtOptions,
    );

    res.cookie("token", jwt.accessToken, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: "lax", // If set to none, secure MUST be true (https only)
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return res.redirect(`${this.frontendBaseUrl}/signup`);
  }

  @Post("register")
  async register(
    @Body() data: RegisterAuthDto,
    @Res({ passthrough: false }) res: Response,
  ) {
    const response = await this.auth.register(data);

    return res.json({ ...response });
  }

  @Post("login")
  async login(
    @Body() data: LoginAuthDto,
    @Res({ passthrough: false }) res: Response,
  ) {
    const response = await this.auth.login(data);

    if (!response.ok) return res.json({ ...response });

    const { token } = response.data;

    res.cookie("token", token.accessToken, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: "lax", // If set to none, secure MUST be true (https only)
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    delete response.data.token;

    return res.json({ ...response });
  }

  @Post("forget")
  @HttpCode(200)
  async forget(@Body() { email }: ForgetPasswordDto) {
    return this.auth.forget(email);
  }

  @Post("reset")
  async reset() {}

  // Authentication required--------------------------------------------------
  @Post("me")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async me(@UserDecorator() user: User) {
    if (user) {
      return returnMessage({
        data: user,
      });
    }

    return returnMessage({
      ok: false,
      statusCode: 404,
      statusMessage: StatusMessage.NOT_FOUND,
      data: user,
    });
  }

  @Post("update")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async update(@UserDecorator() user: User, @Body() data: UpdateAuthDto) {
    return this.auth.update(user, data);
  }

  @Delete("delete")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async delete(@UserDecorator() user: User) {}
}
