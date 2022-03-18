import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repo';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  async fetchAllProducts() {
    return this.productsRepository.fetchAllProducts();
  }
}
