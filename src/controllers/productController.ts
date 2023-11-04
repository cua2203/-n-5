import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { ProductService } from "../services/productService";
const _ = require('lodash');

@injectable()
export class ProductController {
  constructor(private service: ProductService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const search_criteria={
        searchString :req.query.searchString,
        pageIndex :req.query.pageIndex,
        pageSize : req.query.pageSize
      }
      const data = await this.service.getAll(JSON.stringify(search_criteria));
   
      if (data && data.length > 0) {
        switch (req.query.sort) {
          case '1':  var sortedData = _.orderBy(data,'laptop_name','asc');  break;;
          case '2':   sortedData = _.orderBy(data,'laptop_name','desc');break;
          case '3':   sortedData = _.orderBy(data,'laptop_id','asc');break;
          case '4':   sortedData = _.orderBy(data,'laptop_id','desc');break;
          default: sortedData = _.orderBy(data,'laptop_id','asc');break;
        }
        
        res.json(sortedData);
      } else {
        res.json({ message: "Không lấy được danh sách" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const category = await this.service.getById(id);   
      if (category) {
        res.json(category);
      } else {
        res.json({ message: 'Bản ghi không tồn tại' });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const category = await this.service.delete(id);   
      res.json({message:"Done!"})
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const laptop = req.body;
      const results = await this.service.update(JSON.stringify(laptop));   
   
        res.json({ message: 'Đã cập nhật thành công',results:results});
      } catch (error: any) {
        res.json({ message: error.message, results:false});
      }
  }


  async add(req: Request, res: Response): Promise<void> {
    try {
      const laptop = req.body;
      const results = await this.service.add(JSON.stringify(laptop));   
   
        res.json({ message: 'Đã cập nhật thành công',results:results});
      } catch (error: any) {
        res.json({ message: error.message, results:false});
      }
  }
}
