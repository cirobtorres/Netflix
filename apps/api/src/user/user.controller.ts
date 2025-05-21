import { Controller, Post } from "@nestjs/common";

@Controller("user")
export class UserController {
  @Post("create")
  async create() {}

  @Post("read")
  async read() {}

  @Post("readAll")
  async readAll() {}

  @Post("patch")
  async patch() {}

  @Post("put")
  async put() {}

  @Post("delete")
  async delete() {}
}
