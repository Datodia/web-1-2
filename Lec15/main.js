const express = require('express')
const connectToDb = require('./db/connectToDb')
const studentModel = require('./models/student.model')
const { isValidObjectId } = require('mongoose')
const app = express()

connectToDb()

app.use(express.json())

app.get('/api/students', async (req, res) => {
    const students = await studentModel.find()
    res.json(students)
})

app.post('/api/students', async (req, res) => {
    const { fullName, age, isAdult, email, address } = req.body

    if (!fullName || !age || !req.body.hasOwnProperty('isAdult') || !email) {
        return res.status(400).json({ error: "fill requierd fields" })
    }

    const existStudent = await studentModel.findOne({email})
    if(existStudent){
        return res.status(400).json({error: "user already exists"})
    }

    const createdStudent = await studentModel.create({ fullName, age, isAdult, email, address })
    res.status(201).json({message: 'student created successfully'})
})

app.get('/api/students/:id', async (req, res) =>{
    const {id} = req.params

    if(!isValidObjectId(id)){
        return res.status(400).json({error: "wrong id is provided"})
    }

    const student = await studentModel.findById(id)
    if(!student){
        return res.status(404).json({error: "student not foudn"})
    }

    res.json(student)
})

app.delete('/api/students/:id', async (req, res) => {
    const {id} = req.params

    if(!isValidObjectId(id)){
        return res.status(400).json({error: "wrong id is provided"})
    }

    const deletedStudent = await studentModel.findByIdAndDelete(id)
    if(!deletedStudent){
        return res.status(404).json({error: "student not found"})
    }
    res.json({message: 'student deleted succsessfully', data: deletedStudent})
})

app.put('/api/students/:id', async (req, res) => {
    const {id} = req.params
    if(!isValidObjectId(id)){
        return res.status(400).json({error: "wrong id is provided"})
    }

    const { fullName, age, isAdult, email, address } = req.body

    const updatedStudent = await studentModel.findByIdAndUpdate(id, {fullName, age, isAdult, email, address, $inc: {__v: 1}}, {new: true})
    if(!updatedStudent){
        return res.status(404).json({error: "student not found"})
    }
    res.json({message: 'student updated succsessfully', data: updatedStudent})
})



app.listen(3000, () => {
    console.log('running on http://localhost:3000')
})