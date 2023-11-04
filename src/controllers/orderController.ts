import { Request,Response } from "express";
import { injectable } from "tsyringe";
import { OrderService } from "../services/orderService";

@injectable()

export class OrderController{
    constructor(private service : OrderService){
        
    }

    async Create(req:Request,res:Response):Promise<any>{
        try{
            const order = req.body.order;
            const order_detail = req.body.order_detail;
            await this.service.Create(JSON.stringify(order),JSON.stringify(order_detail));
            res.json({mesage:"Đặt hàng thành công !"});
        }
        catch(error:any){
            res.json({ message: error.message });
        }
    }
    
    async getAll(req:Request,res:Response):Promise<any>{
        try{
            const data = await this.service.getAll();
            res.status(200).json({data:data});
        }
        catch(error:any){
            res.json({ message: error.message });
        }
    }

    async getOrderDetail(req:Request,res:Response):Promise<any>{
        try{
            const id = req.params.id;
            const data = await this.service.getOrderDetail(id);
            res.status(200).json({data:data});
        }
        catch(error:any){
            res.json({ message: error.message });
        }
    }
    async Process(req:Request,res:Response):Promise<any>{
        try{

            const id = req.params.id;
            await this.service.Process(id);
            res.status(200).json({message:"Đã cập nhật trạng thái !"});
        }
        catch(error:any){
            res.json({ message: error.message });
        }
    }

    async Cancel(req:Request,res:Response):Promise<any>{
        try{

            const id = req.params.id;
            await this.service.Cancel(id);
            res.status(200).json({message:"Đã hủy đơn hàng !"});
        }
        catch(error:any){
            res.json({ message: error.message });
        }
    }

}