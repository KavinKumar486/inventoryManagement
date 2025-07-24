import Warehouse from '../models/warehouse.js';

class WarehouseRepository {
    async add(data: object){
        try{
            const payload = Warehouse.create(data);
            if(!payload) {
                throw new Error('Error creating warehouse');
            }
            return payload;

        }catch (error) {
            throw new Error(`Error in while adding: ${error.message}`);
        }
    }
    async get(id?: number){
        try{
            const payload  = Warehouse.query()
            .if(id,(query)=>{
                return query.where('id', id!);
            })
            if(!payload) {
                throw new Error('Error fetching warehouse');
            }
            
            return payload;
        }catch(error){
            throw new Error(`Error in while fetching: ${error.message}`);
        }
    }
    async delete(id:number){
        try{
            await Warehouse.query().where('id',id).delete();
            return 'Deleted successfully';
        }
        catch(error){
            throw new Error(`Error in while deleting: ${error.message}`);
        }
    }
    async update(id: number, data: object){
        try{
            const payload = await Warehouse.query().where('id', id).update(data);
            if(!payload) {
                throw new Error('Error updating warehouse');
            }
            return payload;
        }catch(error){
            throw new Error(`Error in while updating: ${error.message}`);
        }
    }
    async patch(id: number, data: object){
        try{
            const payload = await Warehouse.findOrFail(id);
            payload.merge(data);
            await payload.save();
            if(!payload) {
                throw new Error('Error patching warehouse');
            }
            return payload;
        }catch(error){
            throw new Error(`Error in while patching: ${error.message}`);
        }
    }
}
export default WarehouseRepository;