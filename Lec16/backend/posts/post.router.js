const { Router } = require("express");
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const { upload } = require("../config/cloudinary.config");
const { isValidObjectId } = require("mongoose");

const postRouter = Router()


postRouter.get('/', async (req, res) => {
    const posts = await postModel.find().populate('author', 'fullName email')
    res.json(posts)
})

postRouter.post('/', upload.single('image'), async (req, res) => {
    const {title, content} = req.body
    const insertData = {
        title,
        content,
        author: req.userId
    }
    if(req.file){
        insertData.image = req.file.path
    }
    if(!title || !content) return res.status(400).json({error: "required filleds missed"})
    const post = await postModel.create(insertData)
    const user = await userModel.findByIdAndUpdate(req.userId, {$push: {posts: post._id}})
    
    res.status(201).json({message: "created successfullu", data: post})
})

postRouter.delete('/:id',async (req, res) =>{
    const {id} = req.params
    if(!isValidObjectId(id)){
        return res.status(400).json({error: "error"})
    }

    const post = await postModel.findById(id)
    if(!post){
        return res.status(400).json({error: "error"})
    }

    if(post.author.toString() !== req.userId){
        return res.status(403).json({error: "permition denied"})
    }

    const deletedPost = await postModel.findByIdAndDelete(id)
    res.json({messagE: "deleted successfully", data: deletedPost})
})


postRouter.get('/:id',async (req, res) => {
    const {id} = req.params
    if(!isValidObjectId(id)){
        return res.status(400).json({error: "error"})
    }

    const post = await postModel.findById(id)
    if(!post){
        return res.status(400).json({error: "error"})
    }
    res.json(post)
})

postRouter.put('/:id', upload.single('image'),  async (req, res) =>{
    const {id} = req.params
    if(!isValidObjectId(id)){
        return res.status(400).json({error: "error"})
    }

    const post = await postModel.findById(id)
    if(!post){
        return res.status(400).json({error: "error"})
    }

    if(post.author.toString() !== req.userId){
        return res.status(403).json({error: "permition denied"})
    }

    const {title, content} = req.body

    const updatePost = await postModel.findByIdAndUpdate(id, {
        title,
        content,
        image: req?.file?.path
    })
    res.json({message: 'updated successfully', data: updatePost})
})

module.exports = postRouter