import { IsBoolean, IsOptional, IsString, IsNumber } from "class-validator";

export class ExtractPayloadOptionsDto {
  @IsOptional()
  @IsBoolean()
  ignoreExpiration?: boolean;

  @IsOptional()
  @IsString({ each: true })
  audience?: string | string[];

  @IsOptional()
  @IsString({ each: true })
  issuer?: string | string[];
}

// export class JwtPayloadDto {
//   @IsOptional()
//   @IsString()
//   id?: string;

//   @IsOptional()
//   @IsNumber()
//   iat?: number;

//   @IsOptional()
//   @IsNumber()
//   exp?: number;

//   @IsOptional()
//   @IsString()
//   iss?: string;

//   @IsOptional()
//   @IsString({ each: true })
//   aud?: string | string[];
// }
