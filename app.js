import express from 'express'
import productRouter from './routes/product.js'
import carritoRouter from './routes/cart.js'
const app = express()

app.use(express.json())

app.use('/products', productRouter)
app.use('/cart', carritoRouter)



export default app