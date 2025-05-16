const { Router } = require("express");
const studentRouter = require("./students/students.route");
const postRoute = require("./posts/posts.route");

const apiRouter = Router()

//http://localhjost:4000/api
apiRouter.use('/students', studentRouter)
apiRouter.use('/posts', postRoute)

module.exports = apiRouter