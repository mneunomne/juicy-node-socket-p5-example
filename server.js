const express = require('express')
const { Server } = require("socket.io");
const http = require('http')

const PORT = process.env.PORT || 3000
const app = express()

const server = http.Server(app);
// here we make available the folder "public" to be access
app.use(express.static('public'))

// socket.io
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on("move", data => {
    console.log('socket, data', data)
    socket.broadcast.emit("move", data)
  })
});

// setting the server to run on port 3000
server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}...`)
})