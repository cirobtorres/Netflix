import { PutUserDto } from "./put-user.dto";
import { PartialType } from "@nestjs/mapped-types";

export class PatchUserDto extends PartialType(PutUserDto) {}
