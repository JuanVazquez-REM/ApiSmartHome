'use strict'

class HumedadController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(data){
    console.log("Chat de humedad")
    this.socket.broadcastToAll("message",data)
    console.log(data)
  }
}

module.exports = HumedadController
