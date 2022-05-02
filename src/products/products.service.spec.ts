/* eslint-disable @typescript-eslint/no-empty-function */
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import Product from './product.entity';
import { ProductsRepository } from './products.repo';
import { ProductsService } from './products.service';

describe('Products service', () => {
  let productsService: ProductsService;
  let productsRepository: ProductsRepository;
  const mock_product = {
    name: 'Addide',
    price: 80000,
  };
  const mock_product_with_id = {
    id: 'sample-id',
    ...mock_product,
  };
  const mock_products = [mock_product];
  class ProductRepositoryFake {
    public create = jest.fn().mockImplementation(() => {
      return mock_product_with_id;
    });
    public save = async (product: Product): Promise<Product> => {
      return Promise.resolve(mock_product_with_id);
    };
    public async remove(): Promise<void> {}
    public async findOne(): Promise<void> {}
    public fetchAll = jest.fn();
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: ProductRepositoryFake,
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsRepository = module.get(getRepositoryToken(Product));
  });

  it('Should fetch all products', async () => {
    await productsService.fetchAll();
    expect(productsRepository.fetchAll).toHaveBeenCalled();
  });

  it('Should save and create a product', async () => {
    const createProductData = {
      name: 'Mock prize',
      price: 4000,
    };
    const createSpy = jest.spyOn(productsRepository, 'create');
    const saveSpy = jest.spyOn(productsRepository, 'save');
    await productsService.create(createProductData);
    expect(createSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalledWith(createProductData);
    expect(saveSpy).toBeCalled();
  });
});
