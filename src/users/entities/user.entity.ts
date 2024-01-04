import { Exclude } from 'class-transformer';
import { Gender } from '../users.schema';
import { ApiHideProperty } from '@nestjs/swagger';

export class UserEntity {
  id: string;
  email: string;
  gender?: Gender;
  birthDate: Date;
  username: string;
  fullName: string;
  @Exclude()
  @ApiHideProperty()
  password: string;
  @Exclude()
  @ApiHideProperty()
  isBanned: boolean;

  static from(dto: Partial<UserEntity>): UserEntity {
    return new UserEntity({
      id: dto.id,
      fullName: dto.fullName,
      username: dto.username,
      email: dto.email,
      gender: dto.gender,
      birthDate: dto.birthDate,
      password: dto.password,
      isBanned: dto.isBanned,
    });
  }

  private constructor(source: Partial<UserEntity>) {
    Object.assign(this, source);
  }
}
