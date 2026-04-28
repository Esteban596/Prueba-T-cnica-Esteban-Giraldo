const { parseCSV } = require('./utils/csvParser');

function ejercicio1() {
  // Leer archivos
  const ventas = parseCSV('./data/ventas.csv');
  const productos = parseCSV('./data/productos.csv');
  const sucursales = parseCSV('./data/sucursales.csv');

  // 1. Contar ventas totales
  const totalVentas = ventas.length;
  console.log(`Total de ventas: ${totalVentas}`);

  // 2. Detectar id_producto en ventas que no existen en productos
  const productosValidos = new Set(productos.map(p => p.id_producto));
  const productosInvalidos = new Set();

  ventas.forEach(venta => {
    if (!productosValidos.has(venta.id_producto)) {
      productosInvalidos.add(venta.id_producto);
    }
  });

  if (productosInvalidos.size > 0) {
    console.log(`IDs de producto no válidos encontrados: ${Array.from(productosInvalidos).join(', ')}`);
  } else {
    console.log('✓ Todos los IDs de producto son válidos');
  }

  // 3. Detectar sucursales sin ventas
  const sucursalesConVentas = new Set(ventas.map(v => v.id_sucursal));
  const sucursalesSinVentas = [];

  sucursales.forEach(sucursal => {
    if (!sucursalesConVentas.has(sucursal.id_sucursal)) {
      sucursalesSinVentas.push({
        id: sucursal.id_sucursal,
        nombre: sucursal.nombre_sucursal,
        ciudad: sucursal.ciudad
      });
    }
  });

  if (sucursalesSinVentas.length > 0) {
    console.log(`Sucursales sin ventas: ${sucursalesSinVentas.map(s => `${s.nombre} (${s.ciudad})`).join(', ')}`);
  } else {
    console.log('✓ Todas las sucursales tienen al menos una venta');
  }
}

module.exports = ejercicio1;