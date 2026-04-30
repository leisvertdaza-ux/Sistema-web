// js/pagos.js

function vistaPagos() {

    let pagos = getData("pagos") || [];

    contenido.innerHTML = `
        <div class="card">
            <h3>Gestión de Pagos</h3>

            <input type="number" id="monto" placeholder="Monto (S/)">
            <button onclick="pagar()">💰 Registrar pago</button>

            ${pagos.length === 0 ? `
                <p style="margin-top:10px;">No hay pagos registrados</p>
            ` : `
                <table>
                    <tr>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>

                    ${pagos.map(p => `
                        <tr>
                            <td>S/ ${p.monto}</td>
                            <td>${p.fecha}</td>
                        </tr>
                    `).join("")}
                </table>
            `}
        </div>
    `;
}


// 💰 REGISTRAR PAGO
function pagar() {

    let input = document.getElementById("monto");
    let monto = parseFloat(input.value);

    if (isNaN(monto) || monto <= 0) {
        alert("Ingresa un monto válido");
        return;
    }

    let pagos = getData("pagos") || [];

    pagos.push({
        monto: monto,
        fecha: new Date().toLocaleDateString()
    });

    setData("pagos", pagos);

    input.value = ""; // limpiar

    alert("Pago registrado correctamente");

    vistaPagos(); // refrescar vista
}