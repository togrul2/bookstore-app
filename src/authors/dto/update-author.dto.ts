import { PartialType } from '@nestjs/swagger';
import { CreateAuthorDto } from './create-author.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}

export function updateAuthorDtoFactory(
  fullName: string | undefined,
  dateOfBirth: Date | undefined,
  dateOfDeath: Date | null | undefined,
  nationality: string | undefined,
  biography: string | undefined,
): UpdateAuthorDto {
  const dto = new UpdateAuthorDto();
  dto.fullName = fullName;
  dto.dateOfBirth = dateOfBirth;
  dto.dateOfDeath = dateOfDeath;
  dto.nationality = nationality;
  dto.biography = biography;
  return dto;
}
