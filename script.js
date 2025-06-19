// Ejecutar esta función cuando se cargue la página
window.onload = function () {
    // Intentamos obtener la lista guardada en el navegador
    const textoGuardado = localStorage.getItem('items');

    // Si hay datos, los convertimos a un arreglo. Si no, usamos uno vacío.
    const listaGuardada = textoGuardado ? JSON.parse(textoGuardado) : [];

    // Recorremos cada elemento guardado y lo mostramos en pantalla
    listaGuardada.forEach(function (item) {
        mostrarItemEnPantalla(item.texto, item.estaSeleccionado);
    });
};

// Cuando se hace clic en el botón "Agregar", llamamos a esta función
document.getElementById('btnAgregar').addEventListener('click', agregarNuevoItem);

// Esta función se encarga de agregar un nuevo ítem a la lista
function agregarNuevoItem() {
    const input = document.getElementById('inputItem');
    const textoIngresado = input.value.trim(); // quitamos espacios

    // Si el input está vacío, mostramos un mensaje y salimos
    if (textoIngresado === '') {
        alert('Por favor escribe algo');
        return;
    }

    // Mostramos el nuevo ítem en pantalla (no está seleccionado al inicio)
    mostrarItemEnPantalla(textoIngresado, false);

    // Guardamos la lista actualizada en el navegador
    guardarListaEnLocalStorage();

    // Limpiamos el campo y volvemos a darle foco
    input.value = '';
    input.focus();
}

// Esta función muestra un ítem en pantalla
function mostrarItemEnPantalla(texto, estaSeleccionado) {
    const lista = document.getElementById('listaItems');

    // Creamos un contenedor para el ítem
    const contenedor = document.createElement('div');

    // Creamos el texto del ítem
    const etiquetaTexto = document.createElement('span');
    etiquetaTexto.textContent = texto;

    // Si estaba marcado como seleccionado (tachado), aplicamos el estilo
    if (estaSeleccionado) {
        etiquetaTexto.style.textDecoration = 'line-through';
    }

    // Creamos el botón para eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.onclick = function () {
        lista.removeChild(contenedor);
        guardarListaEnLocalStorage();
    };

    // Creamos el botón para marcar o desmarcar como seleccionado
    const botonSeleccionar = document.createElement('button');
    botonSeleccionar.textContent = 'Seleccionar';
    botonSeleccionar.onclick = function () {
        const tachado = etiquetaTexto.style.textDecoration === 'line-through';
        etiquetaTexto.style.textDecoration = tachado ? 'none' : 'line-through';
        guardarListaEnLocalStorage();
    };

    // Agregamos los elementos al contenedor
    contenedor.appendChild(etiquetaTexto);
    contenedor.appendChild(botonEliminar);
    contenedor.appendChild(botonSeleccionar);

    // Agregamos el contenedor a la lista principal
    lista.appendChild(contenedor);
}

// Esta función guarda todos los ítems actuales en localStorage
function guardarListaEnLocalStorage() {
    const lista = document.getElementById('listaItems');
    const arregloParaGuardar = [];

    // Recorremos todos los ítems visibles
    for (let i = 0; i < lista.children.length; i++) {
        const item = lista.children[i];
        const texto = item.querySelector('span').textContent;

        const estaSeleccionado = item.querySelector('span').style.textDecoration === 'line-through';

        // Agregamos el objeto al arreglo
        arregloParaGuardar.push({
            texto: texto,
            estaSeleccionado: estaSeleccionado
        });
    }

    // Guardamos el arreglo en localStorage como texto JSON
    const textoJSON = JSON.stringify(arregloParaGuardar);
    localStorage.setItem('items', textoJSON);
}
