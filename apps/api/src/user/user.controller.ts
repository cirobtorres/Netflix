import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { PatchUserDto } from "./dto/patch-user.dto";
import { PutUserDto } from "./dto/put-user.dto";

// TODO: proteger essas rotas de acesso direto
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("read/all")
  async readAll() {
    return this.userService.readAll();
  }

  // The route "read/:id" is more specific, thus it must comes AFTER read/all
  @Get("read/:id")
  async read(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.userService.read(id);
  }

  @Post("create")
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Patch("patch/:id")
  async patch(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() data: PatchUserDto,
  ) {
    return this.userService.patch(id, data);
  }

  @Put("put/:id")
  async put(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() data: PutUserDto,
  ) {
    return this.userService.put(id, data);
  }

  // @Delete("delete/many")
  // async deleteMany(@Body() { id }: { id: string[] }) {
  //   return this.userService.deleteMany(id);
  // }

  // The route "delete/:id" is more specific, thus it must comes AFTER delete/many
  @Delete("delete/:id")
  async delete(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.userService.delete(id);
  }
}
