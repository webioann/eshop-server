import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3000;

// 1. Configure storage
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    // Specify the destination folder for uploaded files
    cb(null, path.join(__dirname, 'uploads')); 
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Generate a unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Ensure the 'uploads' directory exists or create it beforehand.

// 3. Define a route to handle file uploads
app.post('/upload-single', upload.single('myFile'), (req: Request, res: Response) => {
  if (req.file) {
    res.status(200).json({
      message: 'File uploaded successfully',
      fileName: req.file.filename,
      // Access other file metadata
    });
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
});

// 4. Handle multiple files
app.post('/upload-multiple', upload.array('myFiles', 10), (req: Request, res: Response) => {
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        res.status(200).json({
            message: 'Files uploaded successfully',
            count: req.files.length
        });
    } else {
        res.status(400).json({ message: 'No files uploaded' });
    }
});


// 5. Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Multer error occurred: ' + err.message });
    }
    // Handle other unexpected errors
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
