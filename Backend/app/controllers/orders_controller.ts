import type { HttpContext } from '@adonisjs/core/http'
import { orderAddValidator, orderGetValidator, orderIdValidator, orderPatchValidator } from '#validators/order';
import  OrdersRepository  from '../repository/orderItemRepository.js';

export default class OrdersController {
    order = new OrdersRepository();
    async add({request,response}: HttpContext) {
        try
        {
        const data = await orderAddValidator.validate(request.body());
        const result = await this.order.add(data);
        return response.send({status:"Success", data: result});
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async get({ request, response }: HttpContext) {
      try {
        const { id, customerId } = await orderGetValidator.validate(request.qs())
        console.log('id',id,"custId",customerId)
        const result = await this.order.get(id, customerId)
        return response.send({ status: 'Success', data: result })
      } catch (error) {
        return response.status(400).send({ status: 'Error', message: error.message })
      }
    }


    async delete({request,response}:HttpContext){   
        try{
            const {id} = await orderIdValidator.validate(request.params());
            const result = await this.order.delete(id);
            return response.send({status:"Success", data: result});
        }catch (error) {
            throw new Error(error.message);
        }
    }
    async update({request,response}:HttpContext){
        try{
            const {id} = await orderIdValidator.validate(request.params());
            const data = await orderAddValidator.validate(request.body());
            const result = await this.order.update(id, data);
            return response.send({status:"Success", data: result});
        }catch (error) {
            throw new Error(error.message);
        }
    }
    async patch({request,response}:HttpContext){
        try{
            const {id} = await orderIdValidator.validate(request.params());
            const data = await orderPatchValidator.validate(request.body());
            const result = await this.order.patch(id, data);
            return response.send({status:"Success", data: result});
        }catch (error) {
            throw new Error(error.message);
        }
    }
}