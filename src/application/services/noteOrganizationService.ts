import { NoteOrganizer } from '../../domain/ports/noteOrganizer';
import * as fs from 'fs/promises';

export class NoteOrganizationService {
  constructor(private readonly noteOrganizer: NoteOrganizer) {}

  async organizeFile(filePath: string): Promise<void> {
    await this.organizeFiles([{ path: filePath } as Express.Multer.File]);
  }

  async organizeFiles(files: Express.Multer.File[]): Promise<void> {
    try {
      for (const file of files) {
        // Get content from the buffer since we're using memory storage
        const content = file.buffer.toString('utf-8');
        const organizedNote = await this.noteOrganizer.organizeNote(file.originalname, content);
        
        // TODO: Implement the actual organization logic (moving files to appropriate folders)
        console.log('Note organized:', organizedNote);
      }
    } catch (error) {
      console.error('Error organizing notes:', error);
      throw error;
    }
  }
} 