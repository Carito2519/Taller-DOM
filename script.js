const tituloEspecial = document.querySelector('#especial');
const templateProducto = document.querySelector('#template-producto');
const templateCarrito = document.querySelector('#template-carrito');
const contenedorProductos = document.querySelector('.contenedor-productos');
const contenedorCarrito = document.querySelector('.contenedor-carrito');

const apiPropio = { carrito: [] };

function obtenerProductos() {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then(respuesta => respuesta.json())
        .then(datos => {
            apiPropio.productos = datos.filter((_, index) => index < 10);
            recargarProductos();
        });
}

function recargarProductos() {
    contenedorProductos.innerHTML = '';

    apiPropio.productos.forEach(producto => {
        const nuevoProducto = templateProducto.content.cloneNode(true);
        nuevoProducto.querySelector('.titulo').textContent = producto.title;
        nuevoProducto.querySelector('.precio').textContent = producto.price;
        nuevoProducto.querySelector('.imagen').src = producto.images[2];
        const boton = nuevoProducto.querySelector('.agregar-btn');

        boton.addEventListener('click', () => {
            agregarCarrito(producto);
        });

        contenedorProductos.appendChild(nuevoProducto);
    });
}

function agregarCarrito(producto) {
    const indice = apiPropio.carrito.findIndex(p => p.id == producto.id);

    if (indice != -1) {
        apiPropio.carrito[indice].cantidad += 1;
    } else {
        apiPropio.carrito.push({ id: producto.id, cantidad: 1 });
    }
    recargarCarrito();
}

function recargarCarrito() {
    contenedorCarrito.innerHTML = '';

    apiPropio.carrito.forEach(data => {
        const producto = apiPropio.productos.filter(p => p.id == data.id)[0];

        const nuevoCarrito = templateCarrito.content.cloneNode(true);
        nuevoCarrito.querySelector('.titulo').textContent = producto.title;
        nuevoCarrito.querySelector('.precio').textContent = producto.price;
        nuevoCarrito.querySelector('.cantidad').textContent = data.cantidad;
        nuevoCarrito.querySelector('.total').textContent =
            producto.price * data.cantidad;
        nuevoCarrito.querySelector('.imagen').src = producto.images[2];
        const boton = nuevoCarrito.querySelector('.eliminar-btn');

        contenedorCarrito.appendChild(nuevoCarrito);
    });
}

obtenerProductos();
