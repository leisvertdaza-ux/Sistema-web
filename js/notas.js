// js/notas.js

function vistaNotas() {

    let estudiantes = getData("estudiantes") || [];

    if (estudiantes.length === 0) {
        contenido.innerHTML = `
            <div class="card">
                <h3>Notas</h3>
                <p>No hay estudiantes registrados</p>
            </div>
        `;
        return;
    }

    contenido.innerHTML = `
        <div class="card">
            <h3>Registro de Notas</h3>

            <h4 style="color:#94a3b8;">
                ${esDocente() ? "Modo edición" : "Modo solo lectura"}
            </h4>

            <table>
                <tr>
                    <th>Estudiante</th>
                    <th>Agregar Nota</th>
                    <th>Notas</th>
                </tr>

                ${estudiantes.map((e, i) => {

                    let notas = e.notas || [];

                    let promedio = notas.length > 0 
                        ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1)
                        : "-";

                    return `
                        <tr>
                            <td>${e.nombre}</td>

                            <td>
                                ${
                                    esDocente()
                                    ? `
                                        <input type="number" min="0" max="20" id="nota${i}" placeholder="0 - 20">
                                        <button onclick="guardarNota(${i})">💾</button>
                                      `
                                    : `<span style="color:#94a3b8;">Solo lectura</span>`
                                }
                            </td>

                            <td>
                                ${notas.join(", ") || "Sin notas"} <br>
                                <strong>Prom: ${promedio}</strong>
                            </td>
                        </tr>
                    `;
                }).join("")}

            </table>
        </div>
    `;
}


// 💾 GUARDAR NOTA (PROTEGIDO)
function guardarNota(i) {

    // 🔐 bloquear si no es docente
    if (!esDocente()) {
        alert("No tienes permisos para editar");
        return;
    }

    let input = document.getElementById("nota" + i);
    let valor = parseFloat(input.value);

    if (isNaN(valor) || valor < 0 || valor > 20) {
        alert("Ingresa una nota válida (0 - 20)");
        return;
    }

    let estudiantes = getData("estudiantes") || [];

    if (!estudiantes[i].notas) {
        estudiantes[i].notas = [];
    }

    estudiantes[i].notas.push(valor);

    setData("estudiantes", estudiantes);

    input.value = "";

    vistaNotas();
}