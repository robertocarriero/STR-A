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