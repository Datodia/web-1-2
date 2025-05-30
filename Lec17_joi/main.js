const express = require('express')
const userSchema = require('./validations/user.validation')
const validateMiddleware = require('./middlewares/validate.middleware')
const app = express()

app.use(express.json())

// const user = {
//     fullName: 'requied string lengh',
//     email: 'requried email',
//     age: 'min 11 max 80 required number',
//     password: 'min max regex',
//     isSmoker: 'optrion default dalse'
// }

app.post('/', validateMiddleware(userSchema),  (req, res) => {
    // const {error, value} = userSchema.validate(req.body || {}, {abortEarly: false})
    // console.log(value, "req.body")
    // if(error){
    //     return res.status(400).json({
    //         error: error.details.map(er => er.message)
    //     })
    // }
    res.json(req.body)
})

// app.post('/posts', validateMiddleware(postSchema), (req))

app.listen(3000, ()=> {
    console.log('runngin on http://localhost:3000')
})