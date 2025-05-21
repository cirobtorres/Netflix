import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createToken() {}

  async isValidToken() {}

  async register() {}

  async login() {}

  async forget() {}

  async reset() {}
}
