import express from 'express'
const router = express.Router()
import { registerUser, authUser, getUserProfile, upateUserProfile, getUsers } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.post('/', registerUser).get('/', protect, admin, getUsers)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile).put('/profile', protect, upateUserProfile)

export default router