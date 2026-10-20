/* oferta.js — carga datos de la oferta por ?id= y maneja modales */

function toggleDropdown() {
  document.getElementById('dropdown-perfil').classList.toggle('abierto');
}
document.addEventListener('click', function(e) {
  const menu = document.querySelector('.perfil-menu');
  if (menu && !menu.contains(e.target))
    document.getElementById('dropdown-perfil').classList.remove('abierto');
});

document.addEventListener('DOMContentLoaded', function() {
  const id     = parseInt(new URLSearchParams(window.location.search).get('id'));
  const oferta = OFERTAS.find(o => o.id === id);

  if (!oferta) {
    document.querySelector('.oferta-det-layout').innerHTML =
      '<p style="padding:2rem;color:var(--texto-suave);">Oferta no encontrada. <a href="index.html">Volver</a></p>';
    return;
  }

  /* Rellena encabezado */
  document.getElementById('bread-titulo').textContent    = oferta.titulo;
  document.getElementById('det-iniciales').textContent   = oferta.iniciales;
  document.getElementById('det-titulo').textContent      = oferta.titulo;
  document.getElementById('det-empresa').textContent     = oferta.empresa;
  document.getElementById('det-ubicacion').textContent   = '📍 ' + oferta.ubicacion;
  document.getElementById('det-modalidad').textContent   = '🏢 ' + oferta.modalidad;
  document.getElementById('det-jornada').textContent     = '⏱ '  + oferta.jornada;
  document.getElementById('det-salario').textContent     = oferta.salario;
  document.getElementById('modal-nombre-oferta').textContent = oferta.titulo;

  /* Rellena sidebar resumen */
  document.getElementById('det-area').textContent        = oferta.area;
  document.getElementById('res-modalidad').textContent   = oferta.modalidad;
  document.getElementById('res-jornada').textContent     = oferta.jornada;
  document.getElementById('det-experiencia').textContent = oferta.experiencia;
  document.getElementById('det-dias').textContent        = oferta.dias === 1 ? 'Hace 1 día' : `Hace ${oferta.dias} días`;

  /* Etiquetas */
  document.getElementById('det-etiquetas').innerHTML =
    oferta.etiquetas.map(e => `<span class="etiqueta">${e}</span>`).join('');

  document.title = `${oferta.titulo} — ULEAM`;
});

function confirmarPostulacion() {
  cerrarModal('modal-postular');
  abrirModal('modal-exito');
}