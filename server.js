require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Configuración de Google Sheets
const SPREADSHEET_ID = '1VipkLQfBfirVC9MbBHAsMzDlD9rNsLiXOIAlKgwtDHA';
const SHEET_NAME = 'Hoja 1'; // Cambia esto si tu hoja tiene otro nombre

// Función para autenticar con Google Sheets
async function getGoogleSheetsClient() {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

        return sheets;
    } catch (error) {
        console.error('Error de autenticación:', error);
        throw new Error('Error de autenticación con Google Sheets');
    }
}

// Ruta para servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para recibir datos del formulario
app.post('/api/submit', async (req, res) => {
    try {
        const { nombre, email, telefono, empresa, ciudad, comentarios, fecha } = req.body;

        // Validación de campos requeridos
        if (!nombre || !email || !telefono || !ciudad) {
            return res.status(400).json({
                error: 'Faltan campos requeridos'
            });
        }

        // Obtener cliente de Google Sheets
        const sheets = await getGoogleSheetsClient();

        // Verificar si existe el encabezado, si no, crearlo
        try {
            const headerCheck = await sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A1:G1`,
            });

            if (!headerCheck.data.values || headerCheck.data.values.length === 0) {
                // Crear encabezados
                await sheets.spreadsheets.values.update({
                    spreadsheetId: SPREADSHEET_ID,
                    range: `${SHEET_NAME}!A1:G1`,
                    valueInputOption: 'RAW',
                    resource: {
                        values: [['Fecha', 'Nombre Completo', 'Correo Electrónico', 'Teléfono', 'Empresa/Organización', 'Ciudad', 'Comentarios']]
                    }
                });
            }
        } catch (error) {
            console.error('Error al verificar/crear encabezados:', error);
        }

        // Preparar datos para Google Sheets
        const values = [[
            fecha,
            nombre,
            email,
            telefono,
            empresa || '',
            ciudad,
            comentarios || ''
        ]];

        // Agregar fila a Google Sheets
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:G`,
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: values
            }
        });

        console.log('✓ Datos guardados en Google Sheets:', response.data);

        res.json({
            success: true,
            message: 'Datos guardados exitosamente',
            updatedRange: response.data.updates.updatedRange
        });

    } catch (error) {
        console.error('Error al procesar el formulario:', error);
        res.status(500).json({
            error: 'Error al guardar los datos. Por favor, intenta de nuevo.',
            details: error.message
        });
    }
});

// Endpoint de salud
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor iniciado en http://localhost:${PORT}`);
    console.log(`📋 Formulario disponible en http://localhost:${PORT}`);
    console.log(`📊 Google Sheet ID: ${SPREADSHEET_ID}`);
    console.log('\n⚠️  Asegúrate de tener configuradas las credenciales de Google en el archivo .env\n');
});
