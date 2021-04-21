'use strict'
const Device = use('App/Models/Device')
const {validate} = use('Validator') 
class DeviceController {

    async addDevice({request,response}){
        const rules = {
            tipo: 'required|string',
            nombre: 'required|string',
            descripcion: 'required|string',
            pin: 'required|integer',
            modelo: 'string'
        }

        const validation = await validate(request.all(), rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            const data = await Device.count()
            const id = data + 1

            try {
                const {tipo,nombre,descripcion,pin,modelo} = request.only(['tipo','nombre','descripcion','pin','modelo'])

                const dispositivo = await Device.create({
                    dispositivo_id: id,
                    tipo: tipo,
                    nombre: nombre,
                    descripcion: descripcion,
                    pin: pin,
                    modelo: String(modelo).toUpperCase()
                })

                return response.status(201).json({
                    message: "Dispositivo agregado",
                    dispositivo: dispositivo
                })
            } catch (error) {
                return response.status(400).json({
                    message: error
                })
            }
        }
    }

    async delete({request,response}){
        const rules = {
            dispositivo_id: 'required|integer'
        }

        const validation = await validate(request.all(), rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const data = request.only(['dispositivo_id'])
                await Device.where('dispositivo_id', data.dispositivo_id).delete()
                
                return response.status(200).json({
                    message: "Dispositivo eliminado correctamente"
                })
            } catch (error) {
                return response.status(400).json({
                    message: error
                })
            }
        }
    }

    async dataDevice({request,response}){

        const rules = {
            dispositivo_id: 'required|integer'
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {dispositivo_id} = request.only(['dispositivo_id'])
                const dispositivo = await Device.where('dispositivo_id', dispositivo_id).first()
                return response.status(200).json(
                    dispositivo
                )
            } catch (error) {
                return response.status(400).json({
                    message: error
                })
            }
        }
    }

    async index({response}){
        const dispositivos = await Device.all()
        console.log("hola".toLowerCase())
        return response.status(200).json(
            dispositivos
        )
    }

    async offAlarma({}){
        
    }

    async focos({response}){
        const focos = await Device.where("tipo","Foco").fetch()
        return response.status(200).json(
            focos
        )
    }

    async sensores_temperatura({response}){
        const sensores = await Device.where("tipo","Temperatura").first()
        return response.status(200).json(
            sensores
        )
    }

    async sensores_humedad({response}){
        const sensores = await Device.where("tipo","Humedad").fetch()
        return response.status(200).json(
            sensores
        )
    }

    async lista_pines({response}){
        var pines = [2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
        const devices = await Device.select('pin').fetch()
        for (let i = 0; i < devices.rows.length; i++) {
            this.removeItemFromArr(pines,devices.rows[i].pin)
            console.log(devices.rows[i].pin)
        }
        return response.status(200).json(pines)
    }
    async removeItemFromArr ( arr, item ) {
        var i = arr.indexOf( item );
        if ( i !== -1 ) {
            await arr.splice( i, 1 );
        }
    }

    async actualizar_dispositivo({request,response}){
        const rules = {
            dispositivo_id: 'required|integer',
            nombre: 'required|string',
            descripcion: 'required|string',
        }

        const validation = await validate(request.all(), rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {dispositivo_id,nombre,descripcion} = request.only(['dispositivo_id','nombre','descripcion'])
                const dispositivo = await Device.where('dispositivo_id',dispositivo_id).first()
                dispositivo.nombre = nombre
                dispositivo.descripcion = descripcion
                if(dispositivo.save()){
                    return response.status(200).json({
                        message: "Dispositivo actualizado",
                        dispositivo: dispositivo
                    })
                }else{
                    return response.status(400).json({
                        message: "No se pudo acualizar el dispositivo"
                    })
                }
            } catch (error) {
                return response.status(400).json({
                    message: error
                })
            }
        }
    }
}

module.exports = DeviceController
