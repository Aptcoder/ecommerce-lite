import { IsString } from 'class-validator';

export default class FilterProductDto {
  @IsString()
  price?: string;

  @IsString()
  name?: string;
}
