/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Injectable,
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateBuyerDto,
  CreateSellerDto,
  CreateUserDto,
} from './dto/create-user.dto';
import { Buyer, Seller } from './entities/user.entity';
import { BuyersRepository, SellersRepository } from './user.repo';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';

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
  async authBuyer(authUserDto: AuthUserDto) {
    const { email, password } = authUserDto;
    const buyer: Buyer = await this.buyersRepository.findByEmail(email);
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }
    const comparePassword = bcrypt.compare(password, buyer.password);
    if (!comparePassword) {
      throw new BadRequestException('Invalid password');
    }
    const payload = {
      userType: 'buyer',
      buyerId: buyer.id,
    };
    const token = this.jwtService.sign(payload);
    return { token, buyer };
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

  async authSeller(authUserDto: AuthUserDto) {
    const { email, password } = authUserDto;
    const seller: Seller = await this.sellersRepository.findByEmail(email);
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    const comparePassword = bcrypt.compare(password, seller.password);
    if (!comparePassword) {
      throw new BadRequestException('Invalid password');
    }
    const payload = {
      userType: 'seller',
      buyerId: seller.id,
    };
    const token = this.jwtService.sign(payload);
    return { token, seller };
  }

  // async auth(email: string, password: string) {
  //   await this.auth;
  // }

  async findByEmail(email: string) {
    return this.sellersRepository.findByEmail(email);
  }

  async findOne() {}

  async findAll() {}
}
