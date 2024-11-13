const socketClient = io()

const productos = document.getElementById(productos)

function mostrarProductos(products){
    productos.innerHTML = ''

    products.forEach(prod => {
        const div = document.createElement('div')
        div.innerHTML = `
            <p>${prod.name}</p>
            <p>${prod.price}</p>
            <p>${prod.categoria}</p>
        `

        productos.appendChild(div)
    });
}

socketClient.on('actualizarProductos', (products) =>{
    showProducts(products)
})