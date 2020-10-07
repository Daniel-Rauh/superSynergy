const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectModelSchema = new Schema({
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
    request: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true })

const projectModel = mongoose.model('project', projectModelSchema)
module.exports = projectModel