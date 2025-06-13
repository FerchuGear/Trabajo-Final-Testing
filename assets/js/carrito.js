// Sistema de carrito de compras para ElectroUADE

// Se lee el carrito desde localStorage usando la clave correcta.
let carrito = JSON.parse(localStorage.getItem("electrouade_carrito")) || [];

class CarritoManager {
  constructor() {
    this.carrito = carrito;
    this.init();
  }

  // Inicializar el sistema.
  init() {
    this.actualizarContador();
    this.agregarEventListeners();
    setTimeout(() => {
      this.actualizarContador();
    }, 100);
  }

  // Guardar carrito en localStorage y actualizar el contador.
  guardarCarrito() {
    try {
      localStorage.setItem("electrouade_carrito", JSON.stringify(this.carrito));
      this.actualizarContador();
    } catch (error) {
      console.error("Error al guardar carrito:", error);
    }
  }

  // Actualizar contador del carrito en el header.
  actualizarContador() {
    const contador = document.getElementById("carrito-count");
    const totalItems = this.carrito.reduce(
      (total, item) => total + item.cantidad,
      0
    );

    if (contador) {
      if (totalItems > 0) {
        contador.textContent = totalItems;
        contador.style.display = "inline-block";
      } else {
        contador.style.display = "none";
      }
    }
  }

  // Agregar producto al carrito.
  agregarProducto(producto) {
    const productoExistente = this.carrito.find(
      (item) => item.id === producto.id
    );

    if (productoExistente) {
      productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
    } else {
      producto.cantidad = 1;
      this.carrito.push(producto);
    }

    // Se guarda el carrito.
    this.guardarCarrito();

    // --- MODIFICACIÓN ---
    // Se muestra una alerta del navegador para confirmar que el producto fue añadido.
    alert(`"${producto.nombre}" se ha añadido al carrito.`);

    // Opcionalmente, también se puede usar la notificación personalizada si está implementada en el HTML.
    this.mostrarNotificacion(`${producto.nombre} añadido al carrito`);
  }

  // Actualizar cantidad de un producto.
  actualizarCantidad(id, nuevaCantidad) {
    const producto = this.carrito.find((item) => item.id === id);

    if (producto) {
      if (nuevaCantidad <= 0) {
        this.eliminarProducto(id);
      } else {
        producto.cantidad = nuevaCantidad;
        this.guardarCarrito();
      }
    }
  }

  // Eliminar producto del carrito.
  eliminarProducto(id) {
    const index = this.carrito.findIndex((item) => item.id === id);

    if (index !== -1) {
      const producto = this.carrito[index];
      this.carrito.splice(index, 1);
      this.guardarCarrito();
      this.mostrarNotificacion(`${producto.nombre} eliminado del carrito`);

      // Si estamos en la página del carrito, se actualiza la vista.
      // Esto requiere que la función mostrarCarrito() esté disponible globalmente.
      if (typeof window.mostrarCarrito === "function") {
        window.mostrarCarrito();
      }
    }
  }

  // Vaciar carrito completo.
  vaciarCarrito() {
    this.carrito = [];
    this.guardarCarrito();
    this.mostrarNotificacion("Carrito vaciado");

    if (typeof window.mostrarCarrito === "function") {
      window.mostrarCarrito();
    }
  }

  // Mostrar notificación personalizada (requiere el HTML correspondiente).
  mostrarNotificacion(mensaje) {
    const notification = document.getElementById("carrito-notification");
    const text = document.getElementById("notification-text");

    if (notification && text) {
      text.textContent = mensaje;
      notification.classList.remove("hidden");
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
          notification.classList.add("hidden");
        }, 300);
      }, 3000);
    }
  }

  // Agregar los event listeners principales.
  agregarEventListeners() {
    // Listener para todos los botones "Agregar al carrito".
    document.addEventListener("click", (e) => {
      if ( e.target.classList.contains("add-to-cart") || e.target.closest(".add-to-cart")) {
        const boton = e.target.classList.contains("add-to-cart") ? e.target : e.target.closest(".add-to-cart");

        const producto = {
          id: boton.getAttribute("data-id"),
          nombre: boton.getAttribute("data-nombre"),
          precio: Number.parseFloat(boton.getAttribute("data-precio")),
          imagen: boton.getAttribute("data-imagen") || "",
          categoria: boton.getAttribute("data-categoria") || "",
        };

        if (producto.id && producto.nombre && producto.precio) {
          this.agregarProducto(producto);
        }
      }
    });

    // Listener para el botón del carrito en el header.
    document.addEventListener("click", (e) => {
      if (e.target.id === "carrito-btn" || e.target.closest("#carrito-btn")) {
        window.location.href = "carrito.html";
      }
    });
  }
}

// Inicializar el carrito cuando el DOM esté listo.
document.addEventListener("DOMContentLoaded", () => {
  if (!window.carritoManager) {
    window.carritoManager = new CarritoManager();
  }
});