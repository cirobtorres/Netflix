import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  email_confirmation?: boolean;
}
