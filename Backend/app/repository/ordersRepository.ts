import Order from '../models/order.js'

class OrdersRepository {
    async add(data: any) {
        try {
            
            const payload = await Order.create({
                ...data,
                orderDate: new Date(data.orderDate),
                deliveryDate: new Date(data.deliveryDate)
            });
            return payload;
        } catch (error) {
            console.error('Database error:', error); 
            throw new Error(`Failed to add order: ${error.message}`);
        }
    }
    async get(id?:number){
        try{

            const payload = await Order.query()
            .if(id, (query) => {
                query.where('id', id!);
            })
            return payload;
        }catch (error) {
            throw new Error(`Failed to retrieve orders: ${error.message}`);
        }
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
export default OrdersRepository;
