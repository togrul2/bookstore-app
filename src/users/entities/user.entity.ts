import { Exclude } from 'class-transformer';
import { Gender } from '../users.schema';
import { ApiHideProperty } from '@nestjs/swagger';
import { Role } from '../../auth/role.enum';

export class UserEntity {
  id: string;
  email: string;
  gender?: Gender;
  birthDate: Date;
  fullName: string;
  @Exclude()
  @ApiHideProperty()
  password: string;
  @Exclude()
  @ApiHideProperty()
  isBanned: boolean;
  roles: Role[];

  public static from(dto: Partial<UserEntity>): UserEntity {
    return new UserEntity({
      id: dto.id,
      fullName: dto.fullName,
      email: dto.email,
      gender: dto.gender,
      birthDate: dto.birthDate,
      password: dto.password,
      isBanned: dto.isBanned,
      roles: dto.roles,
    });
  }

  private constructor(source: Partial<UserEntity>) {
    Object.assign(this, source);
  }
}
