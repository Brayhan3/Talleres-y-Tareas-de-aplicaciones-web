/* =============================================
   perfil.js
   Lógica exclusiva de perfil.html:
   - Edición inline de datos personales con validación
   - Notificaciones: marcar como leídas
   - CV: mostrar nombre del archivo seleccionado
   - Dropdown Mi perfil (reutiliza toggleDropdown de validaciones.js)
   ============================================= */


/* ── DROPDOWN (mismo del index) ─────────────── */

function toggleDropdown() {
  document.getElementById('dropdown-perfil').classList.toggle('abierto');
}

/* Cierra el dropdown al hacer clic fuera */
document.addEventListener('click', function(e) {
  const menu = document.querySelector('.perfil-menu');
  if (menu && !menu.contains(e.target)) {
    document.getElementById('dropdown-perfil').classList.remove('abierto');
  }
});


/* ── EDICIÓN DE DATOS PERSONALES ────────────── */

/**
 * Abre el campo de edición de un dato y oculta el texto visible.
 * @param {string} campo - 'correo' o 'telefono'
 */
function abrirEdicion(campo) {
  /* Copia el valor actual al input para que el usuario lo vea al editar */
  const valorActual = document.getElementById(`val-${campo}`).textContent;
  document.getElementById(`input-${campo}`).value = valorActual;

  /* Oculta el texto + botón Editar, muestra el input */
  document.querySelector(`#edit-${campo}`).closest('.dato-fila')
    .querySelector('.dato-valor-wrap').style.display = 'none';
  document.getElementById(`edit-${campo}`).classList.add('visible');
}

/**
 * Cancela la edición y restaura el texto original sin cambios.
 * @param {string} campo - 'correo' o 'telefono'
 */
function cancelarEdicion(campo) {
  /* Limpia cualquier error que haya quedado */
  document.getElementById(`edit-${campo}`).classList.remove('error');

  /* Oculta el input, vuelve a mostrar el texto */
  document.getElementById(`edit-${campo}`).classList.remove('visible');
  document.getElementById(`edit-${campo}`).closest('.dato-fila')
    .querySelector('.dato-valor-wrap').style.display = '';
}

/**
 * Valida el nuevo valor y, si es correcto, lo guarda actualizando el texto visible.
 * @param {string} campo - 'correo' o 'telefono'
 * @param {string} tipo  - 'email' o 'tel' (define qué validación aplicar)
 */
function guardarDato(campo, tipo) {
  const input     = document.getElementById(`input-${campo}`);
  const editWrap  = document.getElementById(`edit-${campo}`);
  const valor     = input.value.trim();
  let valido      = true;

  /* Valida según el tipo de campo */
  if (tipo === 'email' && !esCorreoValido(valor)) valido = false;
  if (tipo === 'tel'   && !esTelefonoValido(valor)) valido = false;
  if (valor === '')    valido = false;

  if (!valido) {
    /* Muestra el error en rojo y detiene la función */
    editWrap.classList.add('error');
    input.focus();
    return;
  }

  /* Sin errores: limpia el estado de error */
  editWrap.classList.remove('error');

  /* Actualiza el texto visible en pantalla con el nuevo valor */
  document.getElementById(`val-${campo}`).textContent = valor;

  /* Cierra el modo edición */
  cancelarEdicion(campo);
}


/* ── NOTIFICACIONES ─────────────────────────── */

/**
 * Marca todas las notificaciones como leídas:
 * - Agrega la clase 'leida' (CSS las atenúa con opacity: 0.4)
 * - Oculta el badge de conteo
 */
function marcarTodasLeidas() {
  /* Selecciona todos los ítems de notificación y los atenúa */
  document.querySelectorAll('.notif-item').forEach(item => {
    item.classList.add('leida');
  });

  /* Oculta el badge "X sin leer" */
  const badge = document.getElementById('notif-badge');
  badge.style.display = 'none';
}


/* ── CV: mostrar nombre del archivo ─────────── */

/**
 * Muestra el nombre del archivo seleccionado debajo de la zona de upload.
 * @param {HTMLInputElement} input - el input type="file"
 */
function mostrarNombreCV(input) {
  const nombreEl = document.getElementById('cv-nombre');

  if (input.files && input.files[0]) {
    /* Muestra el nombre del archivo con un ícono de check */
    nombreEl.textContent = '✓ Archivo seleccionado: ' + input.files[0].name;
    nombreEl.classList.add('visible');
  } else {
    /* Si no hay archivo (canceló), oculta el nombre */
    nombreEl.classList.remove('visible');
  }
}