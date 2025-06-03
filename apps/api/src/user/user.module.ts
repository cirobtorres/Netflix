import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  imports: [],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
