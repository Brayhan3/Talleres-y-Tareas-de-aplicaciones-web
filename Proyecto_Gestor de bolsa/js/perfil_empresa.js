/* =============================================
   perfil_empresa.js
   Edición de datos de empresa y cambio de contraseña.
   Reutiliza abrirEdicion / cancelarEdicion de perfil.js
   pero con validaciones adicionales (RUC, URL).
   ============================================= */

/* ── DROPDOWN ── */
function toggleDropdown() {
  document.getElementById('dropdown-perfil').classList.toggle('abierto');
}
document.addEventListener('click', function(e) {
  const menu = document.querySelector('.perfil-menu');
  if (menu && !menu.contains(e.target))
    document.getElementById('dropdown-perfil').classList.remove('abierto');
});

/* ── EDICIÓN DE DATOS ── */

function abrirEdicion(campo) {
  const valorActual = document.getElementById(`val-${campo}`).textContent;
  document.getElementById(`input-${campo}`).value = valorActual;
  document.querySelector(`#edit-${campo}`).closest('.dato-fila')
    .querySelector('.dato-valor-wrap').style.display = 'none';
  document.getElementById(`edit-${campo}`).classList.add('visible');
}

function cancelarEdicion(campo) {
  document.getElementById(`edit-${campo}`).classList.remove('error', 'visible');
  document.getElementById(`edit-${campo}`).closest('.dato-fila')
    .querySelector('.dato-valor-wrap').style.display = '';
}

/**
 * Guarda el dato según su tipo de validación.
 * Tipos: 'texto' | 'email' | 'tel' | 'ruc' | 'url'
 */
function guardarDato(campo, tipo) {
  const input    = document.getElementById(`input-${campo}`);
  const editWrap = document.getElementById(`edit-${campo}`);
  const valor    = input.value.trim();
  let valido     = true;

  if (tipo === 'texto' && estaVacio(valor))           valido = false;
  if (tipo === 'email' && !esCorreoValido(valor))     valido = false;
  if (tipo === 'tel'   && !/^\d{9,10}$/.test(valor)) valido = false;
  if (tipo === 'ruc'   && !/^\d{13}$/.test(valor))   valido = false;
  if (tipo === 'url'   && valor !== '' &&
      !valor.startsWith('http'))                       valido = false;

  if (!valido) {
    editWrap.classList.add('error');
    input.focus();
    return;
  }

  editWrap.classList.remove('error');
  document.getElementById(`val-${campo}`).textContent = valor;
  cancelarEdicion(campo);
}

/* ── CAMBIO DE CONTRASEÑA ── */

function cambiarContrasena() {
  const actual     = document.getElementById('pass-actual').value;
  const nueva      = document.getElementById('pass-nueva').value;
  const confirmar  = document.getElementById('pass-confirmar').value;
  let valido       = true;

  /* Contraseña actual: no vacía */
  if (estaVacio(actual)) {
    marcarCampo('pass-actual', true); valido = false;
  } else { marcarCampo('pass-actual', false); }

  /* Nueva: mínimo 8 caracteres */
  if (nueva.length < 8) {
    marcarCampo('pass-nueva', true); valido = false;
  } else { marcarCampo('pass-nueva', false); }

  /* Confirmación: debe coincidir con la nueva */
  if (confirmar !== nueva || estaVacio(confirmar)) {
    marcarCampo('pass-confirmar', true); valido = false;
  } else { marcarCampo('pass-confirmar', false); }

  const aviso = document.getElementById('aviso-pass');

  if (valido) {
    /* Limpia los campos y muestra aviso de éxito */
    ['pass-actual', 'pass-nueva', 'pass-confirmar']
      .forEach(id => document.getElementById(id).value = '');
    mostrarAviso('aviso-pass', 'exito', '✓ Contraseña actualizada correctamente.');
  } else {
    mostrarAviso('aviso-pass', 'error', 'Revisa los campos e inténtalo de nuevo.');
  }
}