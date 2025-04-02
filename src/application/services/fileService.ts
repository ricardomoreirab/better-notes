import { FileRepository } from '../../domain/ports/fileRepository';

export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  async handleFilesUpload(files: Express.Multer.File[]): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }

    return this.fileRepository.saveFiles(files);
  }
} 