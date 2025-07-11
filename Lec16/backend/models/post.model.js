const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String, required: true,
    },
    content: {
        type: String, required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
    image: {
        type: String, 
    }
})

module.exports = mongoose.model('post', postSchema)