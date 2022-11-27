var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'))


let history = []

io.on('connection', socket => {

  console.log(`Init connection: ID ${socket.id}`)

  history.forEach(line => socket.emit('draw', line))

  socket.on('clear', ()=>{
    history = new Array()
    io.emit('draw')
  })
  socket.on('draw', line => {
    history.push(line)
    io.emit('draw', line)
  })
})

server.listen(3000, ()=> console.log(`Server running in: http://localhost:3000`))