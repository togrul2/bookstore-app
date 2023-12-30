import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsDateString()
  @IsOptional()
  dateOfDeath: Date | null;

  @IsString()
  nationality: string;

  @IsString()
  biography: string;
}
