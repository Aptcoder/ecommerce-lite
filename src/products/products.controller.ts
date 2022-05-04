import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import JwtGuard from '../utils/guards/jwt.guard';
import Roles from '../utils/decorators/role.decorator';
import { RolesGuard } from '../utils/guards/roles.guard';
import { query } from 'express';
import FilterProductDto from './dtos/filter-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  async getAllProducts(@Query() filters: FilterProductDto) {
    return this.productsService.fetchAll(filters);
  }

  @Roles('seller')
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Delete('/:productId')
  async deleteProduct(@Param('productId') productId: string) {
    return this.productsService.delete(productId);
  }
}
