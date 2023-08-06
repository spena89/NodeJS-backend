import {productModel} from "./models/product.model.js"

export default class ProductDaoMongoDB{
    
    async getAll(){
        try {
            const response = await productModel.find({})
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async getById(id){
        try {
            const response = await productModel.findById(id)
            return response;            
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj){
        try {
            const response = await productModel.create(obj)
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update (id, obj){
        try {
            await productModel.findByIdAndUpdate(id, obj, {new: true});
            return obj;
        } catch (error) {
            console.log(error);
        }
    } 
    async delete (id) {
        try {
            const response = await productModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}