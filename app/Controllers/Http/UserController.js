'use strict'
const User=use('App/Models/User')
class UserController{
    async register({request,response}){
        const{name,lastName,email,password,confirmPassword}=request.only([
            'name',
            'lastName',
            'email',
            'password',
            'confirmPassword',
        ])
        await User.create({
            name,
            lastName,
            email,
            password,
            confirmPassword,
        })
        return response.send({message:'Agha sakhte shod velemoon kon!'})
    }

    async login({request,response,auth}){
        const{email,password}=request.only(['email','password'])
        const token=await auth.attempt(email,password)
        return response.json(token)
    }

    async show ({params,response}){
        const user=await User.find(params.id)
        const res={
            name: user.name,
            lastName: user.lastName,
            email: user.email,
        }
        return response.json(res)
    }
}

module.exports = UserController
