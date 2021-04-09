'use strict'
const User = use('App/Models/User')
const {validate} = use('Validator') 
const https = require('https');

class UserController {


    async registro({request, response}){
        const data = await User.count()
        const id = data + 1

        const rules = {
            nombre: 'required|string',
            apellido: 'required|string',
            email: 'required|string',
            password: 'required|string',
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            const {nombre,apellido,email,password} = request.only(['nombre','apellido','email','password'])

            var crypto = require("crypto");
            var pin = crypto.randomBytes(8).toString('hex');
            
            try {
                const user = await User.create({
                    'user_id': id,
                    'nombre':nombre,
                    'apellido': apellido,
                    'email': email,
                    'password': password,
                    'pin': pin
                })
                
                response.status(201).json({
                    message: user
                })
            } catch (error) {
                response.status(400).json({
                    message: error
                })
            }
        }
    }

    async qr({response, auth}){
        const user = await User.where('user_id',auth.user.user_id).first()
        //const qr = await https.get('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=[1,2,3,4,5,6]')
        return response.status(200).json({
            pin: user.pin
        })
    }
}

module.exports = UserController
