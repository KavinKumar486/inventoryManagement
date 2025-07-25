import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'

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
      if (!process.env.JWT_SECRET) {
        return response.unauthorized({ error: 'JWT secret not provided' })
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
      request['user'] = decoded
    } catch (error) {
      return response.unauthorized({ error: 'Invalid token' })
    }

    return next()
  }
}
