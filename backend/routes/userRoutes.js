import express from 'express'
const router = express.Router()
import { registerUser, authUser, getUserProfile, upateUserProfile, upateUser, getUsers, getUserById, deleteUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.post('/', registerUser).get('/', protect, admin, getUsers)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile).put('/profile', protect, upateUserProfile)
router.get('/:id', protect, admin, getUserById).put('/:id', protect, admin, upateUser).delete('/:id', protect, admin, deleteUser)

export default router