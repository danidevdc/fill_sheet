/**
 * Google Apps Script para recibir datos del formulario
 * y guardarlos en Google Sheets
 *
 * INSTRUCCIONES:
 * 1. Abre tu Google Sheet
 * 2. Ve a Extensiones > Apps Script
 * 3. Borra todo el código por defecto
 * 4. Copia y pega este código completo
 * 5. Haz clic en "Implementar" > "Nueva implementación"
 * 6. Selecciona tipo "Aplicación web"
 * 7. Configura:
 *    - Descripción: "API Formulario"
 *    - Ejecutar como: "Yo"
 *    - Quién tiene acceso: "Cualquier usuario"
 * 8. Haz clic en "Implementar"
 * 9. Copia la URL de la aplicación web
 * 10. Pega esa URL en el archivo config.js
 */

// Nombre de la hoja donde se guardarán los datos
const SHEET_NAME = 'Hoja 1'; // Cambia esto si tu hoja tiene otro nombre

/**
 * Función que maneja las peticiones POST
 */
function doPost(e) {
  try {
    // Configurar CORS para permitir peticiones desde GitHub Pages
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);

    // Parsear los datos recibidos
    const data = JSON.parse(e.postData.contents);

    // Validar campos requeridos
    if (!data.nombre || !data.email || !data.telefono || !data.ciudad) {
      return output.setContent(JSON.stringify({
        success: false,
        error: 'Faltan campos requeridos'
      }));
    }

    // Obtener la hoja de cálculo activa
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Si la hoja no existe, crearla
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Verificar si existen encabezados, si no, crearlos
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      const headers = [
        'Fecha',
        'Nombre Completo',
        'Correo Electrónico',
        'Teléfono',
        'Empresa/Organización',
        'Ciudad',
        'Comentarios'
      ];
      sheet.appendRow(headers);

      // Dar formato a los encabezados
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
    }

    // Preparar la fila de datos
    const row = [
      data.fecha || new Date().toLocaleString('es-ES', { timeZone: 'America/Bogota' }),
      data.nombre || '',
      data.email || '',
      data.telefono || '',
      data.empresa || '',
      data.ciudad || '',
      data.comentarios || ''
    ];

    // Agregar la fila a la hoja
    sheet.appendRow(row);

    // Ajustar el ancho de las columnas automáticamente
    sheet.autoResizeColumns(1, 7);

    // Respuesta exitosa
    return output.setContent(JSON.stringify({
      success: true,
      message: 'Datos guardados exitosamente',
      row: sheet.getLastRow()
    }));

  } catch (error) {
    // Manejo de errores
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);

    return output.setContent(JSON.stringify({
      success: false,
      error: 'Error al procesar la petición: ' + error.message
    }));
  }
}

/**
 * Función que maneja las peticiones GET (para verificar que el script funciona)
 */
function doGet(e) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  return output.setContent(JSON.stringify({
    status: 'ok',
    message: 'API de formulario funcionando correctamente',
    timestamp: new Date().toISOString()
  }));
}
