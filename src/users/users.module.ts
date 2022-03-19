import { Module } from '@nestjs/common';
import { BuyersService, SellersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyersRepository, SellersRepository } from './user.repo';

@Module({
  imports: [TypeOrmModule.forFeature([BuyersRepository, SellersRepository])],
  controllers: [UsersController],
  providers: [BuyersService, SellersService],
})
export class UsersModule {}
