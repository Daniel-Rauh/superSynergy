const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author_url: {
        type: String,
        required: true
    },
    request: {
        type: String,
        required: true
    },
    strength: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true })

const profileModel = mongoose.model('profile', profileModelSchema)
module.exports = profileModel