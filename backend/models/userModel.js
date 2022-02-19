import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
})

/*
 * (Middleware) Compares an entered password to the stored hashed password for a user using bcrypt.
 */
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

/*
 * (Middleware) If the user's password is set or modified, encrypt it before saving the model.
 */
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema) // create a model from the schema

export default User