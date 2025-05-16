const { readFile, writeFile } = require("../../utils");


const getAllPosts = async (req, res) => {
    const posts = await readFile('posts.json', true)
    res.json(posts)
}

const createPost = async (req, res) => {
    const email = req.headers['email']
    
    if(!req.body?.content){
        return res.status(400).json({error: 'Cotent is not provided'})
    }
    const posts = await readFile('posts.json', true)
    const lastId = posts[posts.length - 1]?.id || 0
    const newPost = {
        id: lastId +1,
        content: req.body.content,
        email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    posts.push(newPost)
    await writeFile('posts.json', JSON.stringify(posts))
    res.status(201).json({message: 'post created successfully', data: newPost})

}

const getPostById = async (req, res) => {
    const id = Number(req.params.id)
    const posts = await readFile('posts.json', true)
    const index = posts.findIndex(el => el.id === id)
    if(index === -1){
        return res.status(404).json({error: 'post not found'})
    }
    res.json(posts[index])
}

const deletePostById = async (req, res) => {
    const email = req.headers['email']
    const id = Number(req.params.id)
    const posts = await readFile('posts.json', true)
    const index = posts.findIndex(el => el.id === id)
    if(index === -1){
        return res.status(404).json({error: 'post not found'})
    }
    if(email !== posts[index].email){
        return res.status(401).json({error: "You dont have permition"})
    }
    const deletedPost = posts.splice(index, 1)
    await writeFile('posts.json', JSON.stringify(posts))
    res.json({message: 'deleted successfully', data: deletedPost})
}

const updatePostById = async (req, res) => {
    const email = req.headers['email']
    const id = Number(req.params.id)
    const posts = await readFile('posts.json', true)
    const index = posts.findIndex(el => el.id === id)
    if(index === -1){
        return res.status(404).json({error: 'post not found'})
    }
    if(email !== posts[index].email){
        return res.status(401).json({error: "You dont have permition"})
    }
    posts[index] = {
        ...posts[index],
        content: req.body?.content,
        updatedAt: new Date().toISOString()
    }
    await writeFile('posts.json', JSON.stringify(posts))
    res.json({message: 'updated successfully', data: posts[index]})
}

module.exports = {getAllPosts, createPost, getPostById, deletePostById, updatePostById}