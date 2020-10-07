const mongoose = require('mongoose')
const Schema = mongoose.Schema

const allPostModelSchema = new Schema({
    type: {
        type:String
    },
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    author_url: {
        type: String,
    },
    request: {
        type: String,
    },
    category: {
        type: String,
    },
    name: {
        type: String
    },
    intro: {
        type: String
    },
    strength: {
        type: String
    },
    project_img: {
        type: String,
        required: true
    },
    project_url: {
        type: String,
    },
    github_url: {
        type: String,
    },
    title: {
        type: String
    }
}, { timestamps: true })

const allPostModel = mongoose.model('post', allPostModelSchema)
module.exports = allPostModel