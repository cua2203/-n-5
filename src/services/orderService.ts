import { injectable } from 'tsyringe';
import { OrderRepository } from '../repositories/orderRepository';


@injectable()
export class OrderService {
  constructor(private repository: OrderRepository) {

  }

  async Create(order:any,order_detail:any): Promise<any> {
    return this.repository.Create(order,order_detail);
  }
  async getAll():Promise<any>{
    return this.repository.getAll();
  }

  async getOrderDetail(id:string):Promise<any>{
    return this.repository.getOrderDetail(id);
  }
  async getOrderById(id:string):Promise<any>{
    return this.repository.getOrderById(id);
  }
  async Process(id:string):Promise<any>{
    return this.repository.Process(id);
  }

  async Cancel(id:string):Promise<any>{
    return this.repository.Cancel(id);
  }

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