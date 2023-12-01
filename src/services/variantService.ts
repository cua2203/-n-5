import { injectable } from 'tsyringe';
import { VariantRepository } from '../repositories/variantRepository';


@injectable()
export class VariantService {
  constructor(private variant: VariantRepository) {

  }

  async getAllPaging(search_criteria:any): Promise<any> {
    return this.variant.getAllPaging(search_criteria);
  }
  async getAll(): Promise<any> {
    return this.variant.getAll();
  }
  async getByLaptopId(id: string): Promise<any> {
    return this.variant.getByLaptopId(id);
  }

  async getById(id: string): Promise<any> {
    return this.variant.getById(id);
  }
  async delete(id: string): Promise<any> {
    return this.variant.delete(id);
  }
  async add(laptop:any): Promise<any> {
    return this.variant.add(laptop);
  }
  async update(laptop:any): Promise<any> {
    return this.variant.update(laptop);
  }
}