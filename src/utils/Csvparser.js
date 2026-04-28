const fs = require('fs');
const path = require('path');


function parseCSV(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.trim().split('\n');
    
    if (lines.length === 0) return [];
    
    // Primera línea = encabezados
    const headers = lines[0].split(',').map(h => h.trim());
    
    // Resto de líneas = datos
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const obj = {};
      
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      
      return obj;
    });
    
    return data;
  } catch (error) {
    console.error(`Error leyendo ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Escribe un array de objetos a un archivo CSV
 * @param {Array} data - Array de objetos
 * @param {string} filePath - Ruta de salida
 */
function writeCSV(data, filePath) {
  if (!Array.isArray(data) || data.length === 0) {
    console.error('No hay datos para escribir');
    return false;
  }
  
  try {
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header] || '';
          // Escapar comillas si existen
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');
    
    fs.writeFileSync(filePath, csv, 'utf-8');
    console.log(`✓ Archivo guardado: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error escribiendo ${filePath}:`, error.message);
    return false;
  }
}

module.exports = { parseCSV, writeCSV };