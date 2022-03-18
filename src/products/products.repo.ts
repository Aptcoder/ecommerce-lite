export class ProductsRepository {
  private products = [];
  async fetchAllProducts() {
    return this.products;
  }
}
