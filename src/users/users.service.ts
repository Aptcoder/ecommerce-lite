/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import {
  CreateBuyerDto,
  CreateSellerDto,
  CreateUserDto,
} from './dto/create-user.dto';
import { Buyer, Seller } from './entities/user.entity';
import { BuyersRepository } from './user.repo';

interface UsersService {
  create(createBuyerDto?: CreateBuyerDto, createSeller?: CreateSellerDto): any;
  findOne();
  findAll();
}

@Injectable()
export class BuyersService implements UsersService {
  constructor(private buyersRepository: BuyersRepository) {}
  async create(createBuyerDto: CreateBuyerDto): Promise<Buyer> {
    try {
      const newBuyer: Buyer = await this.buyersRepository.create({
        user: {
          firstName: createBuyerDto.firstName,
          lastName: createBuyerDto.lastName,
          email: createBuyerDto.email,
          password: createBuyerDto.password,
        },
      });
      await this.buyersRepository.save(newBuyer);
      return newBuyer;
    } catch (e) {
      if (e.code === '23505') {
        throw new BadRequestException(
          'A buyer with this email address already exists',
        );
      }
      throw new HttpException('Something unexpected went wrong', 500);
    }
  }

  async findOne() {}

  async findAll() {}
}

@Injectable()
export class SellersService implements UsersService {
  async create() {}

  async findOne() {}

  async findAll() {}
}
