import express from 'express'
const router = express.Router()
import { registerUser, authUser, getUserProfile, updateUserProfile, updateUser, getUsers, getUserById, deleteUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.post('/', registerUser).get('/', protect, admin, getUsers)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile).put('/profile', protect, updateUserProfile)
router.get('/:id', protect, admin, getUserById).put('/:id', protect, admin, updateUser).delete('/:id', protect, admin, deleteUser)

export default router