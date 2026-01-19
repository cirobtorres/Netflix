import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
