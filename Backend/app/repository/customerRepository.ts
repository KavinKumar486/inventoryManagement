
import Customer from '../models/customer.js'

class customerRepo{
    async add(obj:object){
        try{
            const payload = await Customer.create(obj)
            return payload
        }catch(err){
            throw new Error(err)
        }
    }
    async get(id?:number){
        try{
            const payload = await Customer.query()
            .if(id,(query=>{
                query.where('id',id!)
            }))
            if(!payload.length){
                throw new Error('No users found')
            }
            return payload
        }catch(err){
            throw new Error(err)
        }
    }
    async delete(id:number){
        try{
            await Customer.query().where('id',id).delete()
            return "Deletion success"                      
        }catch(err){
            throw new Error(err)
        }
    }
    async update(id:number,obj:object){
        try{
            const payload = await Customer.query().where('id',id).update(obj)
            if(!payload){
                throw new Error('No user found with this id')
            }
            return payload
        }catch(err){
            throw new Error(err)
        }
    }
    async patch(id:number,obj:object){
        try{
            const payload = await Customer.findOrFail(id)
            await payload.merge(obj).save()
            if(!payload){
                throw new Error('No user found with this id')
            }
            return payload
        }catch(err){
            throw new Error(err)
        }
    }
}
export default customerRepo