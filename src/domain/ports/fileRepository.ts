export interface FileRepository {
  saveFiles(files: Express.Multer.File[]): Promise<string[]>;
} 