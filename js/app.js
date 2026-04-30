// js/app.js

// 🔐 Obtener sesión
let user = JSON.parse(localStorage.getItem("session"));

// 🚫 Si no hay sesión → regresar al login
if (!user) {
    window.location.href = "index.html";
}

// ⏳ Esperar a que cargue el HTML
document.addEventListener("DOMContentLoaded", () => {

    // 🏷️ Mostrar rol en el título
    let titulo = document.getElementById("titulo");
    if (titulo) {
        titulo.innerText = "Bienvenido - " + user.rol.toUpperCase();
    }

    // 👤 Mostrar usuario si existe el elemento
    let usuario = document.getElementById("usuario");
    if (usuario) {
        usuario.innerText = "Usuario: " + user.email;
    }

});

// 🚪 Cerrar sesión
function logout() {
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

function esDocente() {
    return user.rol === "docente";
}

function esAdmin() {
    return user.rol === "admin";
}

function esApoderado() {
    return user.rol === "apoderado";
}