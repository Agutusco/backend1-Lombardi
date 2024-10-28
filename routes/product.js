import express from 'express'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { validator } from '../middlewares/products.validator.js'
import { v4 as uuid4 } from 'uuid'
import { writeFile } from 'fs/promises'
import fs from 'node:fs'


const __dirname = dirname(fileURLToPath(import.meta.url))

const routes = express.Router()

const productsFile = path.join(__dirname, '../data/productos.json')

//leer productos
const readProductos = async () =>{
    const data = fs.promises.readFile(productsFile, 'utf-8')
    return JSON.parse(data)
}


//Conseguir todos los productos

routes.get('/', validator, async(req, res) =>{
    try {
        const productos = readProductos()
        res.json(productos)
    } catch (error) {
        res.status(500).json({error:`Error leyendo el archivo de productos: ${error.message} `})
    }
})


//Conseguir producto por ID

routes.get('/:id', validator, async (req, res) =>{
    const productoId = parseInt(req.params.id)

    try {
        const productos = readProductos()
        const product = productos.find((prod) => prod.id === productoId)

        if (!product) {
            return res.status(404).json({error:"Producto no encontrado"})
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({error:`Error : ${error.message} `})
    }
})



//Subir un nuevo producto con una validación

routes.post('/', validator, async (req, res) =>{
    const {title, price, thumbnail} = req.body

    try {
        const productos = readProductos()
        const data = JSON.parse(productos)
        const nuevoProducto = {
            id: uuid4(),
            title,
            price,
            stock,
            description,
            code,
            status: true,
            category,
            thumbnail: thumbnail || '/images/thumbanil.default.png'
        }

        data.push(nuevoProducto)
        await writeFile(productsFile, JSON.stringify(data))
        res.status(202).json(nuevoProducto)
    } catch (error) {
        res.status(500).json({error:`Error al intentar guardar el producto: ${error.message} `})
    }
})


export default routes