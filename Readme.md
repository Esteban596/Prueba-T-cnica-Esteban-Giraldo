# Prueba Técnica — Manejo de Datos con CSV

Solución completa para procesar, validar, limpiar y analizar datos de ventas desde múltiples archivos CSV.

## 📋 Requisitos

- **Node.js** v16+ ([descargar](https://nodejs.org))
- **npm** (incluido con Node.js)

## 🚀 Instalación

```bash
# Clonar o descargar el proyecto
cd "Prueba Tecnica"

# Instalar dependencias (aunque no hay dependencias externas)
npm install
```

## 📁 Estructura del Proyecto

```
Prueba Tecnica/
├── data/                    # Archivos CSV de entrada
│   ├── ventas.csv
│   ├── productos.csv
│   ├── sucursales.csv
│   └── ventas_sucias.csv
├── src/                     # Código JavaScript
│   ├── utils/
│   │   └── csvParser.js     # Funciones para leer/escribir CSV
│   ├── ejercicio1.js        # Validación básica
│   ├── ejercicio2.js        # Cruce de datos (JOIN)
│   ├── ejercicio3.js        # Resumen por sucursal
│   ├── ejercicio4.js        # Limpieza de datos
│   ├── ejercicio5.js        # Análisis avanzado
│   └── index.js             # Punto de entrada principal
├── output/                  # Archivos CSV generados
│   ├── reporte_ventas.csv
│   ├── resumen_sucursales.csv
│   └── ventas_limpias.csv
├── public/                  # Interfaz HTML (bonus)
│   └── index.html
├── package.json
└── README.md
```

## ▶️ Ejecución

### Paso 1: Generar los archivos CSV

Primero, ejecuta todos los ejercicios para generar los datos:

```bash
node src/index.js
```

Esto genera 3 archivos en la carpeta `output/`:
- `reporte_ventas.csv`
- `resumen_sucursales.csv`
- `ventas_limpias.csv`

Los resultados de los 5 ejercicios se muestran en la consola.

---

### Paso 2: Ejecutar un ejercicio específico (opcional)

```bash
node src/ejercicio1.js
node src/ejercicio2.js
# ... etc
```

---

### Paso 3: Abrir la interfaz web (Bonus +20 pts)

**⚠️ IMPORTANTE:** No abras el HTML con doble clic. Necesitas un servidor local.

#### Opción A: Usar CMD en Windows

Abre `Símbolo del sistema (cmd)` y ejecuta:

```bash
cd "Prueba Tecnica"
npx http-server
```

Luego abre en el navegador:
```
http://127.0.0.1:8080/public/index.html
```

#### Opción B: Usar Node.js

```bash
npx http-server
```

Luego abre en el navegador:
```
http://127.0.0.1:8080/public/index.html
```

---

**¿Por qué necesito un servidor?**
Los navegadores modernos bloquean la carga de archivos locales por seguridad (CORS). Un servidor local soluciona esto.

**¿Cómo detengo el servidor?**
Presiona `Ctrl + C` en la terminal.

## 📊 Descripción de Ejercicios

| # | Tarea | Entrada | Salida |
|---|-------|---------|--------|
| **1** | Validación básica: contar ventas, IDs inválidos, sucursales sin ventas | 3 CSVs | Console log |
| **2** | Cruce de datos (JOIN): combinar información de 3 fuentes | 3 CSVs | `reporte_ventas.csv` |
| **3** | Resumen por sucursal: facturación, unidades, producto top, ticket promedio | `reporte_ventas.csv` | `resumen_sucursales.csv` |
| **4** | Limpieza: normalizar IDs, unificar fechas, eliminar duplicados, limpiar valores negativos | `ventas_sucias.csv` | `ventas_limpias.csv` |
| **5** | Análisis: responder 5 preguntas de negocio (categoría top, día max/min, impacto de precios, etc.) | CSVs procesados | Console log |

## 🔧 Funciones Principales

### `csvParser.js`
- **`parseCSV(filePath)`** → Lee CSV, devuelve array de objetos
- **`writeCSV(data, filePath)`** → Escribe array a CSV

### Ejemplo de uso:
```javascript
const { parseCSV, writeCSV } = require('./utils/csvParser');

// Leer
const ventas = parseCSV('./data/ventas.csv');

// Procesar
const resultado = ventas.filter(v => v.cantidad > 2);

// Escribir
writeCSV(resultado, './output/resultado.csv');
```

## 📈 Resultados Esperados

### Ejercicio 1:
- Total de ventas: 23
- IDs de producto no válidos: P008
- Sucursales sin ventas: Oeste (San Juan), Patagonia (Neuquén)

### Ejercicio 2:
- Reporte generado: 22 ventas válidas
- Ventas excluidas: 1

### Ejercicio 3:
- Resumen de 5 sucursales con ventas
- Métricas: facturación, unidades, producto top, ticket promedio

### Ejercicio 4:
- Datos limpios: ~11 filas válidas
- Problemas encontrados: normalizaciones, duplicados, fechas, negativos

### Ejercicio 5:
- 5 respuestas a preguntas de negocio
- Categoría top, días extremos, cálculos de impacto, rankings por región/producto


## 📝 Notas Técnicas

- **Sin dependencias externas**: Solo módulos nativos de Node.js (`fs`, `path`)
- **Manejo de errores**: Try-catch en parseo de CSV, reportes de problemas en consola
- **Performance**: Uso de Sets y Maps para búsquedas O(1)
- **Formato de dinero**: Todos los montos redondeados a 2 decimales con `.toFixed(2)`

## ✅ Checklist de Entrega

- ✅ Código fuente organizado en `src/`
- ✅ Archivos CSV de salida en `output/`
- ✅ README con instrucciones (este archivo)
- ✅ `package.json` configurado
- ✅ Comentarios explicando decisiones importantes
- ✅ Opcional: `public/index.html` con interfaz web
- ✅ Opcional: Tests unitarios

## 🐛 Troubleshooting

**Error: "Cannot find module csvParser"**
→ Verifica que la ruta sea `./utils/csvParser` (con `./` al inicio)

**Error: "ENOENT: no such file or directory"**
→ Asegúrate de que los CSVs estén en `data/` y que exista la carpeta `output/`

**Resultados diferentes a lo esperado**
→ Verifica que los CSVs tengan el formato correcto (encabezados, separadores por coma)

## 👤 Autor

Esteban Giraldo Q.

---

**¿Preguntas?** Revisa el código comentado en `src/` o contacta al desarrollador.