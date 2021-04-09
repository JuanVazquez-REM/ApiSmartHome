'use strict'

const {validate} = use('Validator') 

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

                return response.status(200).json(
                    token
                )
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
                message: "Token valido"
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
