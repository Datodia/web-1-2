const { Router } = require("express");

const randomRouter = Router()

randomRouter.get('/', (req, res) => {
    const random = Math.floor(Math.random() * 1000) + 1
    res.send(`<h1 style="color: red;">${random}</h1>`)
})

module.exports = randomRouter