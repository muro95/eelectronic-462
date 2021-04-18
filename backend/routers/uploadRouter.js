import multer from 'multer';
import express from'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

//define storage using folder 
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

//let the system know it will expect one file with the name is image
uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRouter;