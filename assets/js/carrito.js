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

//Cargar el contador al iniciar la página
window.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoCount();
});