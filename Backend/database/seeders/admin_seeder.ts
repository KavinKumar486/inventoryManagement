import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Admin from '../../app/models/admin.js'
import hash from '@adonisjs/core/services/hash'
export default class extends BaseSeeder {
  async run() {
    await Admin.create({
      username: 'admin',
      password: await hash.make('admin123')
    })
  }
}