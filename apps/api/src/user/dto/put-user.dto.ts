import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class PutUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
