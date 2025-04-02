export interface NoteCategory {
  name: string;
  description: string;
}

export interface OrganizedNote {
  originalPath: string;
  content: string;
  category: NoteCategory;
  confidence: number;
  reasoning: string;
}

export interface NoteOrganizer {
  organizeNote(filePath: string, content: string): Promise<OrganizedNote>;
} 