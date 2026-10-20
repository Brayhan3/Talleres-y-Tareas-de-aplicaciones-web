/* =============================================
   solicitudes.js
   Maneja la vista "Mis Solicitudes"
   ============================================= */

/* ── DROPDOWN MI PERFIL ─────────────────────── */

/* Abre o cierra el menú desplegable de Mi perfil */
function toggleDropdown() {
  document.getElementById('dropdown-perfil').classList.toggle('abierto');
}

/* Cierra el dropdown si el usuario hace clic fuera de él */
document.addEventListener('click', function(e) {
  const menu = document.querySelector('.perfil-menu');
  if (menu && !menu.contains(e.target)) {
    const dropdown = document.getElementById('dropdown-perfil');
    if (dropdown) dropdown.classList.remove('abierto');
  }
});

/* ── FUENTE DE DATOS Y LÓGICA DE SOLICITUDES ── */

// Simulamos el estado de las postulaciones del usuario vinculadas a las ofertas de datos.js
const ESTADOS_POSTULACIONES = {
  3: {
    estado: "Enviada",
    mensajeEstado: "La solicitud está pendiente de revisión por la empresa.",
    porAprender: "Scrum, integración continua y buenas prácticas de desarrollo.",
    porUsar: "Git, Visual Studio Code y herramientas de seguimiento de tareas.",
    porAplicar: "Programación, consultas SQL y resolución de errores."
  },
  1: {
    estado: "En revisión",
    mensajeEstado: "La empresa está evaluando el perfil y la documentación.",
    porAprender: "Metodologías ágiles y gestión de riesgos de proyectos.",
    porUsar: "Microsoft Project, Excel y tableros de seguimiento.",
    porAplicar: "Planificación, control presupuestario y coordinación de equipos."
  },
  2: {
    estado: "Aceptada",
    mensajeEstado: "La solicitud fue aceptada para continuar el proceso de selección.",
    porAprender: "Power BI y metodología de planificación estratégica.",
    porUsar: "Excel, bases de datos y plantillas de reportes de gestión.",
    porAplicar: "Análisis de datos, seguimiento de indicadores y elaboración de informes."
  }
};

const MIS_SOLICITUDES = OFERTAS
  .filter(oferta => ESTADOS_POSTULACIONES[oferta.id])
  .map(oferta => ({
    ...oferta,
    ...ESTADOS_POSTULACIONES[oferta.id]
  }));

let estadoFiltroActual = 'todos';

function obtenerBadgeEstado(estado) {
  switch (estado) {
    case 'Enviada':
      return `<span class="badge-estado badge-enviada">🚀 Enviada</span>`;
    case 'En revisión':
      return `<span class="badge-estado badge-revision">🕒 En revisión</span>`;
    case 'Aceptada':
      return `<span class="badge-estado badge-aceptada">✅ Aceptada</span>`;
    default:
      return `<span class="badge-estado">${estado}</span>`;
  }
}

function htmlTarjetaSolicitud(item) {
  return `
    <div class="seccion tarjeta-solicitud" style="margin-bottom: 0;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
        <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
          <div class="tarjeta-avatar" style="width: 44px; height: 44px; font-size: 0.9rem;">${item.iniciales}</div>
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700; line-height: 1.2;">${item.titulo}</h3>
            <div style="font-size: 0.82rem; color: var(--texto-suave); margin-top: 0.15rem;">${item.empresa}</div>
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.3rem;">
          <div style="font-size: 0.95rem; font-weight: 700;">${item.salario}</div>
          <small style="font-size: 0.72rem; color: var(--texto-suave);">Sueldo aproximado</small>
          <div style="margin-top: 0.25rem;">
            ${obtenerBadgeEstado(item.estado)}
          </div>
        </div>
      </div>

      <div class="tarjeta-meta" style="margin: 0.75rem 0 0.85rem 0;">
        <span>📍 ${item.ubicacion}</span>
        <span>🏢 ${item.modalidad}</span>
        <span>⏱ ${item.jornada}</span>
      </div>

      <p style="font-size: 0.83rem; color: var(--texto-suave); margin-bottom: 1rem; line-height: 1.4;">
        ${item.descripcion}
      </p>

      <div class="grid-resumen-solicitud">
        <div class="bloque-solicitud-info">
          <strong>📖 Por Aprender</strong>
          <span>${item.porAprender}</span>
        </div>
        <div class="bloque-solicitud-info">
          <strong>💻 Por Usar</strong>
          <span>${item.porUsar}</span>
        </div>
        <div class="bloque-solicitud-info">
          <strong>⚙️ Por Aplicar</strong>
          <span>${item.porAplicar}</span>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.25rem; gap: 1rem; flex-wrap: wrap;">
        <span style="font-size: 0.8rem; color: var(--texto-suave); font-style: italic;">
          ${item.mensajeEstado}
        </span>
        <a href="oferta.html?id=${item.id}" class="btn-continuar" style="padding: 0.5rem 1rem; font-size: 0.85rem; text-decoration: none;">
          Ver oferta →
        </a>
      </div>
    </div>
  `;
}

function filtrarSolicitudes() {
  const texto = document.getElementById('buscar-solicitud').value.toLowerCase().trim();
  const orden = document.getElementById('ordenar-solicitudes').value;

  let filtradas = MIS_SOLICITUDES.filter(s => {
    if (estadoFiltroActual !== 'todos' && s.estado !== estadoFiltroActual) return false;
    if (texto && !`${s.titulo} ${s.empresa} ${s.descripcion}`.toLowerCase().includes(texto)) return false;
    return true;
  });

  if (orden === 'antiguo') filtradas.reverse();

  const contenedor = document.getElementById('contenedor-solicitudes');
  if (filtradas.length > 0) {
    contenedor.innerHTML = filtradas.map(htmlTarjetaSolicitud).join('');
  } else {
    contenedor.innerHTML = `<div class="sin-resultados">No se encontraron solicitudes con los filtros seleccionados.</div>`;
  }

  document.getElementById('subtitulo-conteo').textContent = `${filtradas.length} solicitudes de ejemplo`;
}

function filtrarPorEstado(estado, elemento) {
  estadoFiltroActual = estado;
  document.querySelectorAll('.btn-filtro-estado').forEach(btn => btn.classList.remove('activo'));
  elemento.classList.add('activo');
  filtrarSolicitudes();
}

function actualizarConteos() {
  document.getElementById('conteo-todos').textContent = MIS_SOLICITUDES.length;
  document.getElementById('conteo-enviada').textContent = MIS_SOLICITUDES.filter(s => s.estado === 'Enviada').length;
  document.getElementById('conteo-revision').textContent = MIS_SOLICITUDES.filter(s => s.estado === 'En revisión').length;
  document.getElementById('conteo-aceptada').textContent = MIS_SOLICITUDES.filter(s => s.estado === 'Aceptada').length;
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarConteos();
  filtrarSolicitudes();
});