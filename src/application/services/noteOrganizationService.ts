import { NoteOrganizer } from '../../domain/ports/noteOrganizer';
import * as fs from 'fs/promises';

export class NoteOrganizationService {
  constructor(private readonly noteOrganizer: NoteOrganizer) {}

  async organizeFile(filePath: string): Promise<void> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const organizedNote = await this.noteOrganizer.organizeNote(filePath, content);
      
      // TODO: Implement the actual organization logic (moving files to appropriate folders)
      console.log('Note organized:', organizedNote);
      
    } catch (error) {
      console.error('Error organizing note:', error);
      throw error;
    }
  }
} 