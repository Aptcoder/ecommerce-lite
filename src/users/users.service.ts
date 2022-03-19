/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

interface UsersService {
  create();
  findOne();
  findAll();
}

@Injectable()
export class BuyersService implements UsersService {
  async create() {}

  async findOne() {}

  async findAll() {}
}

@Injectable()
export class SellersService implements UsersService {
  async create() {}

  async findOne() {}

  async findAll() {}
}
