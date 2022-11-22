const tituloEspecial = document.querySelector('#especial');
const templateProducto = document.querySelector('#template-producto');
const contenedorProductos = document.querySelector('.contenedor-productos');

function obtenerProductos() {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then(respuesta => respuesta.json())
        .then(datos => {
            datos.forEach(producto => {
                const nuevoProducto = templateProducto.content.cloneNode(true);
                nuevoProducto.querySelector('.titulo').textContent =
                    producto.title;
                nuevoProducto.querySelector('.precio').textContent =
                    producto.price;
                nuevoProducto.querySelector('.imagen').src = producto.images[2];

                contenedorProductos.appendChild(nuevoProducto);
            });
        });
}

obtenerProductos();
