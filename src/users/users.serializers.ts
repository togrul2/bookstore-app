import { Exclude } from 'class-transformer';
import { Gender } from './entities/user.entity';

export class UserEntity {
  id: string;
  email: string;
  gender: Gender | null;
  birthDate: Date;
  username: string;
  fullName: string;
  @Exclude()
  password: string;
  @Exclude()
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
