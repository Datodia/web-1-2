const { Router } = require("express");

const studentRouter = Router()

const students = [
    {
        id: 1,
        name: "gela",
        age: 21
    }
]
// http://loclahost:4000/api/students
studentRouter.get('/', (req, res) => {
    res.json(students)
})

module.exports = studentRouter