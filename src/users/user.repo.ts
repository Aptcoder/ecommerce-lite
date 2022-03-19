import { EntityRepository, Repository } from 'typeorm';
import { Buyer, Seller } from './entities/user.entity';

@EntityRepository(Seller)
export class SellersRepository extends Repository<Seller> {}

@EntityRepository(Buyer)
export class BuyersRepository extends Repository<Buyer> {}
