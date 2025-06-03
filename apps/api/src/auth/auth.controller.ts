import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() data: CreateAuthDto) {
    return this.authService.register(data);
  }

  @Post("login")
  async login() {}

  @Post("forget")
  async forget() {}

  @Post("reset")
  async reset() {}

  @Post("me")
  async me() {}

  @Delete("delete")
  async delete() {}
}
