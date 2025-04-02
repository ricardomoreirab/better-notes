import { Request, Response } from 'express';
import { NoteOrganizationService } from '../../../application/services/noteOrganizationService';

export class NoteOrganizationController {
  constructor(private readonly noteOrganizationService: NoteOrganizationService) {}

  async organizeFile(req: Request, res: Response): Promise<void> {
    try {
      const { filePath } = req.body;

      if (!filePath) {
        res.status(400).json({ error: 'File path is required' });
        return;
      }

      await this.noteOrganizationService.organizeFile(filePath);
      res.status(200).json({ message: 'File organized successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
} 