import Order from '../models/order.js'
import OrderItem from '../models/order_item.js'


export default class OrdersRepository {
  async add(data: object) {
  const { customerId, orderDate, deliveryDate, customerLocation, items } = data as any
  const trx = await Order.transaction()

  try {
    const order = await Order.create({
      customerId,
      orderDate: new Date(orderDate),
      deliveryDate: new Date(deliveryDate),
      customerLocation,
    }, { client: trx })

    const itemsPayload = items.map((item: any) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
    }))

    await OrderItem.createMany(itemsPayload, { client: trx })

    await trx.commit()
    return order
  } catch (error) {
    await trx.rollback()
    throw new Error(`Failed to create order: ${error.message}`)
  }
}


async get(id?: number, customerId?: number) {
  return await Order.query()
    .if(id, (query) => {
      query.where('id', id!)
    })
    .if(customerId, (query) => {
      query.where('customer_id', customerId!)
    })
    .preload('items', (itemQuery) => {
      itemQuery.preload('product')
    })
}

  async delete(id: number) {
          try {
              const payload = await Order.query().where('id', id).delete();
              if (!payload.length) {
                  throw new Error(`Order with id ${id} not found`);
              }
              return payload;
          } catch (error) {
              throw new Error(`Failed to delete order: ${error.message}`);
          }
      }
        async patch(id: number, data: any) {
            try {
                const payload = await Order.findOrFail(id)
                await payload.merge(data).save();
                if (!payload) {
                    throw new Error(`Order with id ${id} not found`);
                }
                return payload;
            } catch (error) {
                throw new Error(`Failed to update order: ${error.message}`);
            }
        }
        async update(id:number, data: object){
            try{
                const payload = await Order.query().where('id', id).update(data);
                if (!payload) {
                    throw new Error(`Order with id ${id} not found`);
                }
                return payload;
            }catch (error) {
                throw new Error(`Failed to update order: ${error.message}`);
            }
        }
}
