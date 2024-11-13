const socketClient = io()

const productoForm = document.getElementById('productoFormulario')
const nombre = document.getElementById('nombre')
const precio = document.getElementById('precio')
const categoria = document.getElementById('categoria')
const productos = document.getElementById('productos')


productoForm.onsubmit = (e) =>{
    e.preventDefault()

    const name = nombre.value
    const price = precio.value
    const category = categoria.value

    socketClient.emit('newProd', {name, price, category})
    productoForm.reset()
}


socketClient.on('actualizarProductos', (products) =>{
    productos.innerHTML = ''

    
    products.forEach(product =>{

    const div = document.createElement('div')
    div.innerHTML = `
        <p>${prod.name}</p>
        <p>${prod.price}</p>
        <p>${prod.categoria}</p>
    `

        productos.appendChild(div)

    })
})