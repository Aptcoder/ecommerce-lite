/* eslint-disable @typescript-eslint/no-empty-function */
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import ProductRepositoryFake from './fakes/product.repo.fake';
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
    const fetchAllSpy = jest.spyOn(productsRepository, 'fetchAll');
    await productsService.fetchAll();
    expect(fetchAllSpy).toHaveBeenCalled();
  });

  it('Should fetch relevant products', async () => {
    const filter = {
      name: 'Addidas',
      price: '400',
    };
    const fetchAllSpy = jest.spyOn(productsRepository, 'fetchAll');
    await productsService.fetchAll(filter);
    expect(fetchAllSpy).toHaveBeenCalled();
    expect(fetchAllSpy).toHaveBeenCalledWith(filter);
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

  it('Should delete a product', async () => {
    const findSpy = jest.spyOn(productsRepository, 'findOne');
    const removeSpy = jest.spyOn(productsRepository, 'remove');

    const result = await productsService.delete('random0');
    expect(findSpy).toBeCalled();
    expect(findSpy).toBeCalledWith('random0');
    expect(removeSpy).toBeCalledWith(ProductRepositoryFake.products[0]);
    expect(result).toBe(ProductRepositoryFake.products[0]);
  });

  it('Should throw error if user not found when deleting ', async () => {
    const findSpy = jest
      .spyOn(productsRepository, 'findOne')
      .mockImplementation(() => {
        return null;
      });
    const removeSpy = jest.spyOn(productsRepository, 'remove');
    try {
      await productsService.delete('random0');
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
    expect(findSpy).toBeCalled();
    expect(findSpy).toBeCalledWith('random0');
    expect(removeSpy).not.toBeCalled();
  });
});
