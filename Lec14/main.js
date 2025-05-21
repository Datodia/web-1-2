
const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

const users = [
    {
        id: 1,
        name: "giorgi",
        age: 21
    },
    {
        id: 2,
        name: "nika",
        age: 17
    }
]

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.post('/api/users', (req, res) => {
    const { name, age } = req.body

    const lastId = users[users.length - 1]?.id || 0
    const newUser = {
        id: lastId + 1,
        name,
        age
    }
    users.push(newUser)

    res.redirect('/')
})

app.post('/api/users/:id/delete', (req, res) => {
    const id = Number(req.params.id)
    const index = users.findIndex(el => el.id === id)
    if (index === -1) return res.status(400).send('user not found')
    users.splice(index, 1)

    res.redirect('/')
})

app.get('/api/users/:id/details', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(el => el.id === id)
    if (!user) return res.status(400).send('user not found')

    res.render('pages/details.ejs', { user })
})

app.get('/api/users/:id/update', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(el => el.id === id)
    if (!user) return res.status(400).send('user not found')

    res.render('pages/update.ejs', { user })
})

app.post('/api/users/:id/update', (req, res) => {
    const id = Number(req.params.id)
    const { name, age } = req.body
    const index = users.findIndex(el => el.id === id)
    if (index === -1) return res.status(400).send('user not found')

    const updateReq = {}
    if (name) updateReq.name = name
    if (age) updateReq.age = age

    users[index] = {
        ...users[index],
        ...updateReq
    }

    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render('pages/home.ejs', { users })
})

app.get('/create', (req, res) => {
    res.render('pages/create.ejs')
})


app.listen(3000, () => {
    console.log('server ruunnign http://localhost:3000')
})

