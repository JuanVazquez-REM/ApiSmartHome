'use strict'

const {validate} = use('Validator') 
const User = use('App/Models/User')

class AuthController {

    async login({request, response, auth}){

        const rules = {
            email: 'required|string',
            password: 'required|string',
        }

        const validation = await validate(request.all(), rules)
        

        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {email, password} = request.only(['email','password'])
                const token = await auth.attempt(email,password)
                const user = await User.where('email',email).first()

                return response.status(200).json({
                    token: token,
                    user: user
                })
                
            } catch (error) {
                return response.status(400).json({
                    message: error
                })
            }
        
        }
    }


    async check({response,auth}){
        try {
            await auth.check()

            return response.status(200).json({
                status: true,
                message: "Token valido",
                user: auth.user
            })
            
        } catch (error) {
            return response.status(200).json({
                status: false,
                message: "Token Invalido"
            })
        }
    }
}

module.exports = AuthController
