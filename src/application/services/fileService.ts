import { FileRepository } from '../../domain/ports/fileRepository';

export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  async handleFileUpload(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    if (file.mimetype !== 'application/zip') {
      throw new Error('Only ZIP files are allowed');
    }

    return this.fileRepository.saveFile(file);
  }
} 