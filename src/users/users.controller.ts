import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { BuyersService, SellersService } from './users.service';
import { CreateBuyerDto, CreateSellerDto } from './dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly buyersService: BuyersService,
    private readonly sellersService: SellersService,
  ) {}

  @Post('/sellers')
  createSeller(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(createSellerDto);
  }

  @Post('/buyers')
  createBuyer(@Body() createBuyerDto: CreateBuyerDto) {
    return this.buyersService.create(createBuyerDto);
  }

  @HttpCode(200)
  @Post('/sellers/auth')
  authSeller(@Body() authUserDto: AuthUserDto) {
    return this.sellersService.authSeller(authUserDto);
  }

  @HttpCode(200)
  @Post('/buyers/auth')
  authBuyer(@Body() authUserDto: AuthUserDto) {
    return this.buyersService.authBuyer(authUserDto);
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
