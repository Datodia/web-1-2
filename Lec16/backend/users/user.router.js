const { Router } = require("express");
const userModel = require("../models/user.model");

const userRouter = Router()


userRouter.get('/', async (req, res) => {
    const {createdAt, email, posts} = req.query
    const sort = {
        createdAt: -1
    }
    const filter = {}
    if(createdAt === 'asc'){
        sort.createdAt = 1
    }

    if(email){
        filter.email = {'$regex': new RegExp(`^${email}`)}
    }
    if(posts === 'true'){
        filter.posts = {'$ne': []}
    }

    console.log(filter, "filter")

    const users = await userModel
                            .find(filter)
                            .populate('posts', 'title content')
                            .sort(sort)
    res.json(users)
})


module.exports = userRouter