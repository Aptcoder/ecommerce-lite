import { EntityRepository, Repository, getRepository } from 'typeorm';
import Product from './product.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async fetchAll(): Promise<Product[]> {
    return await this.find({});
  }
}
