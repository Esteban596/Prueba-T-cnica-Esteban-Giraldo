const { parseCSV } = require('./utils/csvParser');

function ejercicio5() {
  // Leer archivos
  const reporteVentas = parseCSV('./output/reporte_ventas.csv');
  const productos = parseCSV('./data/productos.csv');

  console.log('📊 ANÁLISIS AVANZADO\n');

  // PREGUNTA 1: ¿Qué categoría de producto generó más ingresos en total?
  console.log('1️⃣ Categoría de producto con más ingresos:');
  
  // Crear mapa de producto -> categoría
  const categoriasPorProducto = {};
  productos.forEach(p => {
    categoriasPorProducto[p.nombre] = p.categoria;
  });

  // Agrupar ingresos por categoría
  const ingresosPorCategoria = {};
  reporteVentas.forEach(venta => {
    const categoria = categoriasPorProducto[venta.nombre_producto] || 'Desconocida';
    if (!ingresosPorCategoria[categoria]) {
      ingresosPorCategoria[categoria] = 0;
    }
    ingresosPorCategoria[categoria] += parseFloat(venta.total);
  });

  let categoriaTop = '';
  let ingresoTop = 0;
  Object.entries(ingresosPorCategoria).forEach(([cat, ingreso]) => {
    if (ingreso > ingresoTop) {
      ingresoTop = ingreso;
      categoriaTop = cat;
    }
  });

  console.log(`  ${categoriaTop}: $${ingresoTop.toFixed(2)}\n`);

  // PREGUNTA 2: ¿Cuál fue el día con mayor facturación? ¿Y el con menor?
  console.log('2️⃣ Día con mayor y menor facturación:');
  
  const facturacionPorDia = {};
  reporteVentas.forEach(venta => {
    if (!facturacionPorDia[venta.fecha]) {
      facturacionPorDia[venta.fecha] = 0;
    }
    facturacionPorDia[venta.fecha] += parseFloat(venta.total);
  });

  let diaMax = '';
  let montoMax = 0;
  let diaMin = '';
  let montoMin = Infinity;

  Object.entries(facturacionPorDia).forEach(([dia, monto]) => {
    if (monto > montoMax) {
      montoMax = monto;
      diaMax = dia;
    }
    if (monto < montoMin) {
      montoMin = monto;
      diaMin = dia;
    }
  });

  console.log(`  Mayor: ${diaMax} ($${montoMax.toFixed(2)})`);
  console.log(`  Menor: ${diaMin} ($${montoMin.toFixed(2)})\n`);

  // PREGUNTA 3: Si el precio de Tecnología subiera 10%, ¿cuánto cambiaría?
  console.log('3️⃣ Impacto si productos Tecnología suben 10%:');
  
  let ventasActualTecnologia = 0;
  let ventasConAumentoTecnologia = 0;

  reporteVentas.forEach(venta => {
    const categoria = categoriasPorProducto[venta.nombre_producto] || 'Desconocida';
    const total = parseFloat(venta.total);

    if (categoria === 'Tecnología') {
      ventasActualTecnologia += total;
      ventasConAumentoTecnologia += total * 1.10;
    }
  });

  const diferencia = ventasConAumentoTecnologia - ventasActualTecnologia;
  const porcentajeCambio = ((diferencia / ventasActualTecnologia) * 100).toFixed(2);

  console.log(`  Facturación actual (Tecnología): $${ventasActualTecnologia.toFixed(2)}`);
  console.log(`  Con 10% de aumento: $${ventasConAumentoTecnologia.toFixed(2)}`);
  console.log(`  Diferencia: +$${diferencia.toFixed(2)} (+${porcentajeCambio}%)\n`);

  // PREGUNTA 4: ¿Qué región concentra más ventas en unidades?
  console.log('4️⃣ Región con más ventas en unidades:');
  
  const unidadesPorRegion = {};
  reporteVentas.forEach(venta => {
    if (!unidadesPorRegion[venta.region]) {
      unidadesPorRegion[venta.region] = 0;
    }
    unidadesPorRegion[venta.region] += parseInt(venta.cantidad);
  });

  let regionMaxUnidades = '';
  let maxUnidades = 0;
  Object.entries(unidadesPorRegion).forEach(([region, unidades]) => {
    if (unidades > maxUnidades) {
      maxUnidades = unidades;
      regionMaxUnidades = region;
    }
  });

  console.log(`  ${regionMaxUnidades}: ${maxUnidades} unidades\n`);

  // PREGUNTA 5: ¿Cuál es el producto con mayor revenue? ¿Y el que menos vendió?
  console.log('5️⃣ Producto con mayor y menor revenue:');
  
  const revenuePorProducto = {};
  reporteVentas.forEach(venta => {
    if (!revenuePorProducto[venta.nombre_producto]) {
      revenuePorProducto[venta.nombre_producto] = 0;
    }
    revenuePorProducto[venta.nombre_producto] += parseFloat(venta.total);
  });

  let productoMaxRevenue = '';
  let revenueMax = 0;
  let productoMinRevenue = '';
  let revenueMin = Infinity;

  Object.entries(revenuePorProducto).forEach(([producto, revenue]) => {
    if (revenue > revenueMax) {
      revenueMax = revenue;
      productoMaxRevenue = producto;
    }
    if (revenue < revenueMin) {
      revenueMin = revenue;
      productoMinRevenue = producto;
    }
  });

  console.log(`  Mayor revenue: ${productoMaxRevenue} ($${revenueMax.toFixed(2)})`);
  console.log(`  Menor revenue: ${productoMinRevenue} ($${revenueMin.toFixed(2)})\n`);
}

module.exports = ejercicio5;