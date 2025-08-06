 // JavaScript para los carruseles de imágenes
        const slideIndexes = {
            slider1: 0,
            slider2: 0,
            slider3: 0,
            slider4: 0
        };

        function showSlides(sliderId) {
            let i;
            const slider = document.getElementById(sliderId);
            const slides = slider.getElementsByClassName("slides")[0].getElementsByTagName("img");
            
            if (slideIndexes[sliderId] >= slides.length) { slideIndexes[sliderId] = 0; }
            if (slideIndexes[sliderId] < 0) { slideIndexes[sliderId] = slides.length - 1; }
            
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndexes[sliderId]].style.display = "block";
        }

        function plusSlides(n, sliderId, direction) {
            slideIndexes[sliderId] += direction;
            showSlides(sliderId);
        }

        // Inicializar todos los sliders al cargar la página
        document.addEventListener('DOMContentLoaded', () => {
            showSlides('slider1');
            showSlides('slider2');
            showSlides('slider3');
            showSlides('slider4');
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
