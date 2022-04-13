import { IsString, IsEmail, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

// export class CreateBuyerDto extends CreateUserDto {}

// export class CreateSellerDto extends CreateUserDto {
//   @IsString()
//   displayName: string;
// }
