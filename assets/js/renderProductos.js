//Cargar productos en los slider-track
window.addEventListener('DOMContentLoaded', () => {
    const secciones = {
        "Tablets": document.querySelector("section:nth-of-type(1) .slider-track"),
        "Celulares": document.querySelector("section:nth-of-type(2) .slider-track"),
        "Computadoras": document.querySelector("section:nth-of-type(3) .slider-track")
    };

    //Función para cargar productos recientes
    const cargarProductosRecientes = () => {
        const productosRecientes = productos
            .sort((a, b) => b.id - a.id) //Ordenar por ID descendente
            .slice(0, 5); //Tomar los primeros 5 productos más recientes

        const recientesSeccion = document.querySelector(".recientes .slider-track");
        productosRecientes.forEach(producto => {
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

            const img = card.querySelector("img");
            img.addEventListener("click", () => {
                window.location.href = `./detalles-producto.html?id=${producto.id}`;
            });

            recientesSeccion.appendChild(card);
        });
    };

    //Cargar productos en sus respectivas secciones
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

        const img = card.querySelector("img");
        img.addEventListener("click", () => {
            window.location.href = `./detalles-producto.html?id=${producto.id}`;
        });

        if (secciones[producto.categoria]) {
            secciones[producto.categoria].appendChild(card);
        }
    });

    //Llamar a la función para cargar productos recientes
    cargarProductosRecientes();
});

document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('filter-form');
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    const secciones = {
        "Tablets": document.querySelector("section:nth-of-type(1) .slider-track"),
        "Celulares": document.querySelector("section:nth-of-type(2) .slider-track"),
        "Computadoras": document.querySelector("section:nth-of-type(3) .slider-track")
    };

    const renderFilteredProducts = () => {
        const selectedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        //Limpiar las secciones
        Object.values(secciones).forEach(section => section.innerHTML = '');

        //Filtrar y renderizar productos
        productos.forEach(producto => {
            if (selectedCategories.includes(producto.categoria)) {
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

                const img = card.querySelector("img");
                img.addEventListener("click", () => {
                    window.location.href = `./detalles-producto.html?id=${producto.id}`;
                });

                secciones[producto.categoria].appendChild(card);
            }
        });
    };

    //Escuchar cambios en los checkboxes
    filterForm.addEventListener('change', renderFilteredProducts);

    //Renderizar todos los productos inicialmente
    renderFilteredProducts();
});

document.addEventListener('DOMContentLoaded', () => {
    const sidePanel = document.querySelector('.side-panel');
    const toggleButton = document.getElementById('toggle-panel');
    const container = document.querySelector('.container');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Sincronizar el estado visual al cargar la página
    if (sidePanel && container && header && footer && toggleButton) {
        if (sidePanel.classList.contains('minimized')) {
            container.classList.remove('maximized');
            container.classList.add('shifted');
            header.classList.remove('maximized');
            header.classList.add('shifted');
            footer.classList.remove('maximized');
            footer.classList.add('shifted')
        } else {
            container.classList.remove('shifted');
            container.classList.add('maximized');
            header.classList.remove('shifted');
            header.classList.add('maximized');
            footer.classList.remove('shifted');
            footer.classList.add('maximized');
        }
    }

    toggleButton.addEventListener('click', () => {
        // Alternar la clase 'minimized' en el panel
        sidePanel.classList.toggle('minimized');

        // Alternar las clases 'maximized' y 'shifted' en el container, header y footer
        if (sidePanel.classList.contains('minimized')) {
            container.classList.remove('maximized');
            container.classList.add('shifted');
            header.classList.remove('maximized');
            header.classList.add('shifted');
            footer.classList.remove('maximized');
            footer.classList.add('shifted');
        } else {
            container.classList.remove('shifted');
            container.classList.add('maximized');
            header.classList.remove('shifted');
            header.classList.add('maximized');
            footer.classList.remove('shifted');
            footer.classList.add('maximized');
        }
    });
});
