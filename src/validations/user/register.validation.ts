import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterValidation {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
