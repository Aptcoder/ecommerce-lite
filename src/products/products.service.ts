import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import Product from './product.entity';
import { ProductsRepository } from './products.repo';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  async fetchAll(): Promise<Product[]> {
    return await this.productsRepository.fetchAll();
  }

  async create(createProductDto: CreateProductDto) {
    try {
      return this.productsRepository.create({
        ...createProductDto,
      });
    } catch (err) {
      throw new HttpException('Something unexpected happened', 500);
    }
  }
}
