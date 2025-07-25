import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'warehouses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unique().notNullable().primary()
      table.string('location').notNullable() 
      table.string('product_name').notNullable()
      table.integer('product_quantity').notNullable().defaultTo(0)
      table.integer('price').notNullable().defaultTo(0)
      table.integer('order_quantity').notNullable().defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}