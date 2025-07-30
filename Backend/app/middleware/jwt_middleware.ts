import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import Customer from '../models/customer.js'
import Admin from '../models/admin.js'
declare module '@adonisjs/core/http' {
  interface Request {
    user?: any
  }
}
export default class AuthJwt {
  async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    
    const token = request.header('authorization')?.replace('Bearer ', '')
    if (!token) {
      return response.unauthorized({ error: 'No token provided' })
    }
     
     try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
      let user = null
      if (decoded.type === 'admin') {
        user = await Admin.find(decoded.id)
      } else if (decoded.type === 'customer') {
        user = await Customer.find(decoded.id)
      }
      if (!user) {
        return response.unauthorized({ status: 'Error', message: 'Invalid user' })
      }
      request.user = user;
      (request as any).userType = decoded.type;
      await next()
    } catch (error) {
      return response.unauthorized({ status: 'Error', message: 'Invalid token' })
    }
  }
}