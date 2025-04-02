export interface FileRepository {
  saveFile(file: Express.Multer.File): Promise<string>;
} 