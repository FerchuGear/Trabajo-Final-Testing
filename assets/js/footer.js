document.addEventListener("DOMContentLoaded", function () {
    // La misma lógica de ruta para el footer.
    fetch("./assets/components/footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Respuesta de red no fue ok " + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            const container = document.getElementById("footer-container");
            if (container) {
                container.innerHTML = html;
            }
        })
        .catch(error => console.error('Error al cargar el footer:', error));
});