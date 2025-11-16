# 🚀 Guía de Despliegue en GitHub Pages

Esta guía te ayudará a desplegar tu formulario en GitHub Pages de forma gratuita.

## 📋 Requisitos Previos

- Tener una cuenta de GitHub
- Tu Google Sheet debe estar creado
- Acceso a Google Apps Script

---

## Paso 1: Configurar Google Apps Script 📝

### 1.1 Abrir el Editor de Scripts

1. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/1VipkLQfBfirVC9MbBHAsMzDlD9rNsLiXOIAlKgwtDHA/edit
2. Ve a **Extensiones** > **Apps Script**

### 1.2 Copiar el Código

1. En el editor que se abre, verás un archivo `Code.gs`
2. **Borra todo el código** que viene por defecto
3. Abre el archivo `google-apps-script.js` de este proyecto
4. **Copia todo el contenido** del archivo
5. **Pégalo** en el editor de Apps Script

### 1.3 Guardar el Proyecto

1. Haz clic en el icono del **disco** 💾 o presiona `Ctrl+S` / `Cmd+S`
2. Dale un nombre al proyecto, por ejemplo: "API Formulario"

### 1.4 Implementar como Aplicación Web

1. Haz clic en **Implementar** (botón azul arriba a la derecha) > **Nueva implementación**
2. Haz clic en el ícono de ⚙️ junto a "Seleccionar tipo"
3. Selecciona **Aplicación web**
4. Configura los siguientes valores:
   - **Descripción**: "API Formulario" (o cualquier nombre)
   - **Ejecutar como**: Selecciona **Yo** (tu email)
   - **Quién tiene acceso**: Selecciona **Cualquier usuario**
5. Haz clic en **Implementar**
6. **Autoriza la aplicación** (puede pedir que revises los permisos)
   - Si aparece "Google no ha verificado esta app", haz clic en "Avanzado" y luego "Ir a [nombre del proyecto] (no seguro)"
   - Haz clic en **Permitir**

### 1.5 Copiar la URL

1. Después de implementar, verás un mensaje de éxito
2. **Copia la URL de la aplicación web** (se verá algo así: `https://script.google.com/macros/s/AKfycby.../exec`)
3. **Guarda esta URL** - la necesitarás en el siguiente paso

---

## Paso 2: Configurar el Frontend 🎨

### 2.1 Editar config.js

1. Abre el archivo `config.js` en tu editor
2. Reemplaza `TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI` con la URL que copiaste:

```javascript
const CONFIG = {
    APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycby.../exec'
};
```

3. Guarda el archivo

### 2.2 Hacer Commit y Push

```bash
git add config.js
git commit -m "Configurar URL de Google Apps Script"
git push origin main
```

---

## Paso 3: Activar GitHub Pages 🌐

### 3.1 Ir a la Configuración del Repositorio

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)

### 3.2 Configurar Pages

1. En el menú lateral izquierdo, busca **Pages** (en la sección "Code and automation")
2. En **Source** (Fuente), selecciona:
   - **Branch**: `main` (o la rama donde pusheaste los archivos)
   - **Folder**: `/ (root)`
3. Haz clic en **Save** (Guardar)

### 3.3 Esperar el Despliegue

1. GitHub comenzará a construir tu sitio
2. Espera 1-2 minutos
3. Actualiza la página
4. Verás un mensaje: "Your site is live at https://[tu-usuario].github.io/[tu-repositorio]/"

---

## Paso 4: Probar la Aplicación ✅

### 4.1 Abrir el Sitio

1. Haz clic en el enlace proporcionado: `https://[tu-usuario].github.io/[tu-repositorio]/`
2. Deberías ver tu formulario

### 4.2 Probar el Formulario

1. Llena todos los campos requeridos
2. Haz clic en **Enviar Formulario**
3. Deberías ver el mensaje: "¡Formulario enviado exitosamente!"

### 4.3 Verificar en Google Sheets

1. Abre tu Google Sheet
2. Deberías ver una nueva fila con los datos que enviaste
3. Si es la primera vez, también verás los encabezados creados automáticamente

---

## 🎉 ¡Listo!

Tu formulario ahora está en vivo en:
**https://[tu-usuario].github.io/[tu-repositorio]/**

Puedes compartir este enlace con cualquier persona para que llene el formulario.

---

## 🔧 Solución de Problemas

### El formulario muestra "URL no está configurada"

- Verifica que hayas editado `config.js` correctamente
- Asegúrate de haber hecho commit y push de los cambios
- Espera 1-2 minutos para que GitHub Pages se actualice

### Los datos no llegan a Google Sheets

1. Verifica que la URL de Apps Script sea correcta
2. Asegúrate de haber implementado el script como "Aplicación web"
3. Verifica que el acceso sea "Cualquier usuario"
4. En Google Sheets, ve a **Extensiones > Apps Script** y revisa los logs:
   - Haz clic en **Ejecuciones** en el menú lateral
   - Busca errores en las ejecuciones recientes

### Error: "Google no ha verificado esta app"

- Esto es normal para scripts personales
- Haz clic en **Avanzado**
- Haz clic en **Ir a [nombre del proyecto] (no seguro)**
- Haz clic en **Permitir**

### GitHub Pages no se activa

- Asegúrate de que el repositorio sea público (o tengas GitHub Pro para repositorios privados)
- Verifica que los archivos estén en la rama correcta
- Espera 1-2 minutos y actualiza la página

---

## 🔄 Actualizar la Aplicación

Cada vez que hagas cambios en los archivos:

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

GitHub Pages se actualizará automáticamente en 1-2 minutos.

---

## 🔒 Seguridad

- La URL de Google Apps Script es pública, pero está bien - solo permite **agregar** datos a tu hoja
- Nadie puede leer o eliminar datos de tu hoja a través de esta URL
- Solo tú tienes acceso completo a la Google Sheet

---

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en Google Apps Script (Extensiones > Apps Script > Ejecuciones)
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que todos los pasos se hayan completado correctamente
