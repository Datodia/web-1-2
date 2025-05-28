const { Router } = require("express");
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const postRouter = Router()


postRouter.get('/', async (req, res) => {
    const posts = await postModel.find().populate('author', 'fullName email')
    res.json(posts)
})

postRouter.post('/', async (req, res) => {
    const {title, content} = req.body
    if(!title || !content) return res.status(400).json({error: "required filleds missed"})
    const post = await postModel.create({title, content, author: req.userId})
    const user = await userModel.findByIdAndUpdate(req.userId, {$push: {posts: post._id}})
    
    res.status(201).json({message: "created successfullu"})
})

module.exports = postRouter