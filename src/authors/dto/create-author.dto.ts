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

export function createAuthorDtoFactory(
  fullName: string,
  dateOfBirth: Date,
  dateOfDeath: Date | null,
  nationality: string,
  biography: string,
) {
  const createAuthorDto = new CreateAuthorDto();
  createAuthorDto.fullName = fullName;
  createAuthorDto.dateOfBirth = dateOfBirth;
  createAuthorDto.dateOfDeath = dateOfDeath;
  createAuthorDto.nationality = nationality;
  createAuthorDto.biography = biography;
  return createAuthorDto;
}
