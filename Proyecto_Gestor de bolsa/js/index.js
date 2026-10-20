/* =============================================
   index.js
   Lógica de la página principal:
   - Renderiza ofertas desde datos.js
   - Filtra por texto, ubicación, área, modalidad, jornada y experiencia
   - Ordena resultados
   - Maneja el dropdown de Mi perfil
   ============================================= */


/* ── DROPDOWN MI PERFIL ─────────────────────── */

/* Abre o cierra el menú desplegable de Mi perfil */
function toggleDropdown() {
  document.getElementById('dropdown-perfil').classList.toggle('abierto');
}

/* Cierra el dropdown si el usuario hace clic en cualquier otro lugar */
document.addEventListener('click', function(e) {
  const menu = document.querySelector('.perfil-menu');
  /* Si el clic NO fue dentro del menú, lo cierra */
  if (menu && !menu.contains(e.target)) {
    document.getElementById('dropdown-perfil').classList.remove('abierto');
  }
});


/* ── RENDERIZADO DE TARJETAS ────────────────── */

/**
 * Construye el HTML de una tarjeta recomendada.
 * Recibe un objeto oferta de OFERTAS (datos.js).
 * @returns {string} HTML de la tarjeta
 */
function htmlTarjeta(oferta) {
  /* Genera los chips de etiquetas */
  const etiquetas = oferta.etiquetas
    .map(e => `<span class="etiqueta">${e}</span>`)
    .join('');

  return `
    <div class="tarjeta-oferta">
      <div class="tarjeta-header">
        <div class="tarjeta-avatar">${oferta.iniciales}</div>
        <div class="tarjeta-titulo-wrap">
          <div class="tarjeta-titulo">${oferta.titulo}</div>
          <div class="tarjeta-empresa">${oferta.empresa}</div>
        </div>
        <!-- Botón guardar: visual por ahora, sin acción real -->
        <button class="btn-guardar" title="Guardar oferta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>

      <div class="tarjeta-meta">
        <span>📍 ${oferta.ubicacion}</span>
        <span>🏢 ${oferta.modalidad}</span>
        <span>⏱ ${oferta.jornada}</span>
      </div>

      <div class="tarjeta-desc">${oferta.descripcion}</div>
      <div class="tarjeta-etiquetas">${etiquetas}</div>

      <div class="tarjeta-footer">
        <div class="tarjeta-salario">
          ${oferta.salario}
          <small>Sueldo aproximado</small>
        </div>
        <!-- Navega a oferta.html pasando el id como parámetro en la URL -->
        <a href="oferta.html?id=${oferta.id}" class="btn-ver">Ver detalle / Postular</a>
      </div>
    </div>`;
}

/**
 * Construye el HTML de un ítem de la lista "Explora más".
 * @returns {string} HTML del ítem
 */
function htmlItem(oferta) {
  const etiquetas = oferta.etiquetas
    .map(e => `<span class="etiqueta">${e}</span>`)
    .join('');

  const dias = oferta.dias === 1 ? 'Hace 1 día' : `Hace ${oferta.dias} días`;

  return `
    <div class="oferta-item">
      <div class="oferta-item-left">
        <div class="tarjeta-avatar">${oferta.iniciales}</div>
        <div class="oferta-item-info">
          <div class="oferta-item-titulo">${oferta.titulo}</div>
          <div class="oferta-item-empresa">${oferta.empresa}</div>
          <div class="oferta-item-meta">
            <span>📍 ${oferta.ubicacion}</span>
            <span>🏢 ${oferta.modalidad}</span>
            <span>⏱ ${oferta.jornada}</span>
          </div>
          <div class="oferta-item-desc">${oferta.descripcion}</div>
          <div class="tarjeta-etiquetas" style="margin-top:0.4rem">${etiquetas}</div>
        </div>
      </div>
      <div class="oferta-item-right">
        <button class="btn-guardar" title="Guardar oferta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        <div class="tarjeta-salario" style="text-align:right">
          ${oferta.salario}
          <small>Sueldo aproximado</small>
        </div>
        <a href="oferta.html?id=${oferta.id}" class="btn-ver">Ver detalle / Postular</a>
        <span class="oferta-item-dias">${dias}</span>
      </div>
    </div>`;
}


/* ── FILTROS Y BUSCADOR ─────────────────────── */

/**
 * Lee todos los filtros activos y devuelve las ofertas que los cumplen.
 * Los filtros se combinan: una oferta debe pasar TODOS para aparecer.
 * @returns {Array} ofertas filtradas
 */
function obtenerFiltradas() {
  /* Lee el texto del buscador (en minúsculas para comparar sin importar mayúsculas) */
  const texto    = document.getElementById('buscar-texto').value.toLowerCase().trim();
  const ubicacion = document.getElementById('buscar-ubicacion').value;
  const area      = document.getElementById('filtro-area').value;

  /* Lee los checkboxes marcados de cada grupo y guarda sus valores en arrays */
  const modalidades  = valoresChecked('input[type="checkbox"][value="Presencial"], input[type="checkbox"][value="Híbrida"], input[type="checkbox"][value="Remota"]');
  const jornadas     = valoresChecked('input[type="checkbox"][value="Tiempo completo"], input[type="checkbox"][value="Medio tiempo"], input[type="checkbox"][value="Por proyecto"]');
  const experiencias = valoresChecked('input[type="checkbox"][value="Sin experiencia"], input[type="checkbox"][value="1 a 3 años"], input[type="checkbox"][value="Más de 3 años"]');

  return OFERTAS.filter(o => {
    /* Filtro de texto: busca en título, empresa y descripción */
    if (texto && !`${o.titulo} ${o.empresa} ${o.descripcion}`.toLowerCase().includes(texto)) return false;

    /* Filtro de ubicación */
    if (ubicacion && o.ubicacion !== ubicacion) return false;

    /* Filtro de área profesional */
    if (area && o.area !== area) return false;

    /* Filtros de checkbox: si hay alguno marcado, la oferta debe coincidir con uno de ellos */
    if (modalidades.length  && !modalidades.includes(o.modalidad))   return false;
    if (jornadas.length     && !jornadas.includes(o.jornada))         return false;
    if (experiencias.length && !experiencias.includes(o.experiencia)) return false;

    return true; // la oferta pasó todos los filtros
  });
}

/**
 * Lee todos los checkboxes que coinciden con el selector y están marcados.
 * @param {string} selector - selector CSS de los checkboxes del grupo
 * @returns {Array<string>} valores marcados
 */
function valoresChecked(selector) {
  return [...document.querySelectorAll(selector)]
    .filter(cb => cb.checked)  // solo los marcados
    .map(cb => cb.value);      // extrae el valor (texto de la opción)
}

/**
 * Aplica los filtros activos y actualiza la vista:
 * - Recomendadas: muestra solo las que tienen recomendada:true y pasan filtros
 * - Lista: muestra el resto según el orden elegido
 */
function aplicarFiltros() {
  const filtradas = obtenerFiltradas();
  const orden     = document.getElementById('ordenar').value;

  /* Ordena según criterio elegido en el select */
  const ordenadas = [...filtradas].sort((a, b) => {
    if (orden === 'reciente') return a.dias - b.dias;       // menor días = más reciente
    if (orden === 'salario')  return b.id - a.id;           // aproximación por id (datos de ejemplo)
    return 0;
  });

  /* Recomendadas: solo las marcadas como recomendada:true */
  const recomendadas = ordenadas.filter(o => o.recomendada);
  const resto        = ordenadas.filter(o => !o.recomendada);

  /* Renderiza la sección recomendadas */
  const gridRec = document.getElementById('grid-recomendadas');
  gridRec.innerHTML = recomendadas.length
    ? recomendadas.map(htmlTarjeta).join('')
    : '<p class="sin-resultados">No hay ofertas recomendadas que coincidan.</p>';

  /* Oculta la sección entera si no hay recomendadas */
  document.getElementById('seccion-recomendadas').style.display =
    recomendadas.length ? 'block' : 'none';

  /* Renderiza la lista "explora más" */
  const lista = document.getElementById('lista-ofertas');
  lista.innerHTML = resto.length
    ? resto.map(htmlItem).join('')
    : '<div class="sin-resultados">No se encontraron ofertas con los filtros actuales.</div>';
}

/**
 * Resetea todos los filtros a su estado inicial y vuelve a renderizar.
 */
function limpiarFiltros() {
  /* Limpia el texto del buscador */
  document.getElementById('buscar-texto').value    = '';
  document.getElementById('buscar-ubicacion').value = '';
  document.getElementById('filtro-area').value      = '';

  /* Desmarca todos los checkboxes */
  document.querySelectorAll('.check-lista input[type="checkbox"]')
    .forEach(cb => cb.checked = false);

  /* Vuelve a mostrar todas las ofertas */
  aplicarFiltros();
}


/* ── INICIO ─────────────────────────────────── */

/* Renderiza las ofertas al cargar la página por primera vez */
document.addEventListener('DOMContentLoaded', aplicarFiltros);