import { Request, Response } from 'express';
import { FileService } from '../../../application/services/fileService';

export class FileController {
  constructor(private readonly fileService: FileService) {}

  async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file provided' });
        return;
      }

      const filePath = await this.fileService.handleFileUpload(req.file);
      res.status(200).json({ 
        message: 'File uploaded successfully',
        filePath 
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
} 