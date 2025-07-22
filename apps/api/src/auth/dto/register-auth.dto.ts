import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;
}
