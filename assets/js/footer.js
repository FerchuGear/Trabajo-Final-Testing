document.addEventListener("DOMContentLoaded", function () {
  fetch("../assets/components/footer.html")
    .then(response => response.text())
    .then(html => {
      const container = document.getElementById("footer-container");
      if (container) {
        container.innerHTML = html;
      }
    });
});
