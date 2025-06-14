// Script específico para la página del carrito
const vaciarCarrito = () => {
  carrito = []
  mostrarCarrito()
} // Declare the vaciarCarrito function

document.addEventListener("DOMContentLoaded", () => {
  // Esperar un poco para asegurar que carrito.js se haya cargado
  setTimeout(() => {
    mostrarCarrito()
  }, 100)
})

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
  const carritoList = document.getElementById("carrito-list")
  const carritoContainer = document.getElementById("carrito-container")

  if (!carritoList || !carritoContainer) {
    console.error("Elementos del carrito no encontrados")
    return
  }

  // Limpiar el contenedor
  carritoList.innerHTML = ""

  if (carrito.length === 0) {
    mostrarCarritoVacio(carritoContainer)
    return
  }

  // Mostrar productos del carrito
  mostrarProductosCarrito(carritoList)

  // Mostrar resumen del carrito
  mostrarResumenCarrito(carritoContainer)
}

// Función para mostrar carrito vacío
function mostrarCarritoVacio(container) {
  container.innerHTML = `
        <div class="carrito-vacio">
            <h1>Carrito</h1>
            <div class="carrito-vacio-content">
                <h2>Tu carrito está vacío</h2>
                <p>¡Descubre nuestros productos y añade algunos a tu carrito!</p>
                <a href="productos.html" class="btn-primary">Ver productos</a>
            </div>
        </div>
    `
}

// Función para mostrar productos en el carrito
function mostrarProductosCarrito(carritoList) {
  carrito.forEach((producto, index) => {
    const li = document.createElement("li")
    li.className = "carrito-item"

    const cantidad = producto.cantidad || 1
    const subtotal = producto.precio * cantidad

    li.innerHTML = `
            <div class="item-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}" 
                     onerror="this.src='./assets/images/placeholder.jpg'">
            </div>
            <div class="item-info">
                <h3>${producto.nombre}</h3>
                <p class="item-precio">$${producto.precio.toFixed(2)}</p>
            </div>
            <div class="item-cantidad">
                <button class="btn-cantidad" onclick="actualizarCantidad(${index}, ${cantidad - 1})">-</button>
                <span class="cantidad">${cantidad}</span>
                <button class="btn-cantidad" onclick="actualizarCantidad(${index}, ${cantidad + 1})">+</button>
            </div>
            <div class="item-subtotal">
                <p>$${subtotal.toFixed(2)}</p>
            </div>
            <div class="item-acciones">
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">
                    Eliminar
                </button>
            </div>
        `

    carritoList.appendChild(li)
  })
}

// Función para mostrar resumen del carrito
function mostrarResumenCarrito(container) {
  const total = carrito.reduce((sum, item) => sum + item.precio * (item.cantidad || 1), 0)
  const totalItems = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0)

  // Crear o actualizar el resumen
  let resumen = container.querySelector(".carrito-resumen")
  if (!resumen) {
    resumen = document.createElement("div")
    resumen.className = "carrito-resumen"
    container.appendChild(resumen)
  }

  resumen.innerHTML = `
        <div class="resumen-content">
            <h3>Resumen del pedido</h3>
            <div class="resumen-linea">
                <span>Productos (${totalItems}):</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="resumen-linea">
                <span>Envío:</span>
                <span>Gratis</span>
            </div>
            <div class="resumen-linea total">
                <span><strong>Total:</strong></span>
                <span><strong>$${total.toFixed(2)}</strong></span>
            </div>
            <div class="carrito-acciones">
                <button class="btn-primary btn-checkout" onclick="finalizarCompra()">
                    Proceder al pago
                </button>
                <button class="btn-secondary btn-vaciar" onclick="confirmarVaciarCarrito()">
                    Vaciar carrito
                </button>
                <a href="productos.html" class="btn-secondary">Seguir comprando</a>
            </div>
        </div>
    `
}

// Función para confirmar vaciado del carrito
function confirmarVaciarCarrito() {
  if (confirm("¿Estás seguro de que quieres vaciar todo el carrito?")) {
    vaciarCarrito()
  }
}

// Función para finalizar compra
function finalizarCompra() {
  const total = carrito.reduce((sum, item) => sum + item.precio * (item.cantidad || 1), 0)
  const totalItems = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0)

  if (confirm(`¿Confirmar compra?\n\nTotal: $${total.toFixed(2)}\nProductos: ${totalItems}`)) {
    alert("¡Gracias por tu compra! Serás redirigido al proceso de pago.")

    // Aquí podrías redirigir a una página de checkout real
    // window.location.href = 'checkout.html';

    // Por ahora, vaciar el carrito después de la "compra"
    vaciarCarrito()
  }
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidad(index, nuevaCantidad) {
  if (nuevaCantidad > 0) {
    carrito[index].cantidad = nuevaCantidad
    mostrarCarrito()
  }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
  window.carritoManager.eliminarProducto(carrito[index].id);
  carrito.splice(index, 1);
  mostrarCarrito();
}
