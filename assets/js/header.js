document.addEventListener("DOMContentLoaded", function () {
    // La ruta correcta: Desde el HTML en la raíz, entra a 'assets', luego a 'components'.
    fetch("./assets/components/header.html")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Respuesta de red no fue ok " + response.statusText);
            }
            return response.text();
        })
        .then(function (html) {
            const container = document.getElementById("header-container");
            if (container) {
                container.innerHTML = html;
            }
        })
        .catch(function (error) {
            console.error('Error al cargar el header:', error);
        });
});