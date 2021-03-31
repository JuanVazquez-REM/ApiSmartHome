'use strict'
const Route = use('Route')
Route.get('/', () => 'Hello Adonis')

//Registro User
Route.post('/login','AuthController.login')
//Login user
Route.post('/register','UserController.registro')

//Registro invitado
Route.post('/register/invited','InvitedController.registro')
//Login Invitado
Route.post('/login/invited','InvitedController.login')

//check token
Route.get('/check','AuthController.check')

Route.group(() => {
  
  //Agregar nuevo dispositivo
  Route.post('/device','DeviceController.addDevice')
  //Eliminar dispositivo
  Route.delete('/delete/device','DeviceController.delete')
  //Muestra todo los dispositivos
  Route.get('/devices','DeviceController.index')
  //Muestra todo los focos
  Route.get('/lights','DeviceController.focos')
  //Muestra todo los sensores de temperatura
  Route.get('/sensors/temperature','DeviceController.sensores_temperatura')
  //Muestra todo los sensores de humedad
  Route.get('/sensors/humidity','DeviceController.sensores_humedad')
  //Actualizar dispositivo
  Route.put('/device','DeviceController.actualizar_dispositivo')

  //Muestra los pines ocupados de la raspberry pi
  Route.get('/pines','DeviceController.lista_pines')

  //Agregar un Dato
  Route.post('/data','DatumController.addDato')
  //Mostrar ultimos 5 datos
  Route.post('/show/last','DatumController.showLast5')

  //Mostrar solicitudes de invitados pendientes
  Route.get('/pending/invited','InvitedController.invitados_pendientes')
  //Aceptar o negar para ser invitado
  Route.post('/request/invited','InvitedController.solicitud_invitado')
  //Ver invitados
  Route.get('/invited','InvitedController.invitados')
  //Eliminar Invitado
  Route.delete('/delete/invited','InvitedController.delete')
  //Actualizar Invitado
  Route.put('/invited','InvitedController.actualizar_invitado')

  //Muestra el qr del usario, para que se puedan unir los invitados
  Route.get('/qr','UserController.qr')
}).middleware(['auth'])