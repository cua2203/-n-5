import { injectable } from 'tsyringe';
import { ImportBillRepository } from '../repositories/importBillRepository';


@injectable()
export class ImportBillService {
  constructor(private repository: ImportBillRepository) {

  }

  async Create(bill:any): Promise<any> {
    return this.repository.Create(bill);
  }
  // async getAll():Promise<any>{
  //   return this.repository.getAll();
  // }

  // async getOrderDetail(id:string):Promise<any>{
  //   return this.repository.getOrderDetail(id);
  // }
  // async Process(id:string):Promise<any>{
  //   return this.repository.Process(id);
  // }

  // async Cancel(id:string):Promise<any>{
  //   return this.repository.Cancel(id);
  // }

//   async getById(id: string): Promise<any> {
//     return this.repository.getById(id);
//   }
//   async delete(id: string): Promise<any> {
//     return this.repository.delete(id);
//   }
//   async add(laptop:any): Promise<any> {
//     return this.repository.add(laptop);
//   }
//   async update(laptop:any): Promise<any> {
//     return this.repository.update(laptop);
//   }
}