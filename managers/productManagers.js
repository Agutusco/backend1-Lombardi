import fs from 'node:fs'


export default class ProductManager {
    constructor (path){
        this.path = path
    }



async getProducts() {
    try {
        if (fs.existsSync(this.path)) {
            const products = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(products);
        }else {
            return [];
        }
    } catch (error) {
        throw new Error(error.message)
    }
}


async getProductById(id){
    try {
        const products = await this.getProducts()
        if (!products.length > 0) {
            throw new Error("Lista de productos vacia")
        }
        const product = products.find((product) => product.id === id)
        if (!product) {
            throw new Error('Producto no encontrado')
        }
        return product
    } catch (error) {
        throw new Error(error.message);
    }
}

    async createProduct(product){
        try {
            const producto = await this.getProducts()
            producto.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(producto))
        } catch (error) {
            throw new Error(error.message)
        }
    }
}




