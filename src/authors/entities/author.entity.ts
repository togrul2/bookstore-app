import { Author } from '../schemas/author.schema';

export class AuthorEntity {
  readonly id: string;
  readonly fullName: string;
  readonly dateOfBirth: Date;
  readonly dateOfDeath?: Date;
  readonly nationality: string;
  readonly biography: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  public static fromInstance(instance: Author): AuthorEntity {
    return new AuthorEntity(
      instance._id.toHexString(),
      instance.fullName,
      instance.dateOfBirth,
      instance.dateOfDeath,
      instance.nationality,
      instance.biography,
      instance.createdAt,
      instance.updatedAt,
    );
  }

  private constructor(
    id: string,
    fullName: string,
    dateOfBirth: Date,
    dateOfDeath: Date | undefined,
    nationality: string,
    biography: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.dateOfDeath = dateOfDeath;
    this.nationality = nationality;
    this.biography = biography;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
