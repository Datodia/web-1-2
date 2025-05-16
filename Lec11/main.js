const express = require('express')
const apiRouter = require('./api')
const randomRouter = require('./random/random.route')

const app = express()

app.use(express.json())

// global middleware
app.use((req, res, next) => {
    console.log(req.headers['user-agent'])
    next()
})

app.use((req, res, next) => {
    const userAgent = req.headers['user-agent']
    console.log(userAgent)
    // if(!userAgent.includes('Chrome')){
    //     return res.status(400).json({error: "accepted onlt browsert"})
    // }
    next()
})

app.use('/api', apiRouter)
app.use('/random', randomRouter)


app.listen(4000, () => {
    console.log('server running on http://localhost:4000')
})