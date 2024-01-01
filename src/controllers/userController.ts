import { Request, Response } from 'express';
import jwt, { decode } from 'jsonwebtoken';
import { config } from '../config/config';
import { injectable } from "tsyringe";
import { UserService } from '../services/userService';
import { generateToken } from '../config/jwt';
import argon2 from 'argon2';

@injectable()
export class UserController {
  constructor(private userService: UserService
  ) { }

  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      let hashedPassword = await this.userService.GetOne(email);
      hashedPassword=hashedPassword.password;
 

      let result=await argon2.verify(hashedPassword, password);
     
      if (result) {
        const user = await this.userService.authenticate(email, hashedPassword);
        const token = generateToken(user);
        user.token = token;
        res.json(user);
      } else {
        res.status(401).json({ message: "Sai mật tài khoản hoặc mật khẩu" });
      }
    } catch (error: any) {
      res.json({ message: error.message,alo:'alo' });
    }
  }

  async register(req: Request, res: Response): Promise<any> {
    try {
      const { username, email, password, phone_number,role_id } = req.body;
      let user = { username, email, password, phone_number,role_id };
      const results = await this.userService.Register(user);

      if (results) {
        res.json({ message: "Đăng ký thành công !" });
      }
      else {
        res.json({ message: "Tên tài khoản đã tồn tại !" })
      }

    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.query.searchString);
      const search_criteria={
        searchString :req.query.searchString?req.query.searchString:'pham',
        pageIndex :req.query.pageIndex,
        pageSize : req.query.pageSize

      }

      const data = await this.userService.getAll(JSON.stringify(search_criteria));
      if (data && data.length > 0) {
        res.json(data);
      } else {
        res.json({ message: "Không lấy được danh sách" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
  async Hide(req:Request,res:Response):Promise<any>{
    try{
      this.userService.hide(req.params.id);
    }
    catch (error:any){
      res.json({message:error.message});

    }
  }

}