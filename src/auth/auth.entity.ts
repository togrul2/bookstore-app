import { IsNotEmpty, IsString } from 'class-validator';

export class TokenPairEntity {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
