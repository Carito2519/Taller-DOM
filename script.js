const tituloEspecial = document.querySelector('#especial');
const templateProducto = document.querySelector('#template-producto');
const contenedorProductos = document.querySelector('.contenedor-productos');

const apiPropio = {}

function obtenerProductos() {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then(respuesta => respuesta.json())
        .then(datos => {
            apiPropio = datos.filter((_, index) => index < 10);

            apiPropio.forEach(producto => {
                const nuevoProducto = templateProducto.content.cloneNode(true);
                nuevoProducto.querySelector('.titulo').textContent =
                    producto.title;
                nuevoProducto.querySelector('.precio').textContent =
                    producto.price;
                nuevoProducto.querySelector('.imagen').src = producto.images[2];
                const boton = nuevoProducto.querySelector('.agregar-btn');

                boton.addEventListener('click', () => {
                    agregarCarrito(producto);
                });

                contenedorProductos.appendChild(nuevoProducto);
            });
        });
}

obtenerProductos();
