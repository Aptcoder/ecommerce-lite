import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('Products controller', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  const mock_result: Product = {
    name: 'Sample',
    price: 80000,
    id: 'makeshift',
  };

  const mock_results: Product[] = [mock_result];

  beforeEach(async () => {
    productsService = new ProductsService(null);
    productsController = new ProductsController(productsService);
  });

  it('Should fetch all products', async () => {
    const spy = jest
      .spyOn(productsService, 'fetchAll')
      .mockImplementation(async () => Promise.resolve(mock_results));
    const result = await productsController.getAllProducts({});
    expect(spy).toHaveBeenCalled();
    expect(result).toBe(mock_results);
  });

  it('Should create a product', async () => {
    const spy = jest
      .spyOn(productsService, 'create')
      .mockImplementation(async () => Promise.resolve(mock_result));
    const createProductDto = {
      name: 'Sample',
      price: 8000,
    };
    await productsController.createProduct(createProductDto);
    expect(spy).toHaveBeenCalled();
  });

  it('Should delete a product', async () => {
    const spy = jest
      .spyOn(productsService, 'delete')
      .mockImplementation(async () => Promise.resolve(mock_result));
    await productsController.deleteProduct('2');
    expect(spy).toHaveBeenCalled();
  });
});
