import { Controller, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Post("register")
  async register() {}

  @Post("login")
  async login() {}

  @Post("forget")
  async forget() {}

  @Post("reset")
  async reset() {}

  @Post("me")
  async me() {}
}
