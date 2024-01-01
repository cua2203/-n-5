import { Request,Response } from "express";
import { injectable } from "tsyringe";

import { ImportBillService } from "../services/importBillService";

@injectable()

export class ImportBillController{
    constructor(private service : ImportBillService){
        
    }

    async Create(req:Request,res:Response):Promise<any>{
        try{
            const bill = req.body;
            await this.service.Create(JSON.stringify(bill));
            res.json({mesage:"Đặt hàng thành công !"});
        }
        catch(error:any){
            res.json({ message: error.message });
        }
    }
    
    // async getAll(req:Request,res:Response):Promise<any>{
    //     try{
    //         const data = await this.service.getAll();
    //         res.status(200).json({data:data});
    //     }
    //     catch(error:any){
    //         res.json({ message: error.message });
    //     }
    // }

    // async getOrderDetail(req:Request,res:Response):Promise<any>{
    //     try{
    //         const id = req.params.id;
    //         const data = await this.service.getOrderDetail(id);
    //         res.status(200).json({data:data});
    //     }
    //     catch(error:any){
    //         res.json({ message: error.message });
    //     }
    // }
    // async Process(req:Request,res:Response):Promise<any>{
    //     try{

    //         const id = req.params.id;
    //         await this.service.Process(id);
    //         res.status(200).json({message:"Đã cập nhật trạng thái !"});
    //     }
    //     catch(error:any){
    //         res.json({ message: error.message });
    //     }
    // }

    // async Cancel(req:Request,res:Response):Promise<any>{
    //     try{

    //         const id = req.params.id;
    //         await this.service.Cancel(id);
    //         res.status(200).json({message:"Đã hủy đơn hàng !"});
    //     }
    //     catch(error:any){
    //         res.json({ message: error.message });
    //     }
    // }

}