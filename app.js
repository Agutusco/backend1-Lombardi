import express from 'express'
import productRouter from './src/routes/product.js'
import carritoRouter from './src/routes/cart.js'
const app = express()

app.use(express.json())

app.use('/products', productRouter)
app.use('/cart', carritoRouter)


app.listen(8080, () =>{
    console.log("puerto 8080 ok");
    
})

export default app