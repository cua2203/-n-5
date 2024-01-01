import { Request,Response } from "express";
import { injectable } from "tsyringe";
import sgMail from '@sendgrid/mail';
import { OrderService } from "../services/orderService";
import {config} from '../config/config'



@injectable()

export class OrderController{

    private apikey = config.apiKey;
    private fromEmail = config.fromEmail;
    constructor(private service : OrderService){
        
    }

    async Create(req:Request,res:Response):Promise<any>{
        try{
            const order = req.body.order;
            const order_detail = req.body.orderDetail;
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

    sendMail(req: Request, res: Response) {
        sgMail.setApiKey(this.apikey);
        const customer = req.body.customer
        const order = req.body.order
        console.log(req.body)
        let date =new Date(customer.order_date)
        const orderDate = date.toLocaleDateString();


        const orderItemsHtml = order.map((item:any) => `<li>${item.quantity}x ${item.laptop_name}-${item.cpu}-${item.ram}-${item.storage} Giá : ${item.price} </li>`).join('');
        const msg = {
            to: customer.Email,
            from: this.fromEmail, 
            subject: 'Xác nhận đơn hàng',
            html: `
            <html>
              <body>
                <h1>Xin chào ${customer.Name}</h1>
                <p><a href="http://localhost:4200/">Truy cập địa chỉ này để xác nhận đơn hàng a> đặt ngày${orderDate}</</p>
                  ${orderItemsHtml}

                  
              </body>
            </html>
          `,
        }

        sgMail
            .send(msg)
            .then(() => {
                res.json({message:'Email sent'});
            })
            .catch((error) => {
                res.json({error:error});
            })
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

    async getOrderById(req:Request,res:Response):Promise<any>{
        try{
            const id = req.params.id;
            const data = await this.service.getOrderById(id);
            res.status(200).json({data});
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