import { Request, Response } from 'express';
import { FileService } from '../../../application/services/fileService';

export class FileController {
  constructor(private readonly fileService: FileService) {}

  async uploadFiles(req: Request, res: Response): Promise<void> {
    try {
      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        res.status(400).json({ error: 'No files provided' });
        return;
      }

      const files = Array.isArray(req.files) ? req.files : [req.files];
      const filePaths = await this.fileService.handleFilesUpload(files as Express.Multer.File[]);
      
      res.status(200).json({ 
        message: 'Files uploaded successfully',
        filePaths 
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
} 