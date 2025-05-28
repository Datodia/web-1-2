const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    fullName: {
        type: String, required: true,
    },
    email: {
        type: String, required: true, lowerCase: true,
    },
    password: {
        type: String, required: true, select: false
    },
    posts:{ 
        type: [mongoose.Schema.Types.ObjectId], ref: 'post', default: [] 
    }

}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)