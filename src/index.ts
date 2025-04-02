import express from 'express';
import multer from 'multer';
import { FileSystemAdapter } from './infrastructure/fileSystem/fileSystemAdapter';
import { FileService } from './application/services/fileService';
import { FileController } from './interfaces/http/controllers/fileController';

const app = express();
const port = process.env.PORT || 3000;

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Initialize dependencies
const fileRepository = new FileSystemAdapter();
const fileService = new FileService(fileRepository);
const fileController = new FileController(fileService);

// Routes
app.post('/upload', upload.array('files'), (req, res) => fileController.uploadFiles(req, res));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 