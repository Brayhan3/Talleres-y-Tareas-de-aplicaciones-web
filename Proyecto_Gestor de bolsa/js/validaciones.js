/* =============================================
   validaciones.js
   Funciones reutilizables para todos los formularios
   ============================================= */


/* ── HELPERS GENERALES ──────────────────────── */

/**
 * Marca un campo como error o lo limpia.
 * Busca el .form-group padre y agrega/quita la clase 'error',
 * que el CSS usa para mostrar el mensaje de error en rojo.
 */
function marcarCampo(id, hayError) {
  const grupo = document.getElementById(id).closest('.form-group');
  if (hayError) {
    grupo.classList.add('error');
  } else {
    grupo.classList.remove('error');
  }
}

/* Devuelve true si el string está vacío o solo tiene espacios */
function estaVacio(valor) {
  return valor.trim() === '';
}

/* Valida formato de correo: algo@algo.algo */
function esCorreoValido(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

/* Valida teléfono: exactamente 10 dígitos numéricos */
function esTelefonoValido(tel) {
  const regex = /^\d{10}$/;
  return regex.test(tel.trim());
}


/* ── REGISTRO ────────────────────────────────── */

/**
 * Valida el formulario de registro.
 * Recorre cada campo, muestra errores si los hay,
 * y solo navega a index.html si todo es válido.
 */
function validarRegistro() {
  const nombre   = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const correo   = document.getElementById('correo').value;

  let valido = true; // se vuelve false si algún campo falla

  /* Nombre: obligatorio */
  if (estaVacio(nombre)) {
    marcarCampo('nombre', true);
    valido = false;
  } else {
    marcarCampo('nombre', false);
  }

  /* Teléfono: 10 dígitos */
  if (!esTelefonoValido(telefono)) {
    marcarCampo('telefono', true);
    valido = false;
  } else {
    marcarCampo('telefono', false);
  }

  /* Correo: formato válido */
  if (!esCorreoValido(correo)) {
    marcarCampo('correo', true);
    valido = false;
  } else {
    marcarCampo('correo', false);
  }

  /* Si todo pasó, navega a la página principal */
  if (valido) {
    window.location.href = 'index.html';
  }
}


/* ── FORMACIÓN: campos inline con Fijar / Borrar ── */

/**
 * Crea y agrega un nuevo campo de texto inline dentro del contenedor dado.
 * Cada campo tiene: input de texto + botón Fijar + botón Borrar.
 * @param {string} contenedorId - id del div donde se insertan los campos
 */
function agregarCampo(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  const campos = contenedor.querySelectorAll('.input-inline-fila');

  /* Verifica que el último campo fijado tenga más de 2 caracteres.
     Si el campo está vacío o tiene ≤2 chars, no agrega uno nuevo. */
  if (campos.length > 0) {
    const ultimoInput = campos[campos.length - 1].querySelector('input');
    if (ultimoInput.value.trim().length <= 2) {
      ultimoInput.focus();           // lleva el foco al campo incompleto
      ultimoInput.style.borderColor = '#c0392b'; // borde rojo de advertencia
      setTimeout(() => {             // quita el rojo después de 1.5s
        ultimoInput.style.borderColor = '';
      }, 1500);
      return; // sale sin crear campo nuevo
    }
  }

  /* Crea la fila: input + btn fijar + btn borrar */
  const fila = document.createElement('div');
  fila.className = 'input-inline-fila';

  /* Input de texto */
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = obtenerPlaceholder(contenedorId); // texto de ayuda según sección

  /* Botón Fijar: bloquea el input visualmente */
  const btnFijar = document.createElement('button');
  btnFijar.className = 'btn-fijar';
  btnFijar.textContent = '✓ Fijar';
  btnFijar.onclick = () => fijarCampo(input, btnFijar); // pasa la referencia del input

  /* Botón Borrar: elimina toda la fila */
  const btnBorrar = document.createElement('button');
  btnBorrar.className = 'btn-borrar';
  btnBorrar.textContent = '✕';
  btnBorrar.title = 'Eliminar este campo';
  btnBorrar.onclick = () => fila.remove(); // elimina el div completo del DOM

  /* Ensambla la fila y la agrega al contenedor */
  fila.appendChild(input);
  fila.appendChild(btnFijar);
  fila.appendChild(btnBorrar);
  contenedor.appendChild(fila);

  input.focus(); // foco automático al nuevo campo
}

/**
 * Bloquea un input (readonly) y deshabilita el botón Fijar.
 * El botón Borrar sigue activo para poder eliminar el ítem.
 * @param {HTMLInputElement} input   - el campo a bloquear
 * @param {HTMLButtonElement} btnFijar - el botón que se deshabilita
 */
function fijarCampo(input, btnFijar) {
  if (input.value.trim().length <= 2) {
    /* No fija si tiene ≤2 chars: muestra borde rojo brevemente */
    input.style.borderColor = '#c0392b';
    input.focus();
    setTimeout(() => { input.style.borderColor = ''; }, 1500);
    return;
  }
  input.readOnly = true;           // bloquea la edición
  input.style.borderColor = '';    // quita el borde rojo si lo tenía
  btnFijar.disabled = true;        // el botón fijar queda inactivo
  btnFijar.style.opacity = '0.4';  // visual: apagado
}

/**
 * Devuelve el placeholder correcto según la sección de formación.
 * @param {string} id - id del contenedor
 * @returns {string}
 */
function obtenerPlaceholder(id) {
  const placeholders = {
    'campos-pregrado': 'Ej.: Ingeniería en Sistemas',
    'campos-maestria': 'Ej.: Maestría en Administración',
    'campos-cert':     'Ej.: Certificado en Inglés B2',
  };
  return placeholders[id] || 'Escribe aquí...';
}


/* ── MODALES ────────────────────────────────── */

/* Abre un modal agregando la clase 'activo' (CSS lo hace visible) */
function abrirModal(id) {
  document.getElementById(id).classList.add('activo');
}

/* Cierra un modal quitando la clase 'activo' */
function cerrarModal(id) {
  document.getElementById(id).classList.remove('activo');
}

/* Cierra el modal si el clic fue en el fondo oscuro, no en el cuadro */
function cerrarSiEsFondo(event, id) {
  if (event.target === event.currentTarget) {
    cerrarModal(id);
  }
}


/* ── AVISOS (éxito / error) ─────────────────── */

/* Muestra un aviso con el tipo ('exito' o 'error') y el mensaje */
function mostrarAviso(id, tipo, msg) {
  const aviso = document.getElementById(id);
  aviso.textContent = msg;
  aviso.className = `aviso ${tipo} activo`;
}

/* Oculta un aviso quitando 'activo' */
function ocultarAviso(id) {
  document.getElementById(id).className = 'aviso';
}


/* ── LOGIN ───────────────────────────────────── */

/**
 * Valida el formulario de login.
 * Si pasa, navega a tipo_usuario.html (selección de tipo de cuenta)
 * o directo a index.html si ya tiene cuenta.
 */
function validarLogin() {
  const correo   = document.getElementById('correo').value;
  const password = document.getElementById('password').value;
  let valido = true;

  if (!esCorreoValido(correo)) {
    marcarCampo('correo', true);
    valido = false;
  } else {
    marcarCampo('correo', false);
  }

  if (estaVacio(password)) {
    marcarCampo('password', true);
    valido = false;
  } else {
    marcarCampo('password', false);
  }

  /* Si todo es válido, navega al index (simula login exitoso) */
  if (valido) {
    window.location.href = 'index.html';
  }
}