'use strict'

const Hash = require("@adonisjs/framework/src/Hash")

const Invited = use('App/Models/Invited')
const User = use('App/Models/User')
const {validate} = use('Validator') 

class InvitedController {

    async registro({request,response}){
        const rules = {
            pin: 'required|string',
            nombre: 'required|string',
            password: 'required|string',
        }

        const validation = await validate(request.all(), rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            const data = await Invited.count()
            const id = data + 1
            
            try {
                const {pin, nombre,password} = request.only(['pin','nombre','password'])
                const user = await User.where('pin',pin).first()
                const Hash = use('Hash')
                const safepassword = await Hash.make(password)
                const invitado = await Invited.create({
                    invitado_id: id,
                    user_id: user.user_id,
                    nombre: nombre,
                    password: safepassword,
                    is_accept: false
                })
                
                return response.status(201).json({
                    message: "Invitado creado correctamente",
                    invitado: invitado
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
            invitado_id: 'required|integer'
        }

        const validation = await validate(request.all(), rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const data  = request.only(['invitado_id'])
                await Invited.where('invitado_id', data.invitado_id).delete()
                return response.status(200).json({
                    message: "Invitado eliminado correctamente"
                })
            } catch (error) {
                return response.status(400).json({
                    message: error
                })
            }
        }
    }

    async actualizar_invitado({request,response,auth}){
        const rules = {
            nombre: 'required|string',
            invitado_id: 'required|integer',
        }

        const validation = await validate(request.all(), rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {nombre,invitado_id} = request.only(['nombre','invitado_id'])
                const invitado = await Invited.where('invitado_id',invitado_id).where('user_id',auth.user.user_id).first()
                invitado.nombre = nombre
                if(invitado.save()){
                    return response.status(200).json({
                        message: "Se actualizo el invitado correctamente",
                        invitado: invitado
                    })
                }else{
                    return response.status(400).json({
                        message: "No se pudo actualizar el invitado"
                    })
                }
            } catch (error) {
                return response.status(400).json({
                    message: error
                })
            }            
        }
    }

    async login({request,response}){
        const rules = {
            nombre: 'required|string',
            password: 'required|string'
        }

        const validation = await validate(request.all(), rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {nombre, password} = request.only(['nombre','password'])
                const Hash = use('Hash')
                const invitado = await Invited.where('nombre', nombre).where('is_accept',true).first()
                const check = await Hash.verify(password,invitado.password)
                if(check){
                    return response.status(200).json({
                        status: true,
                        message: invitado
                    })
                }else{
                    return response.status(400).json({
                        status: false,
                        message: "Nombre o password incorrectos",
                    })
                }
            } catch (error) {
                return response.status(400).json({
                    status: false,
                    message: error,
                })
            }        
        }
    }

    async solicitud_invitado({request,response}){
        const rules = {
            is_accept: 'required|boolean',
            invitado_id: 'required|integer',
        }

        const validation = await validate(request.all(), rules)
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {is_accept,invitado_id} = request.only(['is_accept','invitado_id'])
                const invitado = await Invited.where('invitado_id',invitado_id).first()

                invitado.is_accept = is_accept
                invitado.save()
                
                return response.status(200).json({
                    message: "Se actualizo el estado del invitado"
                })
            } catch (error) {
                return response.status(400).json({
                    message: error
                })
            }            
        }
    }

    async invitados({ response, auth}){
        try {
            const invitados = await Invited.where('user_id',auth.user.user_id).where('is_accept',true).fetch()
            return response.status(200).json({
                message: invitados
            })
        } catch (error) {
            return response.status(400).json({
                message: error
            })
        }
    }

    async invitados_pendientes({ response, auth}){
        try {
            const invitados = await Invited.where('user_id',auth.user.user_id).where('is_accept',false).fetch()
            return response.status(200).json(
                invitados
            )
        } catch (error) {
            return response.status(400).json({
                message: error
            })
        }
    }
}

module.exports = InvitedController
