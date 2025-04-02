# Better Notes

A Node.js application built with hexagonal architecture that handles multiple file uploads.

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
- Hexagonal architecture implementation
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- npm

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

## License

ISC 