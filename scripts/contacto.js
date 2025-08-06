// scripts/contacto.js

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-button');
    const nameInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('mensaje');
    const nameError = document.getElementById('nombre-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('mensaje-error');

    // Función para mostrar el modal
    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'flex'; // Usamos flex para centrar
    }

    // Función para ocultar el modal
    function hideModal() {
        modal.style.display = 'none';
    }

    // Event listener para cerrar el modal
    closeButton.addEventListener('click', hideModal);
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            hideModal();
        }
    });

    // Función de validación de email
    function isValidEmail(email) {
        // Regex simple para validar email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Función para validar un campo específico
    function validateField(inputElement, errorElement, errorMessage) {
        let isValid = true;
        if (inputElement.value.trim() === '') {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            inputElement.parentElement.classList.add('error');
            isValid = false;
        } else if (inputElement.id === 'email' && !isValidEmail(inputElement.value)) {
            errorElement.textContent = 'Por favor, ingresa un email válido.';
            errorElement.style.display = 'block';
            inputElement.parentElement.classList.add('error');
            isValid = false;
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            inputElement.parentElement.classList.remove('error');
        }
        return isValid;
    }

    // Event listeners para validación en tiempo real (al escribir/salir del campo)
    nameInput.addEventListener('input', () => validateField(nameInput, nameError, 'El nombre es obligatorio.'));
    emailInput.addEventListener('input', () => validateField(emailInput, emailError, 'El email es obligatorio.'));
    messageInput.addEventListener('input', () => validateField(messageInput, messageError, 'El mensaje es obligatorio.'));

    nameInput.addEventListener('blur', () => validateField(nameInput, nameError, 'El nombre es obligatorio.'));
    emailInput.addEventListener('blur', () => validateField(emailInput, emailError, 'El email es obligatorio.'));
    messageInput.addEventListener('blur', () => validateField(messageInput, messageError, 'El mensaje es obligatorio.'));


    // Manejo del envío del formulario
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Previene el envío por defecto del formulario

        // Validar todos los campos al intentar enviar
        const isNameValid = validateField(nameInput, nameError, 'El nombre es obligatorio.');
        const isEmailValid = validateField(emailInput, emailError, 'El email es obligatorio.');
        const isMessageValid = validateField(messageInput, messageError, 'El mensaje es obligatorio.');

        // Si algún campo no es válido, detiene el envío y muestra un modal de error general
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            showModal('Por favor, completa todos los campos obligatorios y asegúrate de que sean válidos.');
            return; // Detiene la ejecución
        }

        // Si todos los campos son válidos, procede con el envío a Formspree
        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showModal('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                form.reset(); // Limpia el formulario
                // Opcional: Ocultar los mensajes de error si se habían mostrado
                nameError.textContent = '';
                emailError.textContent = '';
                messageError.textContent = '';
                nameInput.parentElement.classList.remove('error');
                emailInput.parentElement.classList.remove('error');
                messageInput.parentElement.classList.remove('error');

            } else {
                const data = await response.json();
                if (data.errors) {
                    let errorMessage = 'Hubo un error al enviar el mensaje:';
                    data.errors.forEach(error => {
                        errorMessage += `\n- ${error.message}`;
                    });
                    showModal(errorMessage);
                } else {
                    showModal('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.');
                }
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            showModal('Parece que hay un problema de conexión. Por favor, verifica tu internet o inténtalo más tarde.');
        }
    });
});

// Seleccionamos el botón y el menú hamburguesa por sus IDs
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const navMenu = document.getElementById('nav-menu');

        // Añadimos un "escuchador" para el evento 'click' en el botón
        hamburgerBtn.addEventListener('click', () => {
            // Cada vez que se hace clic, alterna la clase 'menu-open'
            // tanto en el botón (para la animación a 'X') como en el menú (para mostrarlo/ocultarlo)
            hamburgerBtn.classList.toggle('menu-open');
            navMenu.classList.toggle('menu-open');
        });
        // --- FIN DEL CÓDIGO JAVASCRIPT ---