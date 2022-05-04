import Product from '../product.entity';

export default class ProductRepositoryFake {
  public static products = [
    {
      name: 'Sample',
      price: 8000,
      id: 'sample',
    },
  ];

  public create(product: Product): Promise<Product> {
    return Promise.resolve(product);
  }

  public save = async (product: Product): Promise<Product> => {
    return Promise.resolve(product);
  };
  public async remove(product: Product): Promise<Product | void> {
    return Promise.resolve(product);
  }
  public async findOne(id: string): Promise<Product | void> {
    return ProductRepositoryFake.products[0];
  }
  public fetchAll() {
    return ProductRepositoryFake.products;
  }
}
