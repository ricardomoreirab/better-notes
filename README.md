# Better Notes

A Node.js application built with hexagonal architecture that handles multiple file uploads and organizes notes using the PARA method with LLM assistance.

## Project Structure

The project follows hexagonal architecture (ports and adapters) principles:

```
src/
├── application/     # Application services and business logic
├── domain/         # Core business rules and interfaces
├── infrastructure/ # External implementations (adapters)
└── interfaces/     # Interface adapters (controllers, etc.)
```

## Features

- Multiple file upload endpoint
- Note organization using PARA method
- LLM-powered note categorization
- Hexagonal architecture implementation
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- npm
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ricardomoreirab/better-notes.git
cd better-notes
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

## Development

Run the development server:
```bash
npm run dev
```

## Production

Build and run the production server:
```bash
npm run build
npm start
```

## API Endpoints

### POST /upload

Upload multiple files.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: 
  - files: Array of files

**Response:**
```json
{
  "message": "Files uploaded successfully",
  "filePaths": [
    "/path/to/saved/file1.txt",
    "/path/to/saved/file2.txt"
  ]
}
```

### POST /organize

Organize a note using the PARA method.

**Request:**
- Method: POST
- Content-Type: application/json
- Body: 
```json
{
  "filePath": "/path/to/note.txt"
}
```

**Response:**
```json
{
  "message": "File organized successfully",
  "category": {
    "name": "Projects",
    "description": "Short-term efforts with clear goals and deadlines"
  },
  "confidence": 0.85,
  "reasoning": "This note contains specific project tasks with deadlines..."
}
```

## PARA Method Categories

- **Projects**: Short-term efforts with clear goals and deadlines
- **Areas**: Long-term responsibilities and ongoing interests
- **Resources**: Topics or themes that may be useful in the future
- **Archives**: Inactive items that may be useful later

## License

ISC 