/* =============================================
   datos.js
   Fuente de datos local — reemplaza a una base de datos.
   Cada objeto es una oferta laboral.
   Para agregar más ofertas: copia un bloque y cambia los valores.
   ============================================= */

const OFERTAS = [
  {
    id: 1,
    titulo:      "Coordinador/a de proyectos",
    empresa:     "Consultora Horizonte",
    iniciales:   "CH",                        // se muestra en el avatar de la tarjeta
    ubicacion:   "Manta",
    modalidad:   "Híbrida",                   // Presencial | Híbrida | Remota
    jornada:     "Tiempo completo",           // Tiempo completo | Medio tiempo | Por proyecto
    experiencia: "1 a 3 años",               // Sin experiencia | 1 a 3 años | Más de 3 años
    area:        "Administración",
    salario:     "USD 1.200–1.500 / mes",
    descripcion: "Administración de Empresas · Maestría en Gestión de Proyectos",
    etiquetas:   ["Título y maestría afines"],
    dias:        2,                           // hace cuántos días se publicó
    recomendada: true                         // aparece en sección "Recomendadas"
  },
  {
    id: 2,
    titulo:      "Analista de planificación",
    empresa:     "Grupo Costa Empresarial",
    iniciales:   "GC",
    ubicacion:   "Portoviejo",
    modalidad:   "Presencial",
    jornada:     "Tiempo completo",
    experiencia: "1 a 3 años",
    area:        "Administración",
    salario:     "USD 900–1.200 / mes",
    descripcion: "Administración de Empresas · Maestría en Administración",
    etiquetas:   ["Título y maestría afines"],
    dias:        3,
    recomendada: true
  },
  {
    id: 3,
    titulo:      "Desarrollador/a de software junior",
    empresa:     "Next Digital",
    iniciales:   "ND",
    ubicacion:   "Ecuador",
    modalidad:   "Remota",
    jornada:     "Tiempo completo",
    experiencia: "Sin experiencia",
    area:        "Tecnología",
    salario:     "USD 800–1.100 / mes",
    descripcion: "Ingeniería en Software o carreras afines",
    etiquetas:   ["Título afín"],
    dias:        1,
    recomendada: false
  },
  {
    id: 4,
    titulo:      "Asistente contable",
    empresa:     "Servicios Contables Manabí",
    iniciales:   "SC",
    ubicacion:   "Manta",
    modalidad:   "Presencial",
    jornada:     "Tiempo completo",
    experiencia: "Sin experiencia",
    area:        "Contabilidad",
    salario:     "USD 550–700 / mes",
    descripcion: "Contabilidad y Auditoría",
    etiquetas:   ["Título afín"],
    dias:        2,
    recomendada: false
  },
  {
    id: 5,
    titulo:      "Diseñador/a gráfico freelance",
    empresa:     "Agencia Creativa EC",
    iniciales:   "AC",
    ubicacion:   "Portoviejo",
    modalidad:   "Remota",
    jornada:     "Por proyecto",
    experiencia: "1 a 3 años",
    area:        "Diseño",
    salario:     "USD 400–800 / proyecto",
    descripcion: "Diseño Gráfico, Comunicación Visual o afines",
    etiquetas:   ["Portafolio requerido"],
    dias:        4,
    recomendada: false
  },
  {
    id: 6,
    titulo:      "Enfermero/a clínico",
    empresa:     "Clínica del Pacífico",
    iniciales:   "CP",
    ubicacion:   "Manta",
    modalidad:   "Presencial",
    jornada:     "Medio tiempo",
    experiencia: "Sin experiencia",
    area:        "Salud",
    salario:     "USD 600–750 / mes",
    descripcion: "Enfermería o carreras de la salud",
    etiquetas:   ["Título afín"],
    dias:        5,
    recomendada: false
  },
  {
    id: 7,
    titulo:      "Analista de datos",
    empresa:     "DataSur Analytics",
    iniciales:   "DS",
    ubicacion:   "Ecuador",
    modalidad:   "Remota",
    jornada:     "Tiempo completo",
    experiencia: "Más de 3 años",
    area:        "Tecnología",
    salario:     "USD 1.500–2.000 / mes",
    descripcion: "Estadística, Ingeniería o Ciencias de Datos",
    etiquetas:   ["Maestría valorada"],
    dias:        1,
    recomendada: true
  },
  {
    id: 8,
    titulo:      "Coordinador/a de talento humano",
    empresa:     "Grupo Industrial Manabí",
    iniciales:   "GI",
    ubicacion:   "Manta",
    modalidad:   "Híbrida",
    jornada:     "Tiempo completo",
    experiencia: "Más de 3 años",
    area:        "Administración",
    salario:     "USD 1.000–1.300 / mes",
    descripcion: "Psicología Organizacional, Administración o afines",
    etiquetas:   ["Título afín", "Maestría valorada"],
    dias:        6,
    recomendada: false
  }
];


/* =============================================
   CANDIDATOS
   Postulantes de ejemplo vinculados a las ofertas
   por ofertaId (referencia al id de OFERTAS).
   ============================================= */
const CANDIDATOS = [
  { iniciales:'BT', nombre:'Brayhan Torres',  ofertaId:1, carrera:'Ingeniería en Software · ULEAM',      formacion:'Maestría en TI · Certificado en Desarrollo Web',         estado:'En revisión', tiempo:'Hace 1 h'   },
  { iniciales:'LC', nombre:'Laura Cedeño',    ofertaId:1, carrera:'Ingeniería Industrial · ULEAM',       formacion:'Maestría en Gestión de Proyectos',                        estado:'Enviada',     tiempo:'Ayer'        },
  { iniciales:'KV', nombre:'Karen Veloz',     ofertaId:1, carrera:'Ingeniería Civil · ULEAM',            formacion:'Maestría en Gestión · Certificado en Liderazgo',          estado:'Rechazada',   tiempo:'Hace 4 días' },
  { iniciales:'MA', nombre:'María Alvarado',  ofertaId:2, carrera:'Administración de Empresas · ULEAM', formacion:'Maestría en Administración',                              estado:'Enviada',     tiempo:'Hace 3 h'    },
  { iniciales:'SC', nombre:'Sofía Castro',    ofertaId:2, carrera:'Economía · ULEAM',                   formacion:'Maestría en Finanzas · Título de pregrado',               estado:'Aceptada',    tiempo:'Hace 2 días' },
  { iniciales:'VT', nombre:'Valeria Torres',  ofertaId:2, carrera:'Administración de Empresas · ULEAM', formacion:'Título de pregrado',                                      estado:'Enviada',     tiempo:'Hace 5 días' },
  { iniciales:'JR', nombre:'José Reyes',      ofertaId:4, carrera:'Contabilidad y Auditoría · ULEAM',   formacion:'Título de pregrado',                                      estado:'Aceptada',    tiempo:'Ayer'        },
  { iniciales:'DM', nombre:'Diego Moreira',   ofertaId:4, carrera:'Administración de Empresas · ULEAM', formacion:'Título de pregrado',                                      estado:'Enviada',     tiempo:'Hace 3 días' },
  { iniciales:'PR', nombre:'Pedro Rodríguez', ofertaId:3, carrera:'Ingeniería en Sistemas · ULEAM',     formacion:'Certificado en Desarrollo de Apps Web',                   estado:'En revisión', tiempo:'Hace 2 días' },
  { iniciales:'AM', nombre:'Andrés Macías',   ofertaId:3, carrera:'Ingeniería en Software · ULEAM',     formacion:'Certificado en React y Node.js',                          estado:'En revisión', tiempo:'Hace 4 días' },
];