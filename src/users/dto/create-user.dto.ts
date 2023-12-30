import { IsString, Matches } from 'class-validator';
import { passwordErrorMessage, passwordRegex } from './users.validators';
import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto extends UpdateUserDto {
  @IsString()
  @Matches(passwordRegex, { message: passwordErrorMessage })
  password: string;
}
