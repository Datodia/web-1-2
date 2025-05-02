const express = require('express')
const fs = require('fs/promises')
const cors = require('cors')

const app = express()
app.use(cors({
    origin: 'https://df883k90-3000.euw.devtunnels.ms',
    credentials: true, // if you're using cookies or authentication
  }));
app.use(express.json())


app.get('/', (req, res) => {
    res.send('<h1>hello world 123</h1>')
})


app.get('/posts', async (req, res) => {
    const rawPosts = await fs.readFile('posts.json', 'utf-8')
    const posts = JSON.parse(rawPosts)

    res.status(200).json(posts)
})


app.post('/posts', async (req, res) => {
    if(!req.body){
        return res.status(400).json({erorr: "content and userName is required"})
    }
    const { content, userName } = req.body
    if(!content || !userName){
        return res.status(400).json({erorr: "content and userName is required"})
    }

    const rawPosts = await fs.readFile('posts.json', 'utf-8')
    const posts = JSON.parse(rawPosts)

    const lastId = posts[posts.length - 1]?.id || 0
    const newPost = {
        id: lastId+1,
        content,
        userName,
        createdAt: new Date().toISOString()
    }

    posts.push(newPost)
    await fs.writeFile('posts.json', JSON.stringify(posts))

    res.status(201).json({message: 'post created successfully', data: newPost})
})


app.delete('/posts/:id', async (req, res) => {
    const {id} = req.params
    const rawPosts = await fs.readFile('posts.json', 'utf-8')
    const posts = JSON.parse(rawPosts)

    const index = posts.findIndex(el => el.id === Number(id))
    if(index === -1){
        return res.status(404).json({message: 'post not found'})
    }

    const deletedPost = posts.splice(index, 1)
    await fs.writeFile('posts.json', JSON.stringify(posts))

    res.status(200).json({message: 'deleted successfully', data: deletedPost})
})

app.put('/posts/:id', async (req, res) => {
    const {id} = req.params
    const rawPosts = await fs.readFile('posts.json', 'utf-8')
    const posts = JSON.parse(rawPosts)

    const index = posts.findIndex(el => el.id === Number(id))
    if(index === -1){
        return res.status(404).json({message: 'post not found'})
    }

    const updatePost = {}
    if(req.body.content){
        updatePost.content = req.body.content
    }
    if(req.body.userName){
        updatePost.userName = req.body.userName
    }

    posts[index] = {
        ...posts[index],
        ...updatePost
    }

    await fs.writeFile('posts.json', JSON.stringify(posts))

    res.status(200).json({message: 'post updated successfully', data: posts[index]})
})

app.get('/posts/:id', async (req, res) => {
    const {id} = req.params
    const rawPosts = await fs.readFile('posts.json', 'utf-8')
    const posts = JSON.parse(rawPosts)

    const index = posts.findIndex(el => el.id === Number(id))
    if(index === -1){
        return res.status(404).json({message: 'post not found'})
    }

    res.status(200).json(posts[index])
})

app.listen(4000, () => {
    console.log(`server running on http://localhost:4000`)
})