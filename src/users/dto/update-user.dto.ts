import {
  IsDate,
  IsEmail,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';
import { Gender } from '../entities/user.entity';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9]{6,}$/)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  gender: Gender | null;

  @Type(() => Date)
  @IsDate()
  birthDate: Date;
}

export class PartialUpdateUserDto extends PartialType(UpdateUserDto) {}
