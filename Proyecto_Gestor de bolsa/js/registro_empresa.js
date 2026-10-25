/* =============================================
   registro_empresa.js
   Valida el formulario de registro de compañía.
   Si todo pasa, navega a solicitud_enviada.html.
   ============================================= */

function validarRegistroEmpresa() {
  let valido = true;

  /* ── Campos obligatorios simples (no vacíos) ── */
  const camposRequeridos = [
    'nombre-comercial',
    'razon-social',
    'ciudad',
    'direccion',
    'rep-nombre',
    'rep-cargo'
  ];

  camposRequeridos.forEach(id => {
    const val = document.getElementById(id).value;
    if (estaVacio(val)) {
      marcarCampo(id, true);
      valido = false;
    } else {
      marcarCampo(id, false);
    }
  });

  /* ── RUC: exactamente 13 dígitos ── */
  const ruc = document.getElementById('ruc').value.trim();
  if (!/^\d{13}$/.test(ruc)) {
    marcarCampo('ruc', true);
    valido = false;
  } else {
    marcarCampo('ruc', false);
  }

  /* ── Sector: debe seleccionar una opción ── */
  const sector = document.getElementById('sector').value;
  if (sector === '') {
    marcarCampo('sector', true);
    valido = false;
  } else {
    marcarCampo('sector', false);
  }

  /* ── Correo corporativo ── */
  const correo = document.getElementById('rep-correo').value;
  if (!esCorreoValido(correo)) {
    marcarCampo('rep-correo', true);
    valido = false;
  } else {
    marcarCampo('rep-correo', false);
  }

  /* ── Teléfono: 10 dígitos o 9 (fijo) ── */
  const tel = document.getElementById('rep-telefono').value.trim();
  if (!/^\d{9,10}$/.test(tel)) {
    marcarCampo('rep-telefono', true);
    valido = false;
  } else {
    marcarCampo('rep-telefono', false);
  }

  /* Si todo pasó, navega a la pantalla de confirmación */
  if (valido) {
    window.location.href = 'solicitud_enviada.html';
  }
}