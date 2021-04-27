'use strict'

class CocheraController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(data){
    console.log("Chat de Cochera")
    this.socket.broadcastToAll("message",data)
    console.log(data)
  }
}

module.exports = CocheraController
