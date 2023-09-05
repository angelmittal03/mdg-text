import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";


const SocketHandler = (req, _ctx) => {
    if (_ctx.socket.server.io) {
      console.log('Socket is already running')
    } else {
      console.log('Socket is initializing')
      const io = new Server(_ctx.socket.server)
      _ctx.socket.server.io = io
  
      io.on('connection', socket => {
        socket.on('input-change', msg => {
          socket.broadcast.emit('update-input', msg)
        })
      })
    }
    _ctx.end()
  }
  
  export default SocketHandler