import { injectable } from 'tsyringe';
import { ProductRepository } from '../repositories/productRepository';


@injectable()
export class ProductService {
  constructor(private product: ProductRepository) {

  }

  async getAll(search_criteria:any): Promise<any> {
    return this.product.getAll(search_criteria);
  }

  async getById(id: string): Promise<any> {
    return this.product.getById(id);
  }
  async delete(id: string): Promise<any> {
    return this.product.delete(id);
  }
  async add(laptop:any): Promise<any> {
    return this.product.add(laptop);
  }
  async update(laptop:any): Promise<any> {
    return this.product.update(laptop);
  }
}