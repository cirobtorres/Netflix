import { IsBoolean, IsOptional } from "class-validator";
import { PutUserDto } from "./put-user.dto";
import { PartialType } from "@nestjs/mapped-types";

export class PatchUserDto extends PartialType(PutUserDto) {
  @IsBoolean()
  @IsOptional()
  email_confirmation?: boolean;
}
