import type { HttpContext } from '@adonisjs/core/http'
import adminRepo from '../repository/adminRepository.js'
import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js'
import { adminLoginValidator } from '../validators/admin.js'
import hash from '@adonisjs/core/services/hash'
export default class AdminLoginsController {
    async add({request,response}:HttpContext){
        try{const {name, pass}= request.body();
        await Admin.create({username:name,password:pass})
        response.send('Success')}

        catch(err){

            response.send(err)
        }
    }
    adminRepo = new adminRepo()
    async login({ request, response }: HttpContext) {
    try {
      const { username, password } = await adminLoginValidator.validate(request.all())
      console.log('username',username)
      console.log('password',password)
      const admin = await this.adminRepo.get(username)
      console.log('admin',admin)

      const receivedPass = await hash.make(password)
      console.log(receivedPass)
      console.log(admin?.password)
      

    if (!admin) {
     return response.status(401).send({ status: 'Error', message: 'Invalid credentials' })
    }
      const token = jwt.sign({ id: admin.id, type: 'admin' }, process.env.JWT_SECRET as string)
      return response.ok({
        message: 'success',
        token,
        type: 'bearer',
        user: { id: admin.id, username: admin.username },
      })
    } catch (error) {
      return response.status(400).send({ status: 'Error', message: error.message })
    }
  }
}