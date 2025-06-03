import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateAuthDto } from "./dto/create-auth.dto";

@Injectable()
export class AuthService {
  constructor(private user: UserService) {}

  async createToken() {}

  async isValidToken() {}

  async register({ email, password }: CreateAuthDto) {
    return this.user.create({ email, password });
  }

  async login() {}

  async forget() {}

  async reset() {}

  async delete(id: string) {
    return this.user.delete(id);
  }
}
