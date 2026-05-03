/*
  UOMI · Definiciones SVG compartidas (figuras + patrón).
  Se inyectan al inicio del <body> para que todas las páginas puedan
  referenciar #f-stand, #uomi-pattern, etc. con <use href="#...">.

  Proporciones (1 unidad = 10 px):
    Cabeza: óvalo 2h x 1l            (rx=5, ry=10)
    Cuerpo: 6h x 3l, más ancho abajo (path 60 alto, ±14 abajo)
    Brazo:  10 + 20 + 5              (3 segmentos)
    Pierna: 15 + 25                  (2 segmentos)
    Separación entre partes: 0.5     (~5 px)
*/
(function () {
  var SVG_DEFS = ''
    + '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">'
    +   '<defs>'

    /* 1) PARADO RELAJADO */
    +     '<symbol id="f-stand" viewBox="-50 -2 100 140" overflow="visible">'
    +       '<ellipse cx="0" cy="10" rx="5" ry="10" fill="currentColor"/>'
    +       '<path fill="currentColor" d="M0 25 C6 25, 10 35, 11 50 C13 68, 14 85, 0 85 C-14 85, -13 68, -11 50 C-10 35, -6 25, 0 25 Z"/>'
    +       '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="14,32 16,42 19,62 20,67"/>'
    +         '<polyline points="-14,32 -16,42 -19,62 -20,67"/>'
    +         '<polyline points="6,90 6,105 6,130"/>'
    +         '<polyline points="-6,90 -6,105 -6,130"/>'
    +       '</g>'
    +     '</symbol>'

    /* 2) BRAZOS ARRIBA */
    +     '<symbol id="f-up" viewBox="-50 -10 100 150" overflow="visible">'
    +       '<ellipse cx="0" cy="10" rx="5" ry="10" fill="currentColor"/>'
    +       '<path fill="currentColor" d="M0 25 C6 25, 10 35, 11 50 C13 68, 14 85, 0 85 C-14 85, -13 68, -11 50 C-10 35, -6 25, 0 25 Z"/>'
    +       '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="14,32 16,22 19,2 20,-3"/>'
    +         '<polyline points="-14,32 -16,22 -19,2 -20,-3"/>'
    +         '<polyline points="6,90 6,105 6,130"/>'
    +         '<polyline points="-6,90 -6,105 -6,130"/>'
    +       '</g>'
    +     '</symbol>'

    /* 3) BRAZOS EN CRUZ */
    +     '<symbol id="f-out" viewBox="-60 -2 120 140" overflow="visible">'
    +       '<ellipse cx="0" cy="10" rx="5" ry="10" fill="currentColor"/>'
    +       '<path fill="currentColor" d="M0 25 C6 25, 10 35, 11 50 C13 68, 14 85, 0 85 C-14 85, -13 68, -11 50 C-10 35, -6 25, 0 25 Z"/>'
    +       '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="14,32 24,32 44,32 49,32"/>'
    +         '<polyline points="-14,32 -24,32 -44,32 -49,32"/>'
    +         '<polyline points="6,90 6,105 6,130"/>'
    +         '<polyline points="-6,90 -6,105 -6,130"/>'
    +       '</g>'
    +     '</symbol>'

    /* 4) CAMINANDO */
    +     '<symbol id="f-walk" viewBox="-50 -2 100 140" overflow="visible">'
    +       '<ellipse cx="0" cy="10" rx="5" ry="10" fill="currentColor"/>'
    +       '<path fill="currentColor" d="M0 25 C6 25, 10 35, 11 50 C13 68, 14 85, 0 85 C-14 85, -13 68, -11 50 C-10 35, -6 25, 0 25 Z"/>'
    +       '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="14,32 16,42 19,62 20,67"/>'
    +         '<polyline points="-14,32 -16,42 -19,62 -20,67"/>'
    +         '<polyline points="6,90 12,104 14,129"/>'
    +         '<polyline points="-6,90 -9,105 -18,129"/>'
    +       '</g>'
    +     '</symbol>'

    /* 5) BAILANDO */
    +     '<symbol id="f-dance" viewBox="-60 -10 120 145" overflow="visible">'
    +       '<ellipse cx="0" cy="10" rx="5" ry="10" fill="currentColor"/>'
    +       '<path fill="currentColor" d="M0 25 C6 25, 10 35, 11 50 C13 68, 14 85, 0 85 C-14 85, -13 68, -11 50 C-10 35, -6 25, 0 25 Z"/>'
    +       '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="14,32 19,23 29,6 32,2"/>'
    +         '<polyline points="-14,32 -23,37 -40,47 -44,50"/>'
    +         '<polyline points="6,90 14,103 27,125"/>'
    +         '<polyline points="-6,90 -14,103 -27,125"/>'
    +       '</g>'
    +     '</symbol>'

    /* 6) SALUDA */
    +     '<symbol id="f-wave" viewBox="-50 -10 100 145" overflow="visible">'
    +       '<ellipse cx="0" cy="10" rx="5" ry="10" fill="currentColor"/>'
    +       '<path fill="currentColor" d="M0 25 C6 25, 10 35, 11 50 C13 68, 14 85, 0 85 C-14 85, -13 68, -11 50 C-10 35, -6 25, 0 25 Z"/>'
    +       '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="14,32 16,22 19,2 20,-3"/>'
    +         '<polyline points="-14,32 -16,42 -19,62 -20,67"/>'
    +         '<polyline points="6,90 6,105 6,130"/>'
    +         '<polyline points="-6,90 -6,105 -6,130"/>'
    +       '</g>'
    +     '</symbol>'

    /* 7) ACCIÓN: brazos asimétricos + rodilla en alto */
    +     '<symbol id="f-action" viewBox="-50 -10 100 145" overflow="visible">'
    +       '<ellipse cx="0" cy="10" rx="5" ry="10" fill="currentColor"/>'
    +       '<path fill="currentColor" d="M0 25 C6 25, 10 35, 11 50 C13 68, 14 85, 0 85 C-14 85, -13 68, -11 50 C-10 35, -6 25, 0 25 Z"/>'
    +       '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="14,32 23,27 33,10 35,6"/>'
    +         '<polyline points="-14,32 -24,32 -34,15 -36,11"/>'
    +         '<polyline points="6,90 21,90 21,115"/>'
    +         '<polyline points="-6,90 -6,105 -6,130"/>'
    +       '</g>'
    +     '</symbol>'

    /* 8) ENCOGIMIENTO DE HOMBROS */
    +     '<symbol id="f-shrug" viewBox="-50 -2 100 140" overflow="visible">'
    +       '<ellipse cx="0" cy="10" rx="5" ry="10" fill="currentColor"/>'
    +       '<path fill="currentColor" d="M0 25 C6 25, 10 35, 11 50 C13 68, 14 85, 0 85 C-14 85, -13 68, -11 50 C-10 35, -6 25, 0 25 Z"/>'
    +       '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="14,32 24,32 27,12 28,7"/>'
    +         '<polyline points="-14,32 -24,32 -27,12 -28,7"/>'
    +         '<polyline points="6,90 6,105 6,130"/>'
    +         '<polyline points="-6,90 -6,105 -6,130"/>'
    +       '</g>'
    +     '</symbol>'

    /* 9) RELAJADO (manos en caderas, piernas separadas) */
    +     '<symbol id="f-relax" viewBox="-50 -2 100 140" overflow="visible">'
    +       '<ellipse cx="0" cy="10" rx="5" ry="10" fill="currentColor"/>'
    +       '<path fill="currentColor" d="M0 25 C6 25, 10 35, 11 50 C13 68, 14 85, 0 85 C-14 85, -13 68, -11 50 C-10 35, -6 25, 0 25 Z"/>'
    +       '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="14,32 17,41 7,58 5,62"/>'
    +         '<polyline points="-14,32 -17,41 -7,58 -5,62"/>'
    +         '<polyline points="6,90 10,104 16,128"/>'
    +         '<polyline points="-6,90 -10,104 -16,128"/>'
    +       '</g>'
    +     '</symbol>'

    /* 10) CAMINATA DINÁMICA */
    +     '<symbol id="f-walk2" viewBox="-50 -2 100 140" overflow="visible">'
    +       '<ellipse cx="0" cy="10" rx="5" ry="10" fill="currentColor"/>'
    +       '<path fill="currentColor" d="M0 25 C6 25, 10 35, 11 50 C13 68, 14 85, 0 85 C-14 85, -13 68, -11 50 C-10 35, -6 25, 0 25 Z"/>'
    +       '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="14,32 23,35 33,18 35,14"/>'
    +         '<polyline points="-14,32 -24,30 -44,30 -49,30"/>'
    +         '<polyline points="6,90 12,104 14,129"/>'
    +         '<polyline points="-6,90 -9,105 -18,129"/>'
    +       '</g>'
    +     '</symbol>'

    /* 11) ESTRELLA */
    +     '<symbol id="f-star" viewBox="-60 -10 120 145" overflow="visible">'
    +       '<ellipse cx="0" cy="10" rx="5" ry="10" fill="currentColor"/>'
    +       '<path fill="currentColor" d="M0 25 C6 25, 10 35, 11 50 C13 68, 14 85, 0 85 C-14 85, -13 68, -11 50 C-10 35, -6 25, 0 25 Z"/>'
    +       '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="14,32 21,25 35,11 38.5,7.5"/>'
    +         '<polyline points="-14,32 -21,25 -35,11 -38.5,7.5"/>'
    +         '<polyline points="6,90 13.5,103 26,124.5"/>'
    +         '<polyline points="-6,90 -13.5,103 -26,124.5"/>'
    +       '</g>'
    +     '</symbol>'

    /* 12) CHEER (paso adelante con brazos en celebración) */
    +     '<symbol id="f-cheer" viewBox="-50 -10 100 145" overflow="visible">'
    +       '<ellipse cx="0" cy="10" rx="5" ry="10" fill="currentColor"/>'
    +       '<path fill="currentColor" d="M0 25 C6 25, 10 35, 11 50 C13 68, 14 85, 0 85 C-14 85, -13 68, -11 50 C-10 35, -6 25, 0 25 Z"/>'
    +       '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="14,32 19,23.5 19,3.5 19,-1.5"/>'
    +         '<polyline points="-14,32 -24,32 -34,14.5 -36.5,10"/>'
    +         '<polyline points="6,90 12,104 14,129"/>'
    +         '<polyline points="-6,90 -9,105 -18,129"/>'
    +       '</g>'
    +     '</symbol>'

    /* PATRÓN principal: tile 400x240 con 12 figuras (6 por fila) */
    +     '<pattern id="uomi-pattern" width="400" height="240" patternUnits="userSpaceOnUse">'
    +       '<use href="#f-stand"  x="10"  y="10"  width="46" height="105"/>'
    +       '<use href="#f-up"     x="70"  y="0"   width="46" height="115"/>'
    +       '<use href="#f-shrug"  x="135" y="10"  width="50" height="105"/>'
    +       '<use href="#f-relax"  x="200" y="10"  width="46" height="105"/>'
    +       '<use href="#f-cheer"  x="260" y="0"   width="50" height="115"/>'
    +       '<use href="#f-walk2"  x="325" y="10"  width="56" height="105"/>'

    +       '<use href="#f-walk"   x="10"  y="125" width="46" height="105"/>'
    +       '<use href="#f-dance"  x="70"  y="120" width="60" height="115"/>'
    +       '<use href="#f-out"    x="140" y="125" width="64" height="100"/>'
    +       '<use href="#f-wave"   x="220" y="120" width="46" height="115"/>'
    +       '<use href="#f-action" x="280" y="120" width="46" height="115"/>'
    +       '<use href="#f-star"   x="335" y="120" width="60" height="115"/>'
    +     '</pattern>'

    +   '</defs>'
    + '</svg>';

  function inject() {
    if (document.getElementById('uomi-figures-defs')) {
      return;
    }
    var wrapper = document.createElement('div');
    wrapper.id = 'uomi-figures-defs';
    wrapper.innerHTML = SVG_DEFS;
    if (document.body) {
      document.body.insertBefore(wrapper, document.body.firstChild);
    } else {
      document.documentElement.appendChild(wrapper);
    }
  }

  if (document.body) {
    inject();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
