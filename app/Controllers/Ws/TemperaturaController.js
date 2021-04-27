'use strict'

class TemperaturaController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(data){
    console.log("Chat de temperatura")
    this.socket.broadcastToAll("message",data)
    console.log(data)
  }
}

module.exports = TemperaturaController
