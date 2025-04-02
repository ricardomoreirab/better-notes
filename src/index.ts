import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { FileSystemAdapter } from './infrastructure/fileSystem/fileSystemAdapter';
import { FileService } from './application/services/fileService';
import { FileController } from './interfaces/http/controllers/fileController';
import { LLMNoteOrganizer } from './infrastructure/llm/llmNoteOrganizer';
import { NoteOrganizationService } from './application/services/noteOrganizationService';
import { NoteOrganizationController } from './interfaces/http/controllers/noteOrganizationController';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Initialize dependencies
const fileRepository = new FileSystemAdapter();
const fileService = new FileService(fileRepository);
const fileController = new FileController(fileService);

const noteOrganizer = new LLMNoteOrganizer(process.env.OPENAI_API_KEY || '');
const noteOrganizationService = new NoteOrganizationService(noteOrganizer);
const noteOrganizationController = new NoteOrganizationController(noteOrganizationService);

// Middleware
app.use(express.json());

// Routes
app.post('/upload', upload.array('files'), (req, res) => fileController.uploadFiles(req, res));
app.post('/organize', (req, res) => noteOrganizationController.organizeFile(req, res));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 