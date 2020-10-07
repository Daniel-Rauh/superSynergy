const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestModelSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
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
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true })

const requestModel = mongoose.model('request', requestModelSchema)
module.exports = requestModel