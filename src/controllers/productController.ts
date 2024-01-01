import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { ProductService } from "../services/productService";
import * as _  from 'lodash';

@injectable()
export class ProductController {
  constructor(private service: ProductService) { }

  async getAll(req: Request, res: Response): Promise<void> {
    try {

      const searchString = req.query.searchString?.toString() || '';
      const pageIndex = Number(req.query.pageIndex) || 1;
      const pageSize = Number(req.query.pageSize) || 100;

      const data0 = await this.service.getAll();
      const data = _.filter(data0, (item: any) => {return item.status==1});

      if (data && data.length > 0) {
        var datasort: any;
        switch (req.query.sort) {
          case '3': datasort = _.orderBy(data, 'laptop_name', 'asc'); break;
          case '4': datasort = _.orderBy(data, 'laptop_name', 'desc'); break;
          case '2': datasort = _.orderBy(data, 'id', 'asc'); break;
          case '1': datasort = _.orderBy(data, 'id', 'desc'); break;
          default: datasort = _.orderBy(data, 'id', 'asc'); break;
        }

        var dataSearch = _.filter(datasort, (item: any) => {
          return searchString!=''
            ? _.includes(item.laptop_name.toLowerCase(), searchString.toLowerCase())
            : true;
        });

        const startIndex = (pageIndex - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const dataPaging = dataSearch.slice(startIndex, endIndex);

        res.json(dataPaging);
      } else {
        res.json({ message: "Không lấy được danh sách" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }


  async getAllwithVariants(req: Request, res: Response): Promise<void> {
    try {

      const product = await this.service.getAllwithVariants();
      if (product) {
        res.json(product);
      } else {
        res.json({ message: 'Bản ghi không tồn tại' });
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
      res.json({ message: "Done!" })
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const laptop = req.body;
      const results = await this.service.update(JSON.stringify(laptop));

      res.json({ message: 'Đã cập nhật thành công', results: results });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }


  async add(req: Request, res: Response): Promise<void> {
    try {
      const laptop = req.body;
      const results = await this.service.add(JSON.stringify(laptop));

      res.json({ message: 'Đã cập nhật thành công', results: results });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  
  async export(req: Request, res: Response): Promise<void> {
    try {
      
      const results = await this.service.export();

      res.json({ message: 'Đã export thành công', results: results });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async readExcelData(req:Request,res:Response){
    try{
      await this.service.readExcelData('File/1699260332441_laptop.xlsx');
      res.json({message:"Đọc thành công !"})

    }
    catch(error:any){
      res.json({message:"Có lỗi !",error:error.message})
    }
  }


  
}
