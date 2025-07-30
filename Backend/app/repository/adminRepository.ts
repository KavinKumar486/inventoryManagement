import hash from '@adonisjs/core/services/hash'
import Admin from '../models/admin.js'
class adminRepo{
    async get(username:string){
        try{
            const payload = await Admin.query().where('username',username).first()
            console.log('user',payload)
            return payload
        }catch(err){
            throw new Error(err)
        }
    }
    async verifyPassword(password:string,hashedPassword:string){
        try{
            return await hash.verify(password,hashedPassword)
        }catch(err){
            throw new Error(err)
        }
    }
}
export default adminRepo