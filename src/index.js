const { parseCSV, writeCSV } = require('./utils/csvParser');
const ejercicio1 = require('./ejercicio1');
const ejercicio2 = require('./ejercicio2');
const ejercicio3 = require('./ejercicio3');
const ejercicio4 = require('./ejercicio4');
const ejercicio5 = require('./ejercicio5');

console.log('🚀 Iniciando prueba técnica...\n');

// Ejercicio 1
console.log('📋 Ejercicio 1: Validación y análisis básico');
ejercicio1();
console.log('');

// Ejercicio 2
console.log('📋 Ejercicio 2: Cruce de datos');
ejercicio2();
console.log('');

// Ejercicio 3
console.log('📋 Ejercicio 3: Resumen por sucursal');
ejercicio3();
console.log('');

// Ejercicio 4
console.log('📋 Ejercicio 4: Limpieza de datos');
ejercicio4();
console.log('');

// Ejercicio 5
console.log('📋 Ejercicio 5: Análisis avanzado');
ejercicio5();
console.log('');

console.log('✅ Prueba técnica completada');