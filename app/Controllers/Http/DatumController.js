'use strict'
const Datum = use('App/Models/Datum')
const {validate} = use('Validator') 

class DatumController {

    async addDato({request,response}){
        const rules = {
            dispositivo_id: 'required|integer',
            dato: 'required|string'
        }

        const validation = await validate(request.all(), rules)
        if(validation.fails()){
            return validation.messages()
        } else {
            const data = await Datum.count()
            const id = data + 1

            try {
                const {dispositivo_id, dato} = request.only(['dispositivo_id','dato'])
                const dato_insert = await Datum.create({
                    data_id: id,
                    dispositivo_id: dispositivo_id,
                    dato: dato,
                })

                return response.status(201).json({
                    message: "Dato agregado",
                    dato: dato_insert
                })
            } catch (error) {
                return response.status(400).json({
                    message: error
                })
            }
        }
    }

    async showLast5({request,response}){
        const rules = {
            dispositivo_id: 'required|integer',
        }

        const validation = await validate(request.all(), rules)
        if(validation.fails()){
            return validation.messages()
        } else {
            
                const data = request.only(['dispositivo_id'])
                const regitros = await Datum.where('dispositivo_id',data.dispositivo_id).sort({ created_at: -1 }).limit(5).fetch()

                return response.status(200).json({
                    message: "Lista de los ultimos 5 registros",
                    registros: regitros
                })
           
        }
    }

}

module.exports = DatumController
