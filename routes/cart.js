import express from 'express'
import { error } from 'node:console'
import fs from 'node:fs'
import path from 'node:path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'


const routes = express.Router()

const __dirname = dirname(fileURLToPath(import.meta.url))

const carritoFile = path.join(__dirname, '../data/carrito.json')

const readCarrito = () =>{
    const data = fs.readFileSync(carritoFile)
    return JSON.parse(data)
}


//obtener productos por ID

routes.get('/:cid', (req,res) =>{
    const carts = readCarrito()
    const carritoId = parseInt(req.params.cid)
    const verificarID = carts.find(cart => cart.id === carritoId)

    if (!verificarID) {
        return res.status(404).json({error:"Carrito no encontrado"})
    }

    res.json(verificarID.products)

})


//agregar producto al carrito
routes.post("/:cid/product:/id", (req,res) =>{
    const carts = readCarrito()
    const carritoId = parseInt(req.params.cid)
    const porductoId = parseInt(req.params.id)

    const verificarID = carts.find(cart => cart.id === carritoId)

    if (!verificarID) {
        return res.status(404).json({error:"Carrito no encontrado"})
    }


    //Buscar producto en el carrito
    const productoExistente = verificarID.find(p => p.producto === porductoId )

    if (productoExistente) {
        productoExistente.quantity++
    }else{
        const nuevoProduct = {product: porductoId, quantity:1}
        verificarID.products.push(nuevoProduct)
    }

    fs.writeFileSync(carritoFile, JSON.stringify(verificarID, null, 2))
    res.status(200).json(verificarID.products)

})





export default routes