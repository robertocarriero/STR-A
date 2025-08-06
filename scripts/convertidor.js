// --- INICIO DEL CÓDIGO JAVASCRIPT (Necesario para la funcionalidad) ---
            document.addEventListener('DOMContentLoaded', () => {
            const documentUpload = document.getElementById('documentUpload');
            const fileNameSpan = document.getElementById('fileName');
            const generateHashButton = document.getElementById('generateHashButton');
            const generatedHashSpan = document.getElementById('generatedHash');
            const copyHashButton = document.getElementById('copyHashButton');

            let selectedFile = null; // Para almacenar el archivo seleccionado

            // Actualiza el nombre del archivo seleccionado
            documentUpload.addEventListener('change', (event) => {
                selectedFile = event.target.files[0];
                if (selectedFile) {
                    fileNameSpan.textContent = selectedFile.name;
                    generatedHashSpan.textContent = 'Listo para generar...';
                    generateHashButton.disabled = false; // Habilita el botón al seleccionar archivo
                } else {
                    fileNameSpan.textContent = 'Ningún archivo seleccionado';
                    generatedHashSpan.textContent = 'Esperando documento...';
                    generateHashButton.disabled = true; // Deshabilita el botón si no hay archivo
                }
            });

            // Función para generar el hash
            generateHashButton.addEventListener('click', async () => {
                if (!selectedFile) {
                    alert('Por favor, selecciona un archivo primero.');
                    return;
                }

                generatedHashSpan.textContent = 'Generando hash...';
                generateHashButton.disabled = true; // Deshabilita el botón durante el proceso

                try {
                    // **Aquí es donde ocurre la magia de JavaScript:**
                    // 1. Leer el archivo como un ArrayBuffer
                    const fileReader = new FileReader();
                    fileReader.readAsArrayBuffer(selectedFile);

                    fileReader.onload = async (e) => {
                        const buffer = e.target.result; // Contenido binario del archivo

                        // 2. Calcular el hash SHA-256
                        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);

                        // 3. Convertir el hash a una cadena hexadecimal
                        const hashArray = Array.from(new Uint8Array(hashBuffer));
                        const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

                        const prefixedHexHash = '0x' + hexHash; 

                        generatedHashSpan.textContent = prefixedHexHash; // Mostrar el hash con 0x
                        copyHashButton.style.display = 'inline-block'; // Muestra el botón de copiar
                    };

                    fileReader.onerror = () => {
                        generatedHashSpan.textContent = 'Error al leer el archivo.';
                        console.error('Error reading file:', fileReader.error);
                    };

                } catch (error) {
                    generatedHashSpan.textContent = 'Error al generar el hash.';
                    console.error('Hashing error:', error);
                } finally {
                    // generateHashButton.disabled = false; // Habilitar de nuevo si quieres que puedan re-generar
                }
            });

            // Función para copiar el hash al portapapeles
            copyHashButton.addEventListener('click', () => {
                const hashValue = generatedHashSpan.textContent;
                navigator.clipboard.writeText(hashValue)
                    .then(() => {
                        alert('Hash copiado al portapapeles!');
                    })
                    .catch(err => {
                        console.error('Error al copiar el hash:', err);
                        alert('Error al copiar el hash. Por favor, cópielo manualmente.');
                    });
            });

            // Inicialmente, deshabilitar el botón de generar hash y ocultar el de copiar
            generateHashButton.disabled = true;
            copyHashButton.style.display = 'none';
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