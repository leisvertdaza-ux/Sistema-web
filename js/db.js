// js/db.js

// 📥 Obtener datos
function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
        console.error("Error al leer datos:", error);
        return [];
    }
}

// 📤 Guardar datos
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ❌ Eliminar datos
function removeData(key) {
    localStorage.removeItem(key);
}

// 🧹 Limpiar todo (opcional)
function clearData() {
    localStorage.clear();
}