// ================= USUARIOS POR DEFECTO =================
(function () {
    let usuarios = getData("usuarios");

    if (!usuarios || usuarios.length === 0) {
        let usuariosDefault = [
            {
                email: "admin@gmail.com",
                password: "123456",
                rol: "admin"
            },
            {
                email: "docente@gmail.com",
                password: "123456",
                rol: "docente"
            },
            {
                email: "apoderado@gmail.com",
                password: "123456",
                rol: "apoderado"
            }
        ];

        setData("usuarios", usuariosDefault);
        console.log("Usuarios por defecto creados");
    }
})();


// ================= REGISTRO =================
function register() {
    let email = document.getElementById("email").value.trim().toLowerCase();
    let password = document.getElementById("password").value.trim();
    let rol = document.getElementById("rol").value;

    if (!email || !password || !rol) {
        alert("Completa todos los campos");
        return;
    }

    let usuarios = getData("usuarios") || [];

    let existe = usuarios.find(u => u.email === email);
    if (existe) {
        alert("El usuario ya existe");
        return;
    }

    let nuevoUsuario = {
        email,
        password,
        rol
    };

    usuarios.push(nuevoUsuario);
    setData("usuarios", usuarios);

    alert("Registrado correctamente");
    window.location.href = "index.html";
}


// ================= LOGIN =================
function login() {
    let email = document.getElementById("email").value.trim().toLowerCase();
    let password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Ingresa correo y contraseña");
        return;
    }

    let usuarios = getData("usuarios") || [];

    let user = usuarios.find(
        u => u.email === email && u.password === password
    );

    if (user) {
        localStorage.setItem("session", JSON.stringify(user));
        alert("Bienvenido " + user.rol);
        window.location.href = "dashboard.html";
    } else {
        alert("Credenciales incorrectas");
    }
}