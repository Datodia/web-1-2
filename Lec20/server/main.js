
const http = require('http')
const express = require('express')

const { Server } = require('socket.io')
const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: '*'
})


io.on('connection', (socket) => {
    console.log(`${socket.id} connected`)

    socket.on('echoReciever', (data) => {
        console.log(data, "from echo message")

        socket.emit('echoSender', data)
    })

    socket.on('groupChat', (data) => {
        console.log(data, "data from group chat")
        // it sends message all connected users except sender
        // socket.broadcast.emit('groupChat', data)

        io.emit('groupChat', data)
    })

    socket.on('joinRoom', ({roomId, userEmail}) => {
        socket.join(roomId)
        console.log(`${userEmail} joined ${roomId}`)
    })

    socket.on('privateMessage', ({roomId, userEmail, msg}) => {
        // await chatModel.create({})

        //const message = await chatModel.find()
        io.to(roomId).emit('privateMessage', {roomId, userEmail, msg})
    })
    
})


server.listen(4000, () => {
    console.log('http://localhost:4000')
})




