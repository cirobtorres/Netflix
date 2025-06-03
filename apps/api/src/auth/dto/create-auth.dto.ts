import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;
}
