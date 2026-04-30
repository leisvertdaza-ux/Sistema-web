// js/asistencia.js

function vistaAsistencia() {

    let estudiantes = getData("estudiantes") || [];

    if (estudiantes.length === 0) {
        contenido.innerHTML = `
            <div class="card">
                <h3>Asistencia</h3>
                <p>No hay estudiantes registrados</p>
            </div>
        `;
        return;
    }

    contenido.innerHTML = `
        <div class="card">
            <h3>Registro de Asistencia</h3>

            <h4 style="color:#94a3b8;">
                ${esDocente() ? "Modo edición" : "Modo solo lectura"}
            </h4>

            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Acciones</th>
                    <th>Último registro</th>
                </tr>

                ${estudiantes.map((e, i) => {

                    let asistencia = e.asistencia || [];
                    let ultimo = asistencia.length > 0 
                        ? asistencia[asistencia.length - 1]
                        : null;

                    return `
                        <tr>
                            <td>${e.nombre}</td>

                            <td>
                                ${
                                    esDocente()
                                    ? `
                                        <button onclick="marcar(${i}, 'P')">✔</button>
                                        <button onclick="marcar(${i}, 'F')">❌</button>
                                      `
                                    : `<span style="color:#94a3b8;">Solo lectura</span>`
                                }
                            </td>

                            <td>
                                ${
                                    ultimo 
                                    ? `${ultimo.fecha} - ${ultimo.estado === 'P' ? 'Presente' : 'Falta'}`
                                    : "Sin registro"
                                }
                            </td>
                        </tr>
                    `;
                }).join("")}

            </table>
        </div>
    `;
}


// ✅ MARCAR ASISTENCIA (PROTEGIDO)
function marcar(i, estado) {

    // 🔐 bloquear si no es docente
    if (!esDocente()) {
        alert("No tienes permisos para editar");
        return;
    }

    let estudiantes = getData("estudiantes") || [];

    if (!estudiantes[i].asistencia) {
        estudiantes[i].asistencia = [];
    }

    estudiantes[i].asistencia.push({
        fecha: new Date().toLocaleDateString(),
        estado: estado
    });

    setData("estudiantes", estudiantes);

    vistaAsistencia();
}