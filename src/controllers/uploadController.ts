
import { Request, Response } from 'express';
import UploadService from '../services/uploadService';

class UploadController {
  private uploadService: UploadService;

  constructor(uploadService: UploadService) {
    this.uploadService = uploadService;
  }

  uploadFile(req: Request, res: Response) {
    const des = req.query.des;
    this.uploadService.uploadFile(req, res,des);
  }

  uploadMultiFiles(req: Request, res: Response) {
    const des = req.query.des;
    this.uploadService.uploadMultiFiles(req, res,des);
  }
}

export default UploadController;
