import { PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';
import { Gender } from './user.schema';
import { Exclude, Type } from 'class-transformer';

/**
 * User data transfer object for creating a new user.
 */

const passwordRegex = /^[\w\-$@#?!%^&*()]{6,}$/;
const passwordErrorMessage =
  'Password must be at least 6 characters and can contain letters numbers and following symbols: -$@#?!%^&*().';

export class UpdateUserDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9]{6,}$/)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  gender: Gender | null;

  @Type(() => Date)
  @IsDate()
  birthDate: Date;
}

/**
 * User data transfer object for updating an existing user.
 */
export class CreateUserDto extends PartialType(UpdateUserDto) {
  @IsString()
  @Matches(passwordRegex, { message: passwordErrorMessage })
  password: string;
}

// FIXME: Must be used instead of raw models.

export class UserEntity extends CreateUserDto {
  @IsString()
  _id: string;

  @Exclude()
  password: string;

  public constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}

/**
 * User data transfer object for partially updating an existing user.
 */
export class PartialUpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdatePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @Matches(passwordRegex, { message: passwordErrorMessage })
  newPassword: string;
}
