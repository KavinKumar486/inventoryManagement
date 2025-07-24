import type { HttpContext } from '@adonisjs/core/http'
import { warehouseAddValidator,warehouseGetValidator,warehouseIdValidator, warehousePatchValidator} from '#validators/warehouse'
import WarehouseRepository from '../repository/warehouseRepository.js'
export default class WarehousesController {
    warehouserepo = new WarehouseRepository()

    async add({ request, response }: HttpContext) {
        try{
            const {location, productName,productQuantity,price,orderQuantity} = await warehouseAddValidator.validate(request.body())
            const payload =  await this.warehouserepo.add({location:location,productName: productName,productQuantity: productQuantity, price:price, orderQuantity:orderQuantity})
            return response.send({status: 'success', data: payload})
        }catch (error) {
            return response.status(400).send({status: 'error', message: error.message})
        }
    }
    async get({request,response}:HttpContext){
        try{
            const {id} = await warehouseGetValidator.validate(request.params())
            const payload = await this.warehouserepo.get(id)
            return response.send({status: 'success', data: payload})
        }
        catch (error) {
            return response.status(400).send({status: 'error', message: error.message})
        }
    }
    async delete({request,response}:HttpContext){
        try{
            const {id} = await warehouseIdValidator.validate(request.params())
            const payload = await this.warehouserepo.delete(id)
            return response.send({status: 'success', data: payload})
        }
        catch (error) {
            return response.status(400).send({status: 'error', message: error.message})
        }
    }
    async update({request,response}:HttpContext){
        try{
            const {id} = await warehouseIdValidator.validate(request.params())
            const {location, productName,productQuantity,price,orderQuantity} = await warehouseAddValidator.validate(request.body())
            const payload = await this.warehouserepo.update(id,{location:location,productName: productName,productQuantity: productQuantity, price:price, orderQuantity:orderQuantity})
            return response.send({status: 'success', data: payload})
        }
        catch (error) {
            return response.status(400).send({status: 'error', message: error.message})
        }
    }
    async patch({request,response}:HttpContext){
        try{
            const {id} = await warehouseIdValidator.validate(request.params())
            const {location, productName,productQuantity,price,orderQuantity,orderId} = await warehousePatchValidator.validate(request.body())
            const payload = await this.warehouserepo.patch(id,{location:location,productName: productName,productQuantity: productQuantity, price:price, orderQuantity:orderQuantity, orderId:orderId})
            return response.send({status: 'success', data: payload})
        }
        catch (error) {
            return response.status(400).send({status: 'error', message: error.message})
        }
    }

}
