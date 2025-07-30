import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Customer from '../../app/models/customer.js'
import Warehouse from '../../app/models/warehouse.js'
import Order from '../../app/models/order.js'
import OrderItem from '../../app/models/order_item.js'
// import hash from '@adonisjs/core/services/hash'
export default class extends BaseSeeder {
  async run() {
    await Customer.createMany([
      {"name":"abhijith","email":"abhijith@gmail.com","password":"abhijith123","location":"kilambakkam"},
      {"name":"anjana","email":"anjana@gmail.com","password":"anjana123","location":"vadapalani"},
      {"name":"aravind","email":"aravind@gmail.com","password":"aravind","location":"navalur"},
      {"name":"arun","email":"arun@gmail.com","password":"arun","location":"siruseri"},
      {"name":"barath","email":"barath@gmail.com","password":"barath123","location":"kelambakkam"}            
    ])
    
    const warehouseItems = await Warehouse.createMany([
      {"location":"kelambakkam","productName":"minoxidil","productQuantity":12,"price":220,"orderQuantity":20},
      {"location":"navalur","productName":"follihair","productQuantity":12,"price":450,"orderQuantity":10},
      {"location":"siruseri","productName":"fried rice mix","productQuantity":12,"price":90,"orderQuantity":20},
      {"location":"kilambakkam","productName":"soap","productQuantity":12,"price":22,"orderQuantity":20},
      {"location":"vadapalani6","productName":"water","productQuantity":12,"price":220,"orderQuantity":20},
    ])

    const orders = await Order.createMany([
      { customerId: 4, orderDate: new Date('2025-07-28'), deliveryDate: new Date('2025-08-01'), customerLocation: 'Mumbai' },
      { customerId: 4, orderDate: new Date('2025-07-27'), deliveryDate: new Date('2025-07-30'), customerLocation: 'Delhi' },
      { customerId: 3, orderDate: new Date('2025-07-26'), deliveryDate: new Date('2025-07-29'), customerLocation: 'Bangalore' },
    ])
    await OrderItem.createMany([
      { orderId: orders[0].id, productId: warehouseItems[0].id, quantity: 2, priceAtPurchase: 50000 },
      { orderId: orders[0].id, productId: warehouseItems[1].id, quantity: 1, priceAtPurchase: 500 },
      { orderId: orders[1].id, productId: warehouseItems[1].id, quantity: 3, priceAtPurchase: 500 },
      { orderId: orders[2].id, productId: warehouseItems[2].id, quantity: 1, priceAtPurchase: 1000 },
    ])
  }
}
