import { Type } from 'class-transformer';

export class AuthorEntity {
  id: string;
  fullName: string;
  dateOfBirth: Date;
  @Type(() => Date)
  dateOfDeath: Date | null;
  nationality: string;
  biography: string;
  @Type(() => Date)
  createdAt: Date;
  @Type(() => Date)
  updatedAt: Date;

  static from(item: Partial<AuthorEntity>): AuthorEntity {
    return new AuthorEntity({
      id: item.id,
      fullName: item.fullName,
      dateOfBirth: item.dateOfBirth,
      dateOfDeath: item.dateOfDeath,
      nationality: item.nationality,
      biography: item.biography,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  private constructor(partial: Partial<AuthorEntity>) {
    Object.assign(this, partial);
  }
}
