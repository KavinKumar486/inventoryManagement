import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('customer_id').unsigned().references('id').inTable('customers').onDelete('CASCADE')
      table.date('order_date').notNullable()
      table.date('delivery_date').notNullable()
      table.string('customer_location').notNullable()
      table.timestamp('created_at') 
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}