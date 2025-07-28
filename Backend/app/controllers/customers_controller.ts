import type { HttpContext } from '@adonisjs/core/http'
import customerRepo from '../repository/customerRepository.js';
import { customerAddValidator,customerGetValidator,customerIdValidator } from '#validators/customer';
export default class CustomersController {
    customerRepo = new  customerRepo()
    async add({request,response}:HttpContext){
        console.log('request body',request.body())
        try{
            const { name,email,password,location } = await customerAddValidator.validate(request.body())
            const payload =  await this.customerRepo.add({name:name,email:email,password:password,location:location});
            response.status(201).send({status:'Success',message:'Added successfully',data:payload})
        }catch(err){
            throw err   
        }
    }
    async get({request,response}:HttpContext){
        console.log('request is here')
        try{
        const { id } = await customerGetValidator.validate(request.params());
        console.log('id',id)
        const payload = await this.customerRepo.get(id)
        console.log('payload',payload)
        if(!payload){
            response.status(404).send({status:'Error',message:'Customer not found'})
            return;
        }
        response.send({status:'Success',message:'Fetched Successfully',data:payload})
        }catch(err){
            throw err
        }   
    }
    async delete({request,response}:HttpContext){
        try{
            const {id} = await customerIdValidator.validate(request.params());
            const payload = await this.customerRepo.delete(id);
            response.status(204).send({status:'Success',data:payload})
        }catch(err){
            throw err
        }
    }
    async update({request,response}:HttpContext){
        try{
            const {id} = await customerIdValidator.validate(request.body());
            const payload = await this.customerRepo.update(id,request.body());
            response.status(200).send({status:'Success',message:'Updated successfully',data:payload})
        }catch(err){
            throw err
        }
    }
    async patch({request,response}:HttpContext){
        try{
            const {id} = await customerIdValidator.validate(request.body());
            const payload = await this.customerRepo.patch(id,request.body());
            response.status(200).send({status:'Success',message:'Patched successfully',data:payload})
        }catch(err){
            throw err
        }
    }
}
