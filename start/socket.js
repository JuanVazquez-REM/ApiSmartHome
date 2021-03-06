'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')
//Channel Temperatura
Ws.channel('wstemp','TemperaturaController')
//Channel Humedad
Ws.channel('wshum','HumedadController')
//Channel Focos
Ws.channel('wsfoco','FocoController')
//Channel Cochera
Ws.channel('wscochera','CocheraController')