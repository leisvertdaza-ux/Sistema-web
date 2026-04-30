// js/estudiantes.js

function vistaEstudiantes() {

    let estudiantes = getData("estudiantes") || [];

    contenido.innerHTML = `
        <div class="card">
            <h3>Gestión de Estudiantes</h3>

            <input id="nombre" placeholder="Nombre del estudiante">
            <button onclick="guardarEstudiante()">➕ Agregar</button>

            ${estudiantes.length === 0 ? `
                <p style="margin-top:10px;">No hay estudiantes registrados</p>
            ` : `
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>

                ${estudiantes.map((e, i) => `
                    <tr>
                        <td>${e.nombre}</td>
                        <td>
                            <button onclick="editar(${i})">✏️ Editar</button>
                            <button onclick="eliminar(${i})">🗑 Eliminar</button>
                        </td>
                    </tr>
                `).join("")}
            </table>
            `}
        </div>
    `;
}


// ✅ GUARDAR
function guardarEstudiante() {

    let nombreInput = document.getElementById("nombre");
    let nombre = nombreInput.value.trim();

    if (!nombre) {
        alert("Ingresa un nombre válido");
        return;
    }

    let estudiantes = getData("estudiantes") || [];

    estudiantes.push({
        nombre: nombre,
        notas: [],
        asistencia: []
    });

    setData("estudiantes", estudiantes);

    nombreInput.value = ""; // limpiar input

    vistaEstudiantes();
}


// ❌ ELIMINAR
function eliminar(i) {

    if (!confirm("¿Seguro que deseas eliminar este estudiante?")) {
        return;
    }

    let estudiantes = getData("estudiantes") || [];

    estudiantes.splice(i, 1);

    setData("estudiantes", estudiantes);

    vistaEstudiantes();
}


// ✏️ EDITAR
function editar(i) {

    let estudiantes = getData("estudiantes") || [];

    let nuevo = prompt("Nuevo nombre:", estudiantes[i].nombre);

    if (!nuevo || nuevo.trim() === "") {
        alert("Nombre inválido");
        return;
    }

    estudiantes[i].nombre = nuevo.trim();

    setData("estudiantes", estudiantes);

    vistaEstudiantes();
}