import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Define storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Specify the directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Rename file to avoid conflicts
  }
});

// Check file type function for multer
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

// Initialize multer upload middleware with storage settings and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb); // Check file type before upload
  }
});

// Serve static files (uploaded images) from the 'uploads' directory
const foodRouter = express.Router();
foodRouter.use('/uploads', express.static('uploads'));

// Route for adding food with image upload
foodRouter.post("/add", upload.single("image"), addFood);

// Route for listing all food items
foodRouter.get('/list', listFood);

// Route for removing a food item
foodRouter.post('/remove', removeFood);

export default foodRouter;
