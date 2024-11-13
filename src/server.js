import express from 'express'
import handlebars from 'express-handlebars'
import productosRouter from './routes/product.js'
import cartRouter from './routes/cart.js'
import viewRouter from './routes/view-route.js'
import { Server } from 'socket.io';
import ProductManager from '../managers/productManagers'
import path from 'path'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', express.static(path.join(process.cwd(), 'src', 'public')))


app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(process.cwd(), 'src', 'views'))

app.use('/products', productosRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewRouter
)


const httpServer = app.listen(8080, () =>{console.log("puerto 8080 ok")})

const socketServer = new Server(httpServer)

socketServer.on('connection', async(socket) =>{
        const products = await ProductManager.getProducts()
        socket.emit('actualizarProductos', products)

        socket.on('newProd', async (prod) =>{
                await ProductManager.createProduct(prod)
                const productos = await ProductManager.getProducts()
                socketServer.emit('actualizarProductos', productos)
        })

})
