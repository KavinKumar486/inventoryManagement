import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'order_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id')
        table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
        table.integer('product_id').unsigned().references('id').inTable('warehouses')
        table.integer('quantity')
        table.integer('price_at_purchase')
        table.timestamps()

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}