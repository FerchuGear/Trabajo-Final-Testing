document.addEventListener("DOMContentLoaded", function () {
    fetch("../assets/components/header.html").then(function (response) {
        return response.text();
    }).then(function (html) {
        document.getElementById("header-container").innerHTML = html;
        initializeNavbarEvents();
    }).catch(function (error) {
        console.error(error);
    });
});