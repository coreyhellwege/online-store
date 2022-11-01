import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { uploadImages } from '../middleware/uploadMiddleware.js'

const router = express.Router()

// Create the endpoint
router.post('/', protect, admin, uploadImages.single('image'), (req, res) => {
    res.send(`/${req.file.path}`) // just return the file path
})

export default router