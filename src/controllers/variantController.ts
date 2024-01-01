import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { VariantService } from "../services/variantService";
import _ from "lodash";

@injectable()
export class VariantController {
    constructor(private service: VariantService) { }

    async getAllPaging(req: Request, res: Response): Promise<void> {
        try {
            const search_criteria = {
                searchString: req.params.searchString,
                pageIndex: req.params.pageIndex,
                pageSize: req.params.pageSize

            }

            const data = await this.service.getAllPaging(JSON.stringify(search_criteria));
            if (data && data.length > 0) {
                res.json(data);
            } else {
                res.json({ message: "Không lấy được danh sách" });
            }
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {

            const searchString = req.query.searchString?.toString() || '';
            const pageIndex = Number(req.query.pageIndex) || 1;
            const pageSize = Number(req.query.pageSize) || 10;
            const brandIds = req.query.brand_ids ? (req.query.brand_ids as string).split(',').map(Number) : [];
            const categoryIds = req.query.category_ids ? (req.query.category_ids as string).split(',').map(Number) : [];
            // console.log(req.query.brand_ids)
            console.log(brandIds)
      
            const data = await this.service.getAll();
            // const data = _.filter(data0, (item: any) => {return item.status==1});
      
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
              if (brandIds.length > 0) {
                dataSearch = _.filter(dataSearch, (item: any) => brandIds.includes(item.brand_id));
              }
              if (categoryIds.length > 0) {
                dataSearch = _.filter(dataSearch, (item: any) => categoryIds.includes(item.category_id));
              }
      
              const startIndex = (pageIndex - 1) * pageSize;
              const endIndex = startIndex + pageSize;
              const dataPaging = dataSearch.slice(startIndex, endIndex);
              const totalPage =Math.ceil(dataSearch.length/pageSize)
      
              res.json({data:dataPaging,totalPage:totalPage});
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

    async getByLaptopId(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const category = await this.service.getByLaptopId(id);
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
}
