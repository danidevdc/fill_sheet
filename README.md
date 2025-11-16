# 📋 Aplicación Web de Formulario con Google Sheets

Aplicación web responsive para capturar datos mediante un formulario y guardarlos automáticamente en Google Sheets.

## 🌟 Características

- ✅ Diseño 100% responsive (móvil, tablet, desktop)
- ✅ Formulario con validación en tiempo real
- ✅ Integración directa con Google Sheets
- ✅ Interfaz moderna y atractiva
- ✅ Campos en español
- ✅ Feedback visual al usuario

## 📋 Campos del Formulario

1. **Nombre Completo** (requerido)
2. **Correo Electrónico** (requerido)
3. **Teléfono** (requerido)
4. **Empresa/Organización** (opcional)
5. **Ciudad** (requerido)
6. **Comentarios** (opcional)
7. **Fecha** (se agrega automáticamente)

## 🚀 Instalación y Configuración

### Paso 1: Instalar dependencias

```bash
npm install
```

### Paso 2: Configurar Google Sheets API

#### 2.1 Crear un proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Dale un nombre como "Formulario Sheets"

#### 2.2 Habilitar Google Sheets API

1. En el menú lateral, ve a **APIs y servicios** > **Biblioteca**
2. Busca "Google Sheets API"
3. Haz clic en **Habilitar**

#### 2.3 Crear una cuenta de servicio

1. Ve a **APIs y servicios** > **Credenciales**
2. Haz clic en **Crear credenciales** > **Cuenta de servicio**
3. Completa los detalles:
   - Nombre: `formulario-sheets-service`
   - Descripción: `Servicio para guardar datos del formulario`
4. Haz clic en **Crear y continuar**
5. Asigna el rol **Editor** (o un rol personalizado con permisos de Sheets)
6. Haz clic en **Continuar** y luego **Listo**

#### 2.4 Generar clave JSON

1. En la lista de cuentas de servicio, haz clic en la cuenta que acabas de crear
2. Ve a la pestaña **Claves**
3. Haz clic en **Agregar clave** > **Crear clave nueva**
4. Selecciona **JSON** y haz clic en **Crear**
5. Se descargará un archivo JSON con las credenciales (guárdalo de forma segura)

#### 2.5 Compartir tu Google Sheet

1. Abre el archivo JSON descargado y copia el valor de `client_email` (algo como `nombre@proyecto.iam.gserviceaccount.com`)
2. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/1VipkLQfBfirVC9MbBHAsMzDlD9rNsLiXOIAlKgwtDHA/edit
3. Haz clic en **Compartir** (botón verde en la esquina superior derecha)
4. Pega el email de la cuenta de servicio
5. Asegúrate de darle permisos de **Editor**
6. Haz clic en **Enviar**

### Paso 3: Configurar variables de entorno

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Abre el archivo `.env` y configura las credenciales:
   - Abre el archivo JSON de credenciales que descargaste
   - Copia TODO el contenido del archivo JSON
   - Pégalo en una sola línea en la variable `GOOGLE_CREDENTIALS` del archivo `.env`

Ejemplo:
```env
PORT=3000
GOOGLE_CREDENTIALS={"type":"service_account","project_id":"tu-proyecto-123456",...}
```

**Importante:** El JSON debe estar en una sola línea, sin saltos de línea.

### Paso 4: Verificar el nombre de la hoja

Por defecto, el código busca una hoja llamada **"Hoja 1"**. Si tu hoja de Google Sheets tiene otro nombre:

1. Abre `server.js`
2. Busca la línea:
```javascript
const SHEET_NAME = 'Hoja 1';
```
3. Cámbiala por el nombre real de tu hoja, por ejemplo:
```javascript
const SHEET_NAME = 'Registros';
```

## ▶️ Ejecución

### Modo desarrollo (con auto-reload)
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

La aplicación estará disponible en: **http://localhost:3000**

## 📊 Estructura de Google Sheets

Al recibir el primer formulario, se crearán automáticamente los siguientes encabezados en tu hoja:

| Fecha | Nombre Completo | Correo Electrónico | Teléfono | Empresa/Organización | Ciudad | Comentarios |
|-------|----------------|-------------------|----------|---------------------|--------|-------------|

## 🎨 Personalización

### Cambiar colores del tema

Edita el archivo `styles.css` y modifica el gradiente en:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.submit-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Agregar más campos

1. **En `index.html`:** Agrega el campo en el formulario
2. **En `app.js`:** Agrega el campo al objeto `formData`
3. **En `server.js`:**
   - Actualiza los encabezados en el array de headers
   - Agrega el campo al array `values`

## 🔒 Seguridad

- ⚠️ **NUNCA** subas el archivo `.env` a GitHub
- ⚠️ **NUNCA** compartas las credenciales JSON públicamente
- ✅ El archivo `.gitignore` ya está configurado para proteger archivos sensibles

## 🐛 Solución de Problemas

### Error: "Error de autenticación con Google Sheets"

- Verifica que las credenciales en `.env` estén correctamente formateadas (JSON en una línea)
- Asegúrate de haber compartido la hoja con el email de la cuenta de servicio
- Verifica que Google Sheets API esté habilitada en tu proyecto

### Error: "Cannot find module 'express'"

Ejecuta:
```bash
npm install
```

### Los datos no se guardan en la hoja

- Verifica el nombre de la hoja en `server.js` (variable `SHEET_NAME`)
- Asegúrate de que la cuenta de servicio tenga permisos de **Editor**
- Revisa los logs del servidor para ver mensajes de error

## 📱 Capturas de Pantalla

### Vista Desktop
![Desktop](https://via.placeholder.com/800x600?text=Vista+Desktop)

### Vista Móvil
![Móvil](https://via.placeholder.com/375x667?text=Vista+Móvil)

## 📄 Licencia

MIT

## 👨‍💻 Soporte

Si tienes problemas con la configuración, verifica:

1. Que todas las dependencias estén instaladas
2. Que el archivo `.env` esté configurado correctamente
3. Que la hoja de Google Sheets esté compartida con la cuenta de servicio
4. Que Google Sheets API esté habilitada

---

¡Listo! Tu aplicación de formularios con Google Sheets está configurada. 🎉
