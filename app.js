// Elementos del DOM
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const spinner = submitBtn.querySelector('.spinner');
const messageDiv = document.getElementById('message');

// Event listener para el formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        empresa: document.getElementById('empresa').value.trim(),
        ciudad: document.getElementById('ciudad').value.trim(),
        comentarios: document.getElementById('comentarios').value.trim(),
        fecha: new Date().toLocaleString('es-ES', {
            timeZone: 'America/Bogota',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    };

    // Validación básica
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.ciudad) {
        showMessage('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Por favor, ingresa un correo electrónico válido.', 'error');
        return;
    }

    try {
        // Mostrar spinner y deshabilitar botón
        setLoading(true);
        hideMessage();

        // Enviar datos al servidor
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            showMessage('¡Formulario enviado exitosamente! Gracias por tu registro.', 'success');
            form.reset();
        } else {
            showMessage(result.error || 'Error al enviar el formulario. Por favor, intenta de nuevo.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error de conexión. Por favor, verifica tu conexión a internet e intenta de nuevo.', 'error');
    } finally {
        setLoading(false);
    }
});

// Función para mostrar/ocultar spinner
function setLoading(isLoading) {
    if (isLoading) {
        btnText.textContent = 'Enviando...';
        spinner.style.display = 'inline-block';
        submitBtn.disabled = true;
    } else {
        btnText.textContent = 'Enviar Formulario';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Función para mostrar mensajes
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';

    // Auto-ocultar mensaje de éxito después de 5 segundos
    if (type === 'success') {
        setTimeout(() => {
            hideMessage();
        }, 5000);
    }
}

// Función para ocultar mensajes
function hideMessage() {
    messageDiv.style.display = 'none';
    messageDiv.className = 'message';
}

// Validación en tiempo real para email
document.getElementById('email').addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
        this.style.borderColor = '#e74c3c';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});

// Limpiar borde rojo al escribir
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        this.style.borderColor = '#e0e0e0';
    });
});
