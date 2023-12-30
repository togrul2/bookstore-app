import { IsString, Matches } from 'class-validator';
import { passwordErrorMessage, passwordRegex } from './users.validators';

export class UpdatePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @Matches(passwordRegex, { message: passwordErrorMessage })
  newPassword: string;
}
