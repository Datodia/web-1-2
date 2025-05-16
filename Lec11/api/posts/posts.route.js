const { Router } = require("express");
const { getAllPosts, createPost, getPostById, deletePostById, updatePostById } = require("./posts.service");
const hasEmailMiddleware = require("../../middlewares/hasEmail.middleware");
const aceessMiddleware = require("../../middlewares/roleAccess.middleware");
// const { isViewer, isEditor, isAdmin } = require("../../middlewares/roleAccess.middleware");

const postRoute = Router()

postRoute.get('/', aceessMiddleware('admin', 'editor', 'viewer'),  getAllPosts)
postRoute.post('/', hasEmailMiddleware, aceessMiddleware('admin', 'editor'),  createPost)
postRoute.get('/:id', aceessMiddleware('admin', 'editor', 'viewer'), getPostById)
postRoute.delete('/:id', hasEmailMiddleware, aceessMiddleware('admin'), deletePostById)
postRoute.put('/:id', hasEmailMiddleware, aceessMiddleware('admin', 'editor'), updatePostById)

module.exports = postRoute