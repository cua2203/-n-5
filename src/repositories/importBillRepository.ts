import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class ImportBillRepository {
    constructor(private db: Database) {

    }

    async Create(bill:any) :Promise<any>{
        try{

            const sql = "call createImportBill(?)";
            await this.db.query(sql,[bill]);
            return true;
        }

        catch(error:any){
            throw new Error(error.message);
        }
    }
    // async getAll() :Promise<any>{
    //     try{

    //         const sql = "select * from orders";
    //         const data = await this.db.query(sql,[]);
    //         console.log(data);
    //         if(Array.isArray(data) && data.length>0){
    //             return data
    //         }
    //         return false;
    //     }

    //     catch(error:any){
    //         throw new Error(error.message);
    //     }

    // }
    // async getOrderDetail(id:string) :Promise<any>{
    //     try{
    //         const sql = "select * from order_details where order_id = ?" ;
    //         const data = await this.db.query(sql,[id]);
    //         if(Array.isArray(data) && data.length>0){
    //             return data
    //         }
    //         return false;
    //     }

    //     catch(error:any){
    //         throw new Error(error.message);
    //     }

    // }

    // async Process(id:string) :Promise<any>{
    //     try{

    //         const sql = "Call UpdateOrderStatus(?)";
    //         const data = await this.db.query(sql,[id]);
           
    //         return false;
    //     }

    //     catch(error:any){
    //         throw new Error(error.message);
    //     }

    // }
    // async Cancel(id:string) :Promise<any>{
    //     try{

    //         const sql = "Call CancelOrder(?)";
    //         const data = await this.db.query(sql,[id]);
           
    //         return false;
    //     }

    //     catch(error:any){
    //         throw new Error(error.message);
    //     }

    // }




}