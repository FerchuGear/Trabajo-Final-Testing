//Obtener el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const productoId = Number(urlParams.get('id')); // Convertir el id a número

//Buscar el producto en la lista de productos
const producto = productos.find(p => p.id === productoId);

//Mostrar los detalles del producto
const detallesContainer = document.querySelector('main');
if (producto) {
    //Renderizar columna izquierda con imágenes cliqueables
    const imagenesHtml = producto.imagenes.map(imagen => `
        <img src="${imagen}" alt="${producto.nombre}" class="thumbnail" onclick="mostrarImagenPrincipal('${imagen}')">
    `).join('');

    detallesContainer.innerHTML = `
        <div class="detalles-layout">
            <aside class="imagenes-columna">
                ${imagenesHtml}
            </aside>
            <section class="detalles-principal">
                <h1>${producto.nombre}</h1>
                <img id="imagen-principal" src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.descripcion}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>
                <button class="add-to-cart" 
                        data-id="${producto.id}" 
                        data-nombre="${producto.nombre}" 
                        data-precio="${producto.precio}"
                        data-imagen="${producto.imagen}"
                        data-categoria="${producto.categoria}">
                    Añadir al carrito
                </button>
            </section>
        </div>
    `;
} else {
    detallesContainer.innerHTML = `<p>Producto no encontrado.</p>`;
}

//Función para cambiar la imagen principal
function mostrarImagenPrincipal(imagen) {
    const imagenPrincipal = document.getElementById('imagen-principal');
    imagenPrincipal.src = imagen;
}

document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', () => {
        window.location.href = './productos.html';
    });
});

