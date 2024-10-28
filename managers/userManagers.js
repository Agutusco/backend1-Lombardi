const fs = require("fs");
const { stringify } = require("node:querystring");

class UserManager {
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


const userManager = new UserManager('./users.json')

const user1 = {
    name: 'Juan',
    lastname: 'perez',
    age: 67,
    course: 'Backend'
}

const user2 = {
    name: 'segio',
    lastname: 'gomez',
    age: 20,
    course: 'JS'
}

const test = async() =>{
    console.log(await userManager.getProducts()); // Cambiado de UserManager a userManager
    await userManager.createProduct(user1)
    await userManager.createProduct(user2)
    console.log(await userManager.getProducts()); // Cambiado de UserManager a userManager

}

test()