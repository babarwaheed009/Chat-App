const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log("Connected", socket.id)

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User connected with ID : ${socket.id} joined room ${data}`)
    })

    socket.on('send_message' , (data)=>{
        socket.to(data.room).emit('receive_message' , data);
    })

    socket.on('disconnect', () => {
        console.log("Disconnect", socket.id);
    })
})

server.listen(3001, () => {
    console.log(`Your Port listen on 3001`)
})
