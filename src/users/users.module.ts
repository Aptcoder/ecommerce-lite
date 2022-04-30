import { Module } from '@nestjs/common';
import { BuyersService, SellersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyersRepository, SellersRepository } from './user.repo';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuyersRepository, SellersRepository]),
    JwtModule.register(config.get<object>('JWT_OPTIONS')),
  ],
  controllers: [UsersController],
  providers: [BuyersService, SellersService],
  exports: [BuyersService, SellersService],
})
export class UsersModule {}
