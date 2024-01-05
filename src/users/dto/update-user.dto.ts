import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Gender } from '../users.type';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsOptional()
  gender?: Gender;

  @IsDateString()
  birthDate: Date;
}

export class PartialUpdateUserDto extends PartialType(UpdateUserDto) {}
