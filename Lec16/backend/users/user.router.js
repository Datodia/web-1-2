const { Router } = require("express");
const userModel = require("../models/user.model");

const userRouter = Router()


userRouter.get('/', async (req, res) => {
    const users = await userModel.find().populate('posts', 'title content')
    res.json(users)
})


module.exports = userRouter