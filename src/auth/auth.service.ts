import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Buyer, Seller } from 'src/users/entities/user.entity';
import { BuyersService, SellersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private buyersService: BuyersService,
    private sellersService: SellersService,
    private jwtService: JwtService,
  ) {}

  async authBuyer(authUserDto: AuthUserDto) {
    const { email, password } = authUserDto;
    const buyer: Buyer = await this.buyersService.findByEmail(email);
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
    return { token };
  }

  async authSeller(authUserDto: AuthUserDto) {
    const { email, password } = authUserDto;
    const seller: Seller = await this.sellersService.findByEmail(email);
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
    return { token };
  }
}
