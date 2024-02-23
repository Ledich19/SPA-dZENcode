import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Data {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  homePage: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  captcha: string;

  @IsUUID()
  @IsOptional()
  @IsString()
  parentId: string;

  @IsOptional()
  image?: Buffer | null;

  @IsOptional()
  @IsString()
  file?: string | ArrayBuffer | null;
}

export class CreateCommentDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Data)
  data: Data;
}
