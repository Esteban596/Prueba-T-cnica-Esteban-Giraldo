const { parseCSV, writeCSV } = require('./utils/csvParser');

function ejercicio4() {
  // Leer archivo sucio
  const ventasSucias = parseCSV('./data/ventas_sucias.csv');

  const ventasLimpias = [];
  const ventasVistas = new Set(); // Para detectar duplicados
  const problemas = [];

  ventasSucias.forEach((venta, index) => {
    const numeroFila = index + 2; // +2 porque fila 1 es encabezado, +1 para índice

    // 1. Normalizar id producto a mayúsculas
    venta.id_producto = venta.id_producto.toUpperCase();

    // 2. Detectar id sucursal vacio
    if (!venta.id_sucursal || venta.id_sucursal.trim() === '') {
      problemas.push(`Fila ${numeroFila}: id_sucursal vacío`);
      // No eliminar, pero reportar
    }

    // 3. Detectar duplicados de id_venta
    if (ventasVistas.has(venta.id_venta)) {
      problemas.push(`Fila ${numeroFila}: id_venta ${venta.id_venta} duplicado (ignorado)`);
      return; // Saltar esta fila
    }
    ventasVistas.add(venta.id_venta);

    // 4. Unificar formato de fecha
    const fecha = normalizarFecha(venta.fecha);
    if (!fecha) {
      problemas.push(`Fila ${numeroFila}: fecha inválida (${venta.fecha})`);
      return;
    }
    venta.fecha = fecha;

    // 5. Detectar y reemplazar cantidades negativas
    const cantidad = parseInt(venta.cantidad);
    if (cantidad < 0) {
      problemas.push(`Fila ${numeroFila}: cantidad negativa (${cantidad}) → reemplazada por 0`);
      venta.cantidad = '0';
    }

    ventasLimpias.push(venta);
  });

  // Escribir archivo limpio
  writeCSV(ventasLimpias, './output/ventas_limpias.csv');

  // Reporte en consola
  console.log(`✓ Datos limpios: ${ventasLimpias.length} filas válidas`);
  if (problemas.length > 0) {
    console.log(`⚠ Problemas encontrados:`);
    problemas.forEach(p => console.log(`  ${p}`));
  }
}

/**
 * Convierte fecha de formatos variados a YYYY-MM-DD
 * Soporta: YYYY-MM-DD, DD/MM/YYYY
 */
function normalizarFecha(fecha) {
  // Formato YYYY-MM-DD (ya está correcto)
  if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return fecha;
  }

  // Formato DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) {
    const [dia, mes, año] = fecha.split('/');
    return `${año}-${mes}-${dia}`;
  }

  // Formato inválido
  return null;
}

module.exports = ejercicio4;