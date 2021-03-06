import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import FilterProductDto from './dtos/filter-product.dto';
import Product from './product.entity';
import { ProductsRepository } from './products.repo';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: ProductsRepository,
  ) {}
  async fetchAll(filters?: FilterProductDto): Promise<Product[]> {
    return await this.productsRepository.fetchAll(filters);
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productsRepository.create({
        ...createProductDto,
      });
      await this.productsRepository.save(product);
      return product;
    } catch (err) {
      throw new HttpException('Something unexpected happened', 500);
    }
  }

  async delete(productId: string) {
    const toBeDeletedProduct = await this.productsRepository.findOne(productId);
    if (!toBeDeletedProduct) {
      throw new NotFoundException('Product not found');
    }
    const deletedProduct = await this.productsRepository.remove(
      toBeDeletedProduct,
    );
    return deletedProduct;
  }
}
