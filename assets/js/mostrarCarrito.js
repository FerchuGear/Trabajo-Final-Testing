//Mostrar los productos del carrito en la página del carrito
window.addEventListener('DOMContentLoaded', () => {
    const carritoList = document.getElementById('carrito-list');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.forEach(producto => {
        const item = document.createElement('li');
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>$${producto.precio}</p>
        `;
        carritoList.appendChild(item);
    });
});