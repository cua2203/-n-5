import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { VariantService } from "../services/variantService";

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

            const data = await this.service.getAll();
            if (data && data.length > 0) {
                res.json(data);
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
