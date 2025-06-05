// Sistema de carrito de compras para ElectroUADE
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

class CarritoManager {
  constructor() {
    this.carrito = carrito
    this.init()
  }

  // Obtener carrito del localStorage
  obtenerCarrito() {
    try {
      return JSON.parse(localStorage.getItem("electrouade_carrito")) || []
    } catch (error) {
      console.error("Error al obtener carrito:", error)
      return []
    }
  }

  // Guardar carrito en localStorage
  guardarCarrito() {
    try {
      localStorage.setItem("electrouade_carrito", JSON.stringify(this.carrito))
      this.actualizarContador()
    } catch (error) {
      console.error("Error al guardar carrito:", error)
    }
  }

  // Inicializar el sistema
  init() {
    this.actualizarContador()
    this.agregarEventListeners()
  }

  // Actualizar contador del carrito en el header
  actualizarContador() {
    const contador = document.getElementById("carrito-count")
    const totalItems = this.carrito.reduce((total, item) => total + item.cantidad, 0)

    if (contador) {
      if (totalItems > 0) {
        contador.textContent = totalItems
        contador.style.display = "inline-block"
      } else {
        contador.style.display = "none"
      }
    }
  }

  // Agregar producto al carrito
  agregarProducto(producto) {
    // Verificar si el producto ya existe en el carrito
    const productoExistente = this.carrito.find((item) => item.id === producto.id)

    if (productoExistente) {
      // Si existe, incrementar la cantidad
      productoExistente.cantidad = (productoExistente.cantidad || 1) + 1
    } else {
      // Si no existe, añadirlo con cantidad 1
      producto.cantidad = 1
      this.carrito.push(producto)
    }

    // Guardar en localStorage y actualizar contador
    localStorage.setItem("carrito", JSON.stringify(this.carrito))
    this.actualizarContador()

    // Mostrar mensaje de confirmación
    this.mostrarNotificacion(`${producto.nombre} añadido al carrito`)
  }

  // Actualizar cantidad de un producto
  actualizarCantidad(id, nuevaCantidad) {
    const producto = this.carrito.find((item) => item.id === id)

    if (producto) {
      if (nuevaCantidad <= 0) {
        this.eliminarProducto(id)
      } else {
        producto.cantidad = nuevaCantidad
        this.guardarCarrito()
      }
    }
  }

  // Eliminar producto del carrito
  eliminarProducto(id) {
    const index = this.carrito.findIndex((item) => item.id === id)

    if (index !== -1) {
      const producto = this.carrito[index]
      this.carrito.splice(index, 1)
      this.guardarCarrito()
      this.mostrarNotificacion(`${producto.nombre} eliminado del carrito`)

      // Si estamos en la página del carrito, actualizar la vista
      window.mostrarCarrito()
    }
  }

  // Vaciar carrito completo
  vaciarCarrito() {
    this.carrito = []
    this.guardarCarrito()
    this.mostrarNotificacion("Carrito vaciado")

    // Si estamos en la página del carrito, actualizar la vista
    window.mostrarCarrito()
  }

  // Obtener total del carrito
  obtenerTotal() {
    return this.carrito.reduce((total, item) => {
      return total + item.precio * item.cantidad
    }, 0)
  }

  // Obtener cantidad total de items
  obtenerCantidadTotal() {
    return this.carrito.reduce((total, item) => total + item.cantidad, 0)
  }

  // Mostrar notificación
  mostrarNotificacion(mensaje) {
    const notification = document.getElementById("carrito-notification")
    const text = document.getElementById("notification-text")

    if (notification && text) {
      text.textContent = mensaje
      notification.classList.remove("hidden")
      notification.classList.add("show")

      setTimeout(() => {
        notification.classList.remove("show")
        setTimeout(() => {
          notification.classList.add("hidden")
        }, 300)
      }, 3000)
    }
  }

