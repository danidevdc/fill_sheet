# 📋 Aplicación Web de Formulario con Google Sheets

Aplicación web responsive para capturar datos mediante un formulario y guardarlos automáticamente en Google Sheets.

## 🌟 Características

- ✅ Diseño 100% responsive (móvil, tablet, desktop)
- ✅ Formulario con validación en tiempo real
- ✅ Integración directa con Google Sheets
- ✅ Interfaz moderna y atractiva
- ✅ Campos en español
- ✅ Feedback visual al usuario
- ✅ Despliegue gratuito en GitHub Pages

## 📋 Campos del Formulario

1. **Nombre Completo** (requerido)
2. **Correo Electrónico** (requerido)
3. **Teléfono** (requerido)
4. **Empresa/Organización** (opcional)
5. **Ciudad** (requerido)
6. **Comentarios** (opcional)
7. **Fecha** (se agrega automáticamente)

---

## 🚀 Opciones de Despliegue

Esta aplicación puede desplegarse de dos formas:

### ⭐ Opción 1: GitHub Pages (RECOMENDADO - Gratis)

Despliegue completamente gratuito usando GitHub Pages y Google Apps Script.

**👉 [Ver guía completa de despliegue en GitHub Pages](DEPLOYMENT.md)**

**Ventajas:**
- ✅ Completamente gratis
- ✅ No necesitas servidor
- ✅ Fácil de configurar
- ✅ URL pública para compartir
- ✅ Actualización automática con git push

**Resumen rápido:**
1. Configurar Google Apps Script (copiar código del archivo `google-apps-script.js`)
2. Editar `config.js` con tu URL de Apps Script
3. Activar GitHub Pages en la configuración del repositorio
4. ¡Listo! Tu formulario estará en `https://[tu-usuario].github.io/[tu-repo]/`

---

### Opción 2: Servidor Local con Node.js

Para desarrollo local o si prefieres usar tu propio servidor.

<details>
<summary>Clic para ver instrucciones de despliegue local</summary>

#### Requisitos
- Node.js instalado
- Cuenta de Google Cloud con Google Sheets API habilitada

#### Instalación

```bash
npm install
```

#### Configuración de Google Sheets API

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita **Google Sheets API**
4. Crea una **cuenta de servicio** con rol de Editor
5. Descarga el archivo JSON de credenciales
6. Comparte tu Google Sheet con el email de la cuenta de servicio

#### Variables de Entorno

```bash
cp .env.example .env
```

Edita `.env` y pega las credenciales JSON en una sola línea:
```env
GOOGLE_CREDENTIALS={"type":"service_account","project_id":"..."}
```

#### Ejecución

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

La aplicación estará en: **http://localhost:3000**

</details>

---

## 📂 Estructura del Proyecto

```
fill_sheet/
├── index.html              # Formulario HTML
├── styles.css              # Estilos responsive
├── app.js                  # Lógica del frontend
├── config.js               # Configuración (URL de Apps Script)
├── google-apps-script.js   # Código para Google Apps Script
├── server.js               # Servidor Node.js (opcional)
├── package.json            # Dependencias Node.js
├── .env.example            # Plantilla de variables de entorno
├── .gitignore              # Archivos ignorados por Git
├── README.md               # Este archivo
└── DEPLOYMENT.md           # Guía de despliegue en GitHub Pages
```

---

## 📊 Cómo Funciona

### Con GitHub Pages (Opción 1)

```
Usuario llena formulario
        ↓
JavaScript envía datos
        ↓
Google Apps Script recibe datos
        ↓
Se guardan en Google Sheets
```

### Con Node.js (Opción 2)

```
Usuario llena formulario
        ↓
JavaScript envía datos al servidor
        ↓
Servidor Node.js procesa datos
        ↓
Google Sheets API guarda datos
        ↓
Se guardan en Google Sheets
```

---

## 🎨 Personalización

### Cambiar Colores

Edita `styles.css` y modifica los gradientes:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.submit-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Agregar Más Campos

1. **En `index.html`:** Agrega el campo HTML
2. **En `app.js`:** Agrega el campo al objeto `formData`
3. **En `google-apps-script.js`:** Actualiza los encabezados y la fila de datos

### Cambiar el Nombre de la Hoja

En `google-apps-script.js`, edita:
```javascript
const SHEET_NAME = 'Hoja 1'; // Cambia esto por tu nombre de hoja
```

---

## 🔧 Solución de Problemas

### Error: "URL no está configurada"

- Edita `config.js` con tu URL de Google Apps Script
- Asegúrate de hacer commit y push de los cambios
- Si usas GitHub Pages, espera 1-2 minutos para que se actualice

### Los datos no llegan a Google Sheets

1. Verifica que la URL de Apps Script sea correcta
2. Asegúrate de haber implementado el script como "Aplicación web"
3. Verifica que el acceso sea "Cualquier usuario"
4. Revisa los logs en Google Apps Script (Extensiones > Apps Script > Ejecuciones)

### GitHub Pages no funciona

- Verifica que el repositorio sea público
- Espera 1-2 minutos después de activar Pages
- Asegúrate de estar en la rama correcta

---

## 🔒 Seguridad

- ⚠️ **NUNCA** subas el archivo `.env` a GitHub (solo para opción Node.js)
- ⚠️ **NUNCA** compartas credenciales JSON públicamente
- ✅ La URL de Google Apps Script es pública, pero solo permite agregar datos
- ✅ Nadie puede leer o eliminar datos de tu hoja a través de la URL

---

## 📱 Capturas de Pantalla

La aplicación es completamente responsive:

- **Desktop:** Formulario centrado con buen espaciado
- **Tablet:** Se adapta al ancho de pantalla
- **Móvil:** Optimizado para pantallas pequeñas

---

## 🔄 Actualizar la Aplicación

Para actualizar tu formulario en GitHub Pages:

```bash
# Haz tus cambios en los archivos
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

GitHub Pages se actualizará automáticamente en 1-2 minutos.

---

## 📄 Licencia

MIT

---

## 🎯 Próximos Pasos

1. **Para despliegue en GitHub Pages:** Lee [DEPLOYMENT.md](DEPLOYMENT.md)
2. **Personaliza** los colores y campos según tus necesidades
3. **Comparte** la URL de tu formulario

---

¡Listo! Tu aplicación de formularios con Google Sheets está configurada. 🎉

**URL del Google Sheet:** https://docs.google.com/spreadsheets/d/1VipkLQfBfirVC9MbBHAsMzDlD9rNsLiXOIAlKgwtDHA/edit
