const express = require('express')
const { readFile, writeFile } = require('./utils')

const app = express()

app.use(express.json())

app.get('/api/posts', async (req, res) => {
    const posts = await readFile('posts.json', true)
    res.json(posts)
})

app.post('/api/posts', async (req, res) => {
    const email = req.headers['email']
    if(!email){
        return res.status(401).json({error: 'Email in not provided'})
    }
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

})

app.get('/api/posts/:id', async (req, res) => {
    const id = Number(req.params.id)
    const posts = await readFile('posts.json', true)
    const index = posts.findIndex(el => el.id === id)
    if(index === -1){
        return res.status(404).json({error: 'post not found'})
    }
    res.json(posts[index])
})


app.delete('/api/posts/:id', async (req, res) => {
    const email = req.headers['email']
    if(!email){
        return res.status(401).json({error: 'Email in not provided'})
    }
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
})

app.put('/api/posts/:id', async (req, res) => {
    const email = req.headers['email']
    if(!email){
        return res.status(401).json({error: 'Email in not provided'})
    }
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
})


// app.get('/', (req, res) => {
//     const secret = req.headers['secret']
//     if(secret === '12345'){
//         return res.send('this is secret info')
//     }
//     res.send('<h1 style="color: red;">Hello world</h1>')
// })

// app.get('/posts', (req, res) => {
//     res.redirect('https://chess.com')
// })

// app.get('/:name', (req, res) => {
//     console.log(req.params, "req.params")
//     res.send('dynamic route')
// })

// app.get('/:name/:id', (req, res) => {
//     console.log(req.params, "req.params")
//     res.send('double dynamic route')
// })



app.listen(4000, () => {
    console.log('server running on http://localhost:4000')
})