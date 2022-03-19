import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BuyersService, SellersService } from './users.service';
import { CreateUserDto, CreateBuyerDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly buyersService: BuyersService,
    private readonly sellersService: SellersService,
  ) {}

  @Post('/sellers')
  createSeller(@Body() createUserDto: CreateUserDto) {
    return this.sellersService.create();
  }

  @Post('/buyers')
  createBuyer(@Body() createBuyerDto: CreateBuyerDto) {
    return this.buyersService.create(createBuyerDto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
