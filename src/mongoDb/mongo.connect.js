import { connect } from 'mongoose'

const Mongo_Link = process.env.Mongo_Link

export const initMongoDb = async() =>{
    try {
        await connect(Mongo_Link)
        console.log('Conectado con Mongo');
        
    } catch (error) {
        throw new Error(error)
    }
}