import express from 'express';
import upload from '../utils/multer.js';
import { uploadMedia } from '../utils/cloudinary.js';

const router = express.Router();

router.post('/upload-video',upload.single("file"),async (req,res) => {
    try {
        const result = await uploadMedia(req.file.path);
        console.log(result);
        
        res.status(200).json({
            success:true,
            message:"File uploaded",
            data:result
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})


export default router;