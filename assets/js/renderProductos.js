//Cargar productos en los slider-track
window.addEventListener('DOMContentLoaded', () => {
    const secciones = {
        "Tablets": document.querySelector("section:nth-of-type(1) .slider-track"),
        "Celulares": document.querySelector("section:nth-of-type(2) .slider-track"),
        "Computadoras": document.querySelector("section:nth-of-type(3) .slider-track")
    };
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card", "producto");

        card.innerHTML = `
        <h4>${producto.nombre}</h4>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>${producto.descripcion}</p>
        <h2>$${producto.precio}</h2>
        <button class="add-to-cart">Añadir al carrito</button>
    `;

        const addToCartButton = card.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            añadirAlCarrito(producto);
        });

        //Redireccionar al hacer click en la imagen del producto
        const img = card.querySelector("img");
        img.addEventListener("click", () => {
            window.location.href = `./detalles-producto.html?id=${producto.id}`;
        });

        if (secciones[producto.categoria]) {
            secciones[producto.categoria].appendChild(card);
        }
    });
});
