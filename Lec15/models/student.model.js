const { default: mongoose } = require("mongoose");

const address = new mongoose.Schema({
    country: String,
    city: String,
    street: String
}, {_id: false})

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String, required: true
    },
    age: {
        type: Number, required: true
    },
    isAdult: {
        type: Boolean, required: true
    }, 
    email: {
        type: String, required: true, unique: true, lowercase: true
    }, 
    address: address
}, {timestamps: true})

module.exports = mongoose.model('student', studentSchema)