import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: String, required: true }, // individual rating
    comment: { type: String, required: true }
},{
    timestamps: true
})

const productSchema = mongoose.Schema({
    // User who created the product
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // model to reference for objectId
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema], // average of all review ratings
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema) // create a model from the schema

export default Product