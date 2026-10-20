/* =============================================
   oferta.js
   Lee el ?id= de la URL, busca la oferta en OFERTAS
   (datos.js) y rellena la página con sus datos.
   ============================================= */

/* ── DROPDOWN (igual en todas las páginas) ── */
function toggleDropdown() {
  document.getElementById('dropdown-perfil').classList.toggle('abierto');
}
document.addEventListener('click', function(e) {
  const menu = document.querySelector('.perfil-menu');
  if (menu && !menu.contains(e.target)) {
    document.getElementById('dropdown-perfil').classList.remove('abierto');
  }
});

/* ── CARGAR DATOS DE LA OFERTA ────────────── */

document.addEventListener('DOMContentLoaded', function() {
  /* Lee el parámetro ?id= de la URL actual */
  const params = new URLSearchParams(window.location.search);
  const id     = parseInt(params.get('id'));

  /* Busca la oferta en el array OFERTAS de datos.js */
  const oferta = OFERTAS.find(o => o.id === id);

  /* Si no existe el id, muestra mensaje y sale */
  if (!oferta) {
    document.querySelector('.oferta-det-layout').innerHTML =
      '<p style="padding:2rem;color:var(--texto-suave);">Oferta no encontrada. <a href="index.html">Volver al listado</a></p>';
    return;
  }

  /* Rellena cada elemento con los datos de la oferta */
  document.getElementById('bread-titulo').textContent  = oferta.titulo;
  document.getElementById('det-iniciales').textContent = oferta.iniciales;
  document.getElementById('det-titulo').textContent    = oferta.titulo;
  document.getElementById('det-empresa').textContent   = oferta.empresa;
  document.getElementById('det-ubicacion').textContent = oferta.ubicacion;
  document.getElementById('det-modalidad').textContent = oferta.modalidad;
  document.getElementById('det-jornada').textContent   = oferta.jornada;
  document.getElementById('det-experiencia').textContent = oferta.experiencia;
  document.getElementById('det-salario').textContent   = oferta.salario;
  document.getElementById('det-area').textContent      = oferta.area;
  document.getElementById('modal-nombre-oferta').textContent = oferta.titulo;

  /* Rellena las etiquetas */
  document.getElementById('det-etiquetas').innerHTML =
    oferta.etiquetas.map(e => `<span class="etiqueta">${e}</span>`).join('');

  /* Actualiza el título de la pestaña del navegador */
  document.title = `${oferta.titulo} — ULEAM`;
});

/* ── POSTULACIÓN ──────────────────────────── */

/**
 * Cierra el modal de confirmación y abre el de éxito.
 * En un futuro aquí iría el envío real a un servidor.
 */
function confirmarPostulacion() {
  cerrarModal('modal-postular');
  abrirModal('modal-exito');
}