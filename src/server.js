import express from 'express'
import path from 'path'
import fs from 'fs/promises'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import productosRouter from './routes/product.js'
import mainRouter from './routes/main.js'
import getMainRouter from './routes/GetProducts.js'
import carrito from './routes/cart.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cartRouter from './routes/cart.js'
import viewRouter from './routes/view-route.js'
import ProductManager from '../managers/productManagers.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productManager = new ProductManager()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', express.static(path.join(process.cwd(), 'src', 'public')))
app.use(express.static(path.join(__dirname, "public")));

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(process.cwd(), 'views'))

app.use('/', mainRouter)
app.use('/products', productosRouter)
app.use('/realtimeProducts', getMainRouter)
app.use('/carrito', carrito)


const httpServer = app.listen(8080, () =>{console.log("puerto 8080 ok")})

const socketServer = new Server(httpServer)

export let arrayProducts = []

async function readProducts() {
        try {
                const data = await fs.readFile(productsFilePath, "utf-8");
                arrayProducts = JSON.parse(data);
                } catch (error) {
                console.error("Error al leer productos:", error.message);
                arrayProducts = [];
                }
        }


        async function writeProducts(products) {
                try {
                await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
                } catch (error) {
                console.error("Error al escribir productos:", error.message);
                }
        }

        await readProducts()

                socketServer.on("connection", (socket) => {
                console.log(`Usuario conectado: ${socket.id}`);

                socket.emit("arrayProducts", arrayProducts);
        
                
                socket.on("disconnect", () => {
                console.log("Usuario desconectado");
                });
        });
        
      
        app.post("/api/products/addProduct", async (req, res) => {
                try {
                const { name, description, stock, price } = req.body;
        
                
                if (!name || !description || !stock || !price) {
                return res.status(400).json({ error: "Todos los campos son obligatorios" });
                }
        
              
                const newProduct = {
                id: Date.now(),
                name,
                description,
                stock: Number(stock),
                price: Number(price),
                };
        
            
                arrayProducts.push(newProduct);
                await writeProducts(arrayProducts);
        
             
                socketServer.emit("arrayProducts", arrayProducts);
        
                
                res.status(201).json({ message: "Producto agregado correctamente", product: newProduct });
                } catch (error) {
                console.error("Error al agregar producto:", error.message);
                res.status(500).json({ error: "Error interno del servidor" });
                }
        });
        
