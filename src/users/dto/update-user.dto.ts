import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '../users.schema';
import { PartialType } from '@nestjs/swagger';

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
