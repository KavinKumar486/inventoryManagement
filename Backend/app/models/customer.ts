import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasMany } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import hash  from '@adonisjs/core/services/hash'
import Order from './order.js'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare location: string;

  @hasMany(() => Order)
  declare orders: relations.HasMany<typeof Order>

  @beforeSave()
  static async hashPassword(customer: Customer) {
    if (customer.$dirty.password) {
      customer.password = await hash.make(customer.password)
    }
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

