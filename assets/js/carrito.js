let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//Actualizar el contador del carrito en el header
function actualizarCarritoCount() {
    const carritoCount = document.getElementById('carrito-count');
    if (carritoCount) { 
        if (carrito.length > 0) {
            carritoCount.textContent = carrito.length;
            carritoCount.style.display = 'inline-block';
        } else {
            carritoCount.style.display = 'none';
        }
    }
}

//Añadir producto al carrito
function añadirAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoCount();
}

// Añadir listeners a los botones de "Agregar al carrito"
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoCount();

    // Suponiendo que los botones tienen la clase 'add-to-cart'
    const botonesAgregar = document.querySelectorAll('.add-to-cart');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            // Puedes obtener los datos del producto desde atributos data-*
            const producto = {
                id: boton.getAttribute('data-id'),
                nombre: boton.getAttribute('data-nombre'),
                precio: boton.getAttribute('data-precio')
            };
            añadirAlCarrito(producto);
        });
    });
});

//Cargar el contador al iniciar la página
window.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoCount();
});