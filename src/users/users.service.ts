/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { CreateBuyerDto, CreateSellerDto } from './dto/create-user.dto';
import { Buyer, Seller } from './entities/user.entity';
import { BuyersRepository, SellersRepository } from './user.repo';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface UsersService {
  create(createBuyerDto?: CreateBuyerDto, createSeller?: CreateSellerDto): any;
  findOne();
  findAll();
}

@Injectable()
export class BuyersService implements UsersService {
  constructor(
    private buyersRepository: BuyersRepository,
    private jwtService: JwtService,
  ) {}
  async create(createBuyerDto: CreateBuyerDto): Promise<Buyer> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createBuyerDto.password, salt);
      const newBuyer: Buyer = this.buyersRepository.create({
        ...createBuyerDto,
        password: hashedPassword,
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

  async auth(email: string) {
    return await this.buyersRepository.findByEmail(email);
  }

  async findByEmail(email: string) {
    return this.buyersRepository.findByEmail(email);
  }

  async findOne() {}
  async findAll() {}
}

@Injectable()
export class SellersService implements UsersService {
  constructor(
    private sellersRepository: SellersRepository,
    private jwtService: JwtService,
  ) {}
  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createSellerDto.password, salt);
      const newSeller: Seller = this.sellersRepository.create({
        ...createSellerDto,
        password: hashedPassword,
      });
      await this.sellersRepository.save(newSeller);
      return newSeller;
    } catch (e) {
      if (e.code === '23505') {
        throw new BadRequestException(
          'A seller with this email address already exists',
        );
      }
      console.log('err', e);
      throw new HttpException('Something unexpected went wrong', 500);
    }
  }

  async findByEmail(email: string) {
    return this.sellersRepository.findByEmail(email);
  }

  async findOne() {}

  async findAll() {}
}
