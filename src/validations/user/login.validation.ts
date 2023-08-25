import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginValidation {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
