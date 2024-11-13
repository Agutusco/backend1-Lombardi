import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import ProductManager from './productManagers.js'

export default class CartManager {
    constructor(path){
        this.path = path
    }


    async crearCart(){
        try {
            const cart ={
                id: uuidv4(),
                products: []
            }
            const cartFile = await this.getAllCarrito()
            cartFile.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
            return cart
        } catch (error) {
            throw new Error(error.message)
        }
    }



        async getAllCarrito(){
            try {
                if (fs.existsSync(this.path)) {
                    const carts = await fs.promises.readFile(this.path, 'utf-8')
                    return carts ? JSON.parse(carts) : []
                }
            } catch (error) {
                throw new Error(error.message)
        }
    }


    async getCartById(id){
        try {
            const carts = await this.getAllCarrito()
            const carritoEncontrado = carts.find((c) => c.id === id)
            if(!carritoEncontrado) throw new Error('Carrito no encontrado')
            return carritoEncontrado
        } catch (error) {
            throw new Error(error.message)
        }
    }


    async agregarAlCarrito(cartId, prodId){
        const producto = await ProductManager.getProducts()
        if(!producto) throw new Error('El producto no existe')


        const carts = await this.getAllCarrito()

        const cart = carts.find((c) => c.id === cartId)
        if(!cart) throw new Error('Carrito no existe')


        const prodInCart = cart.products.find(p => p.id === prodId)
        if(!prodInCart){
            const product ={
                id: prodId,
                quantity:1
            }
            cart.products.push(product)
        }else prodInCart.quantity += 1
    
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
        return cart
    }




}

