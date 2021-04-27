'use strict'

class RaspberryController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(data){
    this.socket.broadcastToAll("message",data)
    console.log(data)
  }
}


module.exports = RaspberryController