  // Agregar event listeners
  agregarEventListeners() {
    // Event listener para botones "Agregar al carrito"
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart") || e.target.closest(".add-to-cart")) {
        const boton = e.target.classList.contains("add-to-cart") ? e.target : e.target.closest(".add-to-cart")

        const producto = {
          id: boton.getAttribute("data-id"),
          nombre: boton.getAttribute("data-nombre"),
          precio: Number.parseFloat(boton.getAttribute("data-precio")),
          imagen: boton.getAttribute("data-imagen") || "",
          categoria: boton.getAttribute("data-categoria") || "",
        }

        if (producto.id && producto.nombre && producto.precio) {
          this.agregarProducto(producto)
        }
      }
    })

    // Event listener para el botón del carrito en el header
    document.addEventListener("click", (e) => {
      if (e.target.id === "carrito-btn" || e.target.closest("#carrito-btn")) {
        window.location.href = "carrito.html"
      }
    })
  }
}

// Función para mostrar mensajes temporales
function mostrarMensaje(texto) {
  // Remover mensaje anterior si existe
  const mensajeAnterior = document.querySelector(".mensaje-carrito")
  if (mensajeAnterior) {
    mensajeAnterior.remove()
  }

  const mensaje = document.createElement("div")
  mensaje.className = "mensaje-carrito"
  mensaje.textContent = texto
  mensaje.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 1000;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
  `

  document.body.appendChild(mensaje)

  // Animar entrada
  setTimeout(() => {
    mensaje.style.opacity = "1"
    mensaje.style.transform = "translateY(0)"
  }, 10)

  // Eliminar el mensaje después de 3 segundos
  setTimeout(() => {
    mensaje.style.opacity = "0"
    mensaje.style.transform = "translateY(-20px)"
    setTimeout(() => {
      if (mensaje.parentNode) {
        mensaje.parentNode.removeChild(mensaje)
      }
    }, 300)
  }, 3000)
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(index) {
  if (index >= 0 && index < carrito.length) {
    const producto = carrito[index]
    carrito.splice(index, 1)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarCarritoCount()
    mostrarMensaje(`${producto.nombre} eliminado del carrito`)

    // Si estamos en la página del carrito, actualizar la vista
    window.mostrarCarrito()
  }
}

// Función para actualizar cantidad de un producto
function actualizarCantidad(index, nuevaCantidad) {
  if (index >= 0 && index < carrito.length) {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(index)
    } else {
      carrito[index].cantidad = nuevaCantidad
      localStorage.setItem("carrito", JSON.stringify(carrito))
      actualizarCarritoCount()

      // Si estamos en la página del carrito, actualizar la vista
      window.mostrarCarrito()
    }
  }
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
  carrito = []
  localStorage.setItem("carrito", JSON.stringify(carrito))
  actualizarCarritoCount()
  mostrarMensaje("Carrito vaciado")

  // Si estamos en la página del carrito, actualizar la vista
  window.mostrarCarrito()
}

// Función para actualizar el contador del carrito en el header
function actualizarCarritoCount() {
  const contador = document.getElementById("carrito-count")
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0)

  if (contador) {
    if (totalItems > 0) {
      contador.textContent = totalItems
      contador.style.display = "inline-block"
    } else {
      contador.style.display = "none"
    }
  }
}

// Función para mostrar la página del carrito
function mostrarCarrito() {
  // Implementación de mostrarCarrito aquí
}

// Inicializar carrito cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.carritoManager = new CarritoManager()

  // Añadir listeners a los botones de "Agregar al carrito"
  const botonesAgregar = document.querySelectorAll(".add-to-cart")
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault()

      // Obtener datos del producto desde atributos data-*
      const producto = {
        id: boton.getAttribute("data-id"),
        nombre: boton.getAttribute("data-nombre"),
        precio: Number.parseFloat(boton.getAttribute("data-precio")),
        imagen: boton.getAttribute("data-imagen") || "./assets/images/placeholder.jpg",
      }

      // Validar que tenemos los datos necesarios
      if (producto.id && producto.nombre && !isNaN(producto.precio)) {
        window.carritoManager.agregarProducto(producto)
      } else {
        console.error("Datos del producto incompletos:", producto)
      }
    })
  })
})
