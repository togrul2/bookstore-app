import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  @Exclude()
  password: string;
  createdAt: Date;
  updatedAt: Date;

  static from(dto: Partial<UserEntity>): UserEntity {
    return new UserEntity({
      id: dto.id,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      fullName: dto.fullName,
      password: dto.password,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    });
  }

  private constructor(source: Partial<UserEntity>) {
    Object.assign(this, source);
  }
}
