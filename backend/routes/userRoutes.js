import express from 'express'
const router = express.Router()
import { registerUser, authUser, getUserProfile, upateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/', registerUser)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile).put('/profile', protect, upateUserProfile)

export default router