<script setup>
import { ref } from 'vue'
const props = defineProps({
    backgroundColor: {
        type: String,
        default: '#ffffff'
    }
})


// Estado del formulario (Composition API)
const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
})

// Estado de la petición (UX)
const status = ref({
    submitting: false,
    success: null,
    error: null
})

// Envío del formulario al backend
const handleSubmit = async () => {
    status.value.submitting = true
    status.value.success = null
    status.value.error = null

    try {
        // Apunta al endpoint de tu backend (ej. /api/contact)
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData.value),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Algo salió mal. Inténtalo de nuevo.')
        }

        // Feedback positivo y limpiar formulario
        status.value.success = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.'
        formData.value = { firstName: '', lastName: '', email: '', message: '' }

    } catch (err) {
        status.value.error = err.message
    } finally {
        status.value.submitting = false
    }
}
</script>

<template>
    <!-- Contenedor principal con ancho y borde forzado -->
    <div class="contact-card">
        <div class="contact-card-background-image">
            <div class="titleAndSubtitleContainer">
                <h2 class="form-title">Contact Us</h2>
                <p class="form-subtitle">We will get back to you shortly!.</p>
            </div>
            <div class="fields">
                <form @submit.prevent="handleSubmit" class="contact-form">
                    <!-- Fila para Nombre y Apellido -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">First Name</label>
                            <input v-model.trim="formData.firstName" type="text" id="firstName" required
                                placeholder="John" />
                        </div>

                        <div class="form-group">
                            <label for="lastName">Last Name</label>
                            <input v-model.trim="formData.lastName" type="text" id="lastName" required
                                placeholder="Doe" />
                        </div>
                    </div>

                    <!-- Campo Email -->
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model.trim="formData.email" type="email" id="email" required
                            placeholder="your@email.com" />
                    </div>

                    <!-- Campo Mensaje -->
                    <div class="form-group">
                        <label for="message">Leave us a note, we’re all ears.</label>
                        <textarea v-model="formData.message" id="message" rows="2" required
                            placeholder="Type your message here..."></textarea>
                    </div>

                    <!-- Botón de Enviar (Grande) -->
                    <button type="submit" :disabled="status.submitting" class="submit-btn">
                        {{ status.submitting ? 'Sending Message...' : 'Send Message' }}
                    </button>
                </form>
            </div>
            <!-- Mensajes de Feedback visual -->
            <transition name="fade">
                <p v-if="status.success" class="msg-success">{{ status.success }}</p>
            </transition>
            <transition name="fade">
                <p v-if="status.error" class="msg-error">{{ status.error }}</p>
            </transition>
        </div>
    </div>

</template>

<style scoped>
/* 
  Estilos Modernos y Visibles 
  He forzado colores oscuros para el texto y tamaños grandes.
*/

.contact-card {
    display: flex;
    width: 100%;
    height: 26.3125rem;
    /* Ocupa todo el ancho disponible hasta el máximo */
    margin: 20px auto;
    /* Centrado */
    /* Mucho espacio interno */
    background-color: v-bind('props.backgroundColor');
    /* Fondo blanco forzado */
    border-radius: 12px;
    border: 1px solid #e0e0e0;
    /* Borde suave para definir la forma */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    /* Sombra elegante */
    box-sizing: border-box;
    align-items: center;
}

.contact-card-background-image {
    display: flex;
    width: 100%;
    padding: 40px;
    background-image: url("/backgrounds/contact-form-background-pink.svg");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;

    align-items: center;

}

.form-title {
    flex-direction: column;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 2rem;
    color: var(--background-color-main);
    /* Texto casi negro */
    font-weight: 700;
    text-align: center;
    font-family: var(--font-family-Decorative);
}

.form-subtitle {
    margin-bottom: 30px;
    font-size: 1rem;
    color: var(--background-color-main);
    /* Gris oscuro */
    text-align: center;
    font-family: var(--font-family-Decorative);
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* Espacio entre campos */


}

.form-row {
    display: flex;
    gap: 1rem;
}



/* En móviles, la fila se vuelve columna */
@media (max-width: 600px) {
    .form-row {
        flex-direction: column;
        gap: 20px;
    }
}

.form-group {
    display: flex;
    flex-direction: column;
    flex: 1;
}

label {
    margin-bottom: 8px;
    font-weight: 600;
    color: #333333;
    /* Texto visible */
    font-size: 0.95rem;
}

input,
textarea {
    padding: 0.5rem;
    /* Campos más altos */
    border: 2px solid #e0e0e0;
    /* Borde más grueso */
    /* border-radius: 8px; */
    width: 100%;
    font-size: 0.85rem;
    color: #1a1a1a;
    /* Texto dentro del input visible */
    background-color: #ffffff;
    /* transition: border-color 0.2s, box-shadow 0.2s; */
    box-sizing: border-box;
    /* Importante para el ancho */
}

input:focus,
textarea:focus {
    outline: none;
    border-color: var(--primary-color-main);
    /* Color de foco azul */
    box-shadow: 0 0 0 4px rgba(0, 112, 243, 0.1);

}

textarea {
    resize: vertical;
    min-height: 5rem;
    resize: none;

}

/* Botón grande y llamativo */
.submit-btn {
    padding: 0.5rem;
    margin-top: 10px;
    background-color: var(--background-color-cards-main);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.1rem;
    transition: background-color 0.2s, transform 0.1s;
}

.submit-btn:hover {
    background-color: #0060d9;
}

.submit-btn:active {
    transform: translateY(1px);
}

.submit-btn:disabled {
    background-color: #a0cfff;
    cursor: not-allowed;
    transform: none;
}

/* Estilos para mensajes de feedback */
.msg-success,
.msg-error {
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    font-weight: 600;
    text-align: center;
    font-size: 1rem;
}

.msg-success {
    background-color: #e6fffa;
    color: #008767;
    border: 1px solid #c3e6cb;
}

.msg-error {
    background-color: #fff5f5;
    color: #e53e3e;
    border: 1px solid #feb2b2;
}

/* Animación simple de aparición */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.titleAndSubtitleContainer {
    width: 50%;
}

.fields {}
</style>