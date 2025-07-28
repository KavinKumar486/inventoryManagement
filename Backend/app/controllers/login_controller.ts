// import type { HttpContext } from '@adonisjs/core/http'

// export default class LoginController {
// }

import type { HttpContext } from '@adonisjs/core/http'
import Customer from '../models/customer.js'
import jwt from 'jsonwebtoken'  
import hash from '@adonisjs/core/services/hash';
const jwtSecret  = process.env.JWT_SECRET;

export default class LoginController {
  public async verify({ request, response }: HttpContext) {
    const { name,pass } = request.only(['name','pass'])
    const customer = await Customer.findBy('name', name)
    if (!customer) {
      return response.unauthorized({ error: 'Invalid name' })
    }
    let isPasswordValid = await hash.verify(customer.password, pass)
    console.log(customer.password, pass, isPasswordValid)
    

    if (!isPasswordValid) {
      return response.unauthorized({ error: 'Invalid credentials' })
    }

    const payload = {
        name: customer.name,
        id: customer.id,
        email: customer.email,      
    }

    if (!jwtSecret || typeof jwtSecret !== 'string') {
      throw new Error('JWT secret is missing or invalid in authConfig')
    }
    const token = jwt.sign(payload, jwtSecret as string);

    return response.ok({
      message: 'Verified',
      token,  
      type: 'bearer',
      user: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        location: customer.location,
      },
    })
  }
}