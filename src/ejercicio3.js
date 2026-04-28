const { parseCSV, writeCSV } = require('./utils/csvParser');

function ejercicio3() {
  // Leer reporte del ejercicio 2
  const reporteVentas = parseCSV('./output/reporte_ventas.csv');

  // Agrupar por sucursal
  const resumenPorSucursal = {};

  reporteVentas.forEach(venta => {
    const sucursal = venta.nombre_sucursal;

    if (!resumenPorSucursal[sucursal]) {
      resumenPorSucursal[sucursal] = {
        nombre_sucursal: sucursal,
        total_facturado: 0,
        total_unidades: 0,
        productos_vendidos: {}, // { nombre_producto: cantidad }
        cantidad_ventas: 0
      };
    }

    // Acumular datos
    resumenPorSucursal[sucursal].total_facturado += parseFloat(venta.total);
    resumenPorSucursal[sucursal].total_unidades += parseInt(venta.cantidad);
    resumenPorSucursal[sucursal].cantidad_ventas += 1;

    // Contar productos vendidos
    const producto = venta.nombre_producto;
    resumenPorSucursal[sucursal].productos_vendidos[producto] = 
      (resumenPorSucursal[sucursal].productos_vendidos[producto] || 0) + parseInt(venta.cantidad);
  });

  // Convertir a array y calcular métricas finales
  const resumen = Object.values(resumenPorSucursal).map(sucursal => {
    // Encontrar producto más vendido
    let productoMasVendido = '';
    let maxUnidades = 0;

    Object.entries(sucursal.productos_vendidos).forEach(([producto, cantidad]) => {
      if (cantidad > maxUnidades) {
        maxUnidades = cantidad;
        productoMasVendido = producto;
      }
    });

    // Calcular ticket promedio
    const ticketPromedio = (sucursal.total_facturado / sucursal.cantidad_ventas).toFixed(2);

    return {
      nombre_sucursal: sucursal.nombre_sucursal,
      total_facturado: sucursal.total_facturado.toFixed(2),
      total_unidades: sucursal.total_unidades,
      producto_mas_vendido: productoMasVendido,
      ticket_promedio: ticketPromedio
    };
  });

  // Escribir archivo
  writeCSV(resumen, './output/resumen_sucursales.csv');

  // Reporte en consola
  console.log(`✓ Resumen generado: ${resumen.length} sucursales con ventas`);
  resumen.forEach(r => {
    console.log(`  ${r.nombre_sucursal}: $${r.total_facturado} (${r.total_unidades} unidades)`);
  });
}

module.exports = ejercicio3;