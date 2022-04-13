import { EntityRepository, Repository } from 'typeorm';
import { Buyer, Seller } from './entities/user.entity';

@EntityRepository(Seller)
export class SellersRepository extends Repository<Seller> {
  async findByEmail(email: string): Promise<Seller> {
    const queryBuilder = this.createQueryBuilder('seller');
    queryBuilder.where('seller.email = :email', { email });

    const seller = await queryBuilder.getOne();
    return seller;
  }
}

@EntityRepository(Buyer)
export class BuyersRepository extends Repository<Buyer> {
  async findByEmail(email: string): Promise<Buyer> {
    const queryBuilder = this.createQueryBuilder('buyer');
    const seller = await queryBuilder
      .where('buyer.email = :email', { email })
      .getOne();
    return seller;
  }
}
