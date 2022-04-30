import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import JwtGuard from 'src/utils/guards/jwt.guard';
import Roles from '../utils/decorators/role.decorator';
import { RolesGuard } from '../utils/guards/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  async getAllProducts() {
    return this.productsService.fetchAll();
  }

  @Roles('seller')
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    this.productsService.create(createProductDto);
  }
}
