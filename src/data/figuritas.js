// ──────────────────────────────────────────────
//  EQUIPOS del Mundial 2026
//  Agrega o quita equipos según necesites
// ──────────────────────────────────────────────
export const EQUIPOS = [
  { id: 'arg', nombre: 'Argentina',    bandera: '🇦🇷', grupo: 'A' },
  { id: 'bra', nombre: 'Brasil',       bandera: '🇧🇷', grupo: 'A' },
  { id: 'fra', nombre: 'Francia',      bandera: '🇫🇷', grupo: 'B' },
  { id: 'eng', nombre: 'Inglaterra',   bandera: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', grupo: 'B' },
  { id: 'esp', nombre: 'España',       bandera: '🇪🇸', grupo: 'C' },
  { id: 'ger', nombre: 'Alemania',     bandera: '🇩🇪', grupo: 'C' },
  { id: 'por', nombre: 'Portugal',     bandera: '🇵🇹', grupo: 'D' },
  { id: 'ned', nombre: 'Países Bajos', bandera: '🇳🇱', grupo: 'D' },
  { id: 'uru', nombre: 'Uruguay',      bandera: '🇺🇾', grupo: 'E' },
  { id: 'col', nombre: 'Colombia',     bandera: '🇨🇴', grupo: 'E' },
  { id: 'mex', nombre: 'México',       bandera: '🇲🇽', grupo: 'F' },
  { id: 'usa', nombre: 'Estados Unidos', bandera: '🇺🇸', grupo: 'F' },
  { id: 'jpn', nombre: 'Japón',        bandera: '🇯🇵', grupo: 'G' },
  { id: 'mar', nombre: 'Marruecos',    bandera: '🇲🇦', grupo: 'G' },
  { id: 'sen', nombre: 'Senegal',      bandera: '🇸🇳', grupo: 'H' },
  { id: 'cro', nombre: 'Croacia',      bandera: '🇭🇷', grupo: 'H' },
  { id: 'nor', nombre: 'Noruega',      bandera: 'NR', grupo: 'H' },
];

// ──────────────────────────────────────────────
//  FIGURITAS iniciales de ejemplo
//  imagen: nombre del archivo en /public/figuritas/
//          (sin ruta, solo el nombre ej: "messi.png")
//  Si la imagen no existe se muestra un placeholder
// ──────────────────────────────────────────────
export const FIGURITAS_INICIALES = [
  // ARGENTINA
  { id: 1,  numero: 'ARG-01', jugador: 'Lionel Messi',       equipo: 'arg', imagen: 'messi.png',      obtenida: true,  favorita: false },
  { id: 3,  numero: 'ARG-03', jugador: 'Julián Álvarez',     equipo: 'arg', imagen: 'alvarez.png',    obtenida: true,  favorita: false },
  { id: 4,  numero: 'ARG-04', jugador: 'Enzo Fernández',     equipo: 'arg', imagen: 'enzof.png',      obtenida: false, favorita: false },

  // BRASIL
  { id: 5,  numero: 'BRA-01', jugador: 'Vinicius Jr.',       equipo: 'bra', imagen: 'vini.png',       obtenida: true,  favorita: true  },
  { id: 7,  numero: 'BRA-03', jugador: 'Raphinha',           equipo: 'bra', imagen: 'raphinha.png',   obtenida: true,  favorita: false },

  // FRANCIA
  { id: 8,  numero: 'FRA-01', jugador: 'Kylian Mbappé',      equipo: 'fra', imagen: 'mbappe.png',     obtenida: true,  favorita: true  },

  // ESPAÑA
  { id: 10, numero: 'ESP-01', jugador: 'Pedri',              equipo: 'esp', imagen: 'pedri.png',      obtenida: true,  favorita: false },
  { id: 11, numero: 'ESP-02', jugador: 'Lamine Yamal',       equipo: 'esp', imagen: 'yamal.png',      obtenida: false, favorita: false },

  // ALEMANIA
  { id: 13, numero: 'GER-01', jugador: 'Florian Wirtz',      equipo: 'ger', imagen: 'wirtz.png',      obtenida: false, favorita: false },
  { id: 14, numero: 'GER-02', jugador: 'Jamal Musiala',      equipo: 'ger', imagen: 'musiala.png',    obtenida: true,  favorita: false },

  // PORTUGAL
  { id: 15, numero: 'POR-01', jugador: 'Cristiano Ronaldo',  equipo: 'por', imagen: 'cr7.png',        obtenida: true,  favorita: true  },
  { id: 16, numero: 'POR-02', jugador: 'Bernardo Silva',    equipo: 'por', imagen: 'bernardos.png',     obtenida: false, favorita: false },

  // URUGUAY
  { id: 17, numero: 'URU-01', jugador: 'Darwin Núñez',       equipo: 'uru', imagen: 'darwin.png',     obtenida: true,  favorita: false },
  { id: 18, numero: 'URU-02', jugador: 'Federico Valverde',  equipo: 'uru', imagen: 'valverde.png',   obtenida: false, favorita: false },

  // COLOMBIA
  { id: 19, numero: 'COL-01', jugador: 'Luis Díaz',          equipo: 'col', imagen: 'luisdiaz.png',   obtenida: true,  favorita: false },
  { id: 20, numero: 'COL-02', jugador: 'James Rodríguez',    equipo: 'col', imagen: 'james.png',      obtenida: false, favorita: false },

];