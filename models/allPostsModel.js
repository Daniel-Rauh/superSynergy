const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    author: {
        type: String
    },
    comment: {
        type: String
    }
}, {timestamps: true})

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
    },
    project_url: {
        type: String,
    },
    github_url: {
        type: String,
    },
    title: {
        type: String
    },
    comments: {
        type: [commentSchema]
    }
}, { timestamps: true })

const allPostModel = mongoose.model('post', allPostModelSchema)
module.exports = allPostModel