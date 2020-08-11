const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    mealCount: {
        type: String,
        required: true
    },
    mealImage: {
        data: Buffer,
        contentType: String
    },
    highlight: {
        type: Boolean,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamp: true })

module.exports = mongoose.model('Meal', MealSchema)