'use strict'

class FocoController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(data){
    this.socket.broadcast("message",data)
    console.log(data)
  }
}

module.exports = FocoController
