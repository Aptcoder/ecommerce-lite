import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class CreateBuyerDto extends CreateUserDto {}

export class CreateSellerDto extends CreateUserDto {
  @IsString()
  displayName: string;
}
