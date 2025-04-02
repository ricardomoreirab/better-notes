import { FileRepository } from '../../domain/ports/fileRepository';
import * as fs from 'fs';
import * as path from 'path';

export class FileSystemAdapter implements FileRepository {
  private readonly uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async saveFiles(files: Express.Multer.File[]): Promise<string[]> {
    const savedPaths = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(this.uploadDir, file.originalname);
        await fs.promises.writeFile(filePath, file.buffer);
        return filePath;
      })
    );
    return savedPaths;
  }
} 