import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

/*
 * @desc   Authenticate user & get token.
 * @route  POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body,
        user = await User.findOne({ email }) // find the user by email

    // check if the user exists and the password they entered matches.
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token : generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

/*
 * @desc   Get user profile.
 * @route  GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id) // get the logged-in user

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

/*
 * @desc   Update user profile.
 * @route  PUT /api/users/profile
 * @access Private
 */
const upateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id) // get the logged-in user

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token : generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

/*
 * @desc   Register a new user.
 * @route  POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body,
        userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token : generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

/*
 * @desc   Get all users.
 * @route  GET /api/users
 * @access Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}) // no query params required
    res.json(users)
})

/*
 * @desc   Get user by ID.
 * @route  GET /api/users/:id
 * @access Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password') // get the ID from the URL and don't return their password
    
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

/*
 * @desc   Delete user.
 * @route  DELETE /api/users/:id
 * @access Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id) // get the ID from the URL
    
    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

/*
 * @desc   Update user.
 * @route  PUT /api/users/:id
 * @access Private/Admin
 */
const upateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id) // get the ID from the URL

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin ?? user.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export { authUser, getUserProfile, registerUser, upateUserProfile, upateUser, getUsers, getUserById, deleteUser }