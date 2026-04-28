const { parseCSV, writeCSV } = require('./utils/csvParser');

function ejercicio2() {
  // Leer archivos
  const ventas = parseCSV('./data/ventas.csv');
  const productos = parseCSV('./data/productos.csv');
  const sucursales = parseCSV('./data/sucursales.csv');

  // Crear mapas para búsqueda rápida
  const productosMap = {};
  productos.forEach(p => {
    productosMap[p.id_producto] = p;
  });

  const sucursalesMap = {};
  sucursales.forEach(s => {
    sucursalesMap[s.id_sucursal] = s;
  });

  // Realizar JOIN y calcular total
  const reporteVentas = [];
  let ventasExcluidas = 0;
  const excluidos = new Set();

  ventas.forEach(venta => {
    const producto = productosMap[venta.id_producto];

    // Si el producto no existe, excluir la venta
    if (!producto) {
      ventasExcluidas++;
      excluidos.add(venta.id_producto)
      return;
    }

    const sucursal = sucursalesMap[venta.id_sucursal];

    const total = (parseInt(venta.cantidad) * parseFloat(producto.precio_unitario)).toFixed(2);

    reporteVentas.push({
      id_venta: venta.id_venta,
      nombre_producto: producto.nombre,
      nombre_sucursal: sucursal.nombre_sucursal,
      ciudad: sucursal.ciudad,
      region: sucursal.region,
      cantidad: venta.cantidad,
      precio_unitario: producto.precio_unitario,
      total: total,
      fecha: venta.fecha
    });
  });

  // Ordenar por fecha descendente
  reporteVentas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  // Escribir archivo
  writeCSV(reporteVentas, './output/reporte_ventas.csv');

  // Reporte en consola
  console.log(`✓ Reporte generado: ${reporteVentas.length} ventas válidas`);
  if (ventasExcluidas > 0) {
    console.log(`⚠ Ventas excluidas por producto no válido: ${ventasExcluidas} con ID: ${[...excluidos].join(", ")}`);
  }
}

module.exports = ejercicio2;
