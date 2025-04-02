import { Request, Response } from 'express';
import { NoteOrganizationService } from '../../../application/services/noteOrganizationService';

export class NoteOrganizationController {
  constructor(private readonly noteOrganizationService: NoteOrganizationService) {}

  async organizeFile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        res.status(400).json({ error: 'No files provided' });
        return;
      }

      const files = Array.isArray(req.files) ? req.files : [req.files];
      await this.noteOrganizationService.organizeFiles(files as Express.Multer.File[]);
      res.status(200).json({ message: 'Files organized successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
} 