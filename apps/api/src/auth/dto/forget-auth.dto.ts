// src/auth/dto/forget-password.dto.ts
import { IsEmail } from "class-validator";

export class ForgetPasswordDto {
  @IsEmail()
  email: string;
}
