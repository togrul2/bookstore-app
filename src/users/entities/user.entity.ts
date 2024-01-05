import { Gender } from '../users.type';
import { Role } from '../../auth/role.enum';
import { User } from '../schema/user.schema';
import { Exclude } from 'class-transformer';

export class UserEntity {
  readonly id: string;
  readonly email: string;
  readonly fullName: string;
  readonly gender?: Gender;
  readonly birthDate: Date;
  @Exclude()
  readonly password: string;
  @Exclude()
  readonly isBanned: boolean;
  readonly roles: Role[];
  readonly createdAt: Date;
  readonly updatedAt: Date;

  public static fromInstance(user: User): UserEntity {
    return new UserEntity(
      user.id,
      user.email,
      user.fullName,
      user.gender,
      user.birthDate,
      user.password,
      user.isBanned,
      user.roles,
      user.createdAt,
      user.updatedAt,
    );
  }

  private constructor(
    id: string,
    email: string,
    fullName: string,
    gender: Gender | undefined,
    birthDate: Date,
    password: string,
    isBanned: boolean,
    roles: Role[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.gender = gender;
    this.birthDate = birthDate;
    this.password = password;
    this.isBanned = isBanned;
    this.roles = roles;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
