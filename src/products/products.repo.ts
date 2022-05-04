import { EntityRepository, Repository } from 'typeorm';
import FilterProductDto from './dtos/filter-product.dto';
import Product from './product.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async fetchAll(filters?: FilterProductDto): Promise<Product[]> {
    const { name, price } = filters;
    let query = this.createQueryBuilder();
    if (name) {
      query = query.where({
        name: name,
      });
    }

    if (price) {
      query = query.andWhere({
        name: name,
      });
    }
    const products = await query.getMany();
    return products;
  }
}
