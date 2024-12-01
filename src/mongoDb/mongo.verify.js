import { ProductModel } from "./models/product.model";
import { initMongoDb } from "./mongo.connect";

const testMongo = async() =>{
    try {
        await initMongoDb()

        const producto = {
            name: 'Pan',
            stock: 90,
            category: 'Alimento',
            price: 1400
        }

        return await ProductModel.create(producto)

    } catch (error) {
        console.log(error.message);
        
    }
}

testMongo()