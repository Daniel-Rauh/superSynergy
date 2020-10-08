const express = require('express')
const app = express()
require("dotenv").config()
const mongoose = require('mongoose')
const moment = require('moment')
const port = process.env.PORT || 3100
const requestModel = require('./models/requestModel')
const allPostModel = require('./models/allPostsModel')
const profileModel = require('./models/profileModel')
const projectModel = require('./models/projectModel')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', './views')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("I am connect")
        app.listen(port, () => {
            console.log(`listening at http://localhost:${port}/`)
        })
    })
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    allPostModel.find()
        .sort('-createdAt')
        .then((result) => {
            let allPosts = result
            res.status(200).render('index', { allPosts, moment })
        })
})

app.get('/newPost', (req, res) => {
    res.status(200).render('newPost')
})

app.post('/new', (req, res) => {
    const newRequest = new requestModel({
        type: 'request',
        title: req.body.title,
        author: req.body.author,
        author_url: req.body.author_url,
        request: req.body.request,
        category: req.body.category
    }).save()
    const newPost = new allPostModel({
        type: 'request',
        title: req.body.title,
        author: req.body.author,
        author_url: req.body.author_url,
        request: req.body.request,
        category: req.body.category
    }).save()
        .then(() => {
            console.log("I am saved")
            res.status(201).redirect('/newPost')
        })
})

app.get('/newProfile', (req, res) => {
    res.status(200).render('newProfile')
})

app.post('/addProfile', (req, res) => {
    res.status(201).redirect('/newPost')
    const newProfile = new profileModel({
        type: 'profile',
        name: req.body.name,
        author_url: req.body.author_url,
        strength: req.body.strength,
        request: req.body.request
    }).save()
    const newPost = new allPostModel({
        type: 'profile',
        name: req.body.name,
        author_url: req.body.author_url,
        strength: req.body.strength,
        request: req.body.request
    }).save()
        .then(() => {
            console.log("I am saved")
            res.status(201).redirect('/newProfile')
        })
})

app.get('/newProject', (req, res) => {
    res.status(200).render('newProject')
})

app.post('/addProject', (req, res) => {
    const newProject = new projectModel({
        type: 'project',
        title: req.body.title,
        author: req.body.author,
        author_url: req.body.author_url,
        project_img: req.body.project_img,
        project_url: req.body.project_url,
        github_url: req.body.github_url,
        request: req.body.request
    }).save()
    const newPost = new allPostModel({
        type: 'project',
        title: req.body.title,
        author: req.body.author,
        author_url: req.body.author_url,
        project_img: req.body.project_img,
        project_url: req.body.project_url,
        github_url: req.body.github_url,
        request: req.body.request
    }).save()
        .then(() => {
            console.log("I am saved")
            res.status(201).redirect('/newProject')
        })
})

app.post('/newFeedComment/:id', (req, res) => {
    allPostModel.findById(req.params.id)
        .then((result) => {
            if (result.comments === undefined) {
                let comments = [req.body]
                allPostModel.findByIdAndUpdate({ _id: req.params.id }, { comments: comments }, { useFindAndModify: false })
                    .catch(err => console.log(err))
                    .then(() => {
                        console.log(result.request)
                        console.log(" All updated")
                        requestModel.findOneAndUpdate({ request: result.request }, { comments: comments }, { useFindAndModify: false })
                            .catch(err => console.log(err))
                            .then(() => {
                                console.log(" Single updated")
                            })
                    })
            } else {
                let comments = result.comments
                comments.push(req.body)
                allPostModel.findByIdAndUpdate({ _id: req.params.id }, { comments: comments }, { useFindAndModify: false })
                    .catch(err => console.log(err))
                    .then(() => {
                        console.log(" All updated")
                        requestModel.findOneAndUpdate({ request: result.request }, { comments: comments }, { useFindAndModify: false })
                            .catch(err => console.log(err))
                            .then((result) => {
                                console.log(result)
                                console.log(" Single updated")
                            })
                    })
            }
            res.redirect('/')
        })
})