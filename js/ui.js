// js/ui.js

let menu = document.getElementById("menu");
let contenido = document.getElementById("contenido");

// 🛑 seguridad básica
if (!user) {
    window.location.href = "index.html";
}

// ================= MENU POR ROLES =================

function cargarMenu() {

    let opciones = [];

    if (user.rol === "admin") {
        opciones = [
            { texto: "🏠 Dashboard", accion: "vistaInicio()" },
            { texto: "👨‍🎓 Estudiantes", accion: "vistaEstudiantes()" },
            { texto: "📝 Notas", accion: "vistaNotas()" },
            { texto: "📅 Asistencia", accion: "vistaAsistencia()" },
            { texto: "💰 Pagos", accion: "vistaPagos()" }
        ];
    }

    if (user.rol === "docente") {
        opciones = [
            { texto: "🏠 Dashboard", accion: "vistaInicio()" },
            { texto: "📝 Notas", accion: "vistaNotas()" },
            { texto: "📅 Asistencia", accion: "vistaAsistencia()" }
        ];
    }

    if (user.rol === "apoderado") {
        opciones = [
            { texto: "🏠 Dashboard", accion: "vistaInicio()" },
            { texto: "💰 Pagos", accion: "vistaPagos()" }
        ];
    }

    menu.innerHTML = opciones.map(op => `
        <button onclick="${op.accion}; activar(this)">
            ${op.texto}
        </button>
    `).join("");
}


// 🔵 BOTÓN ACTIVO
function activar(btn) {
    let botones = menu.querySelectorAll("button");
    botones.forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");
}


// ================= DASHBOARD =================

function vistaInicio() {

    let estudiantes = getData("estudiantes") || [];
    let pagos = getData("pagos") || [];

    contenido.innerHTML = `
        <div class="card">
            <h2>Bienvenido ${user.rol.toUpperCase()}</h2>
            <p>COLEGIO 00622 - EL PORVENIR - RIOJA</p>
        </div>

        <div class="cards">

            <div class="card">
                <h3>👨‍🎓 Estudiantes</h3>
                <p>${estudiantes.length}</p>
            </div>

            <div class="card">
                <h3>💰 Pagos</h3>
                <p>${pagos.length}</p>
            </div>

            <div class="card">
                <h3>📅 Fecha</h3>
                <p>${new Date().toLocaleDateString()}</p>
            </div>

        </div>
    `;
}


// ================= INICIAR =================

document.addEventListener("DOMContentLoaded", () => {
    cargarMenu();
    vistaInicio();
});