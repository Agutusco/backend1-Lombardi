const socketClient = io()
const productos = document.getElementById(productos)

socketClient.on('arrayProducts', (products) =>{
    productos.innerHTML = ''

    products.forEach((product) =>{
        const listItem = document.createElement('div')
        listItem.innerHTML = ` 
        <h3 class="card-title">${product.name}</h3>
        <p class="card-text">Descripción: ${product.description}</p>
        <p class="card-text">Stock: ${product.stock}</p>
        <p class="card-text">Precio: $${product.price}</p>
        `
        productos.appendChild(listItem)
    })
})

