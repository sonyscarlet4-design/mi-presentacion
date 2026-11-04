// Esperar a que el DOM cargue por completo
document.addEventListener('DOMContentLoaded', () => {

    // ===================================================
    // 1. MODO NOCHE / DÍA VICTORIANO
    // ===================================================
    const themeBtn = document.getElementById('themeBtn');
    const bodyElement = document.body;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            bodyElement.classList.toggle('dark-mode');
            
            if (bodyElement.classList.contains('dark-mode')) {
                themeBtn.innerText = '☀️ Modo Día';
            } else {
                themeBtn.innerText = '🌙 Modo Noche';
            }
        });
    }

    // ===================================================
    // 2. MENÚ HAMBURGUESA RESPONSIVE
    // ===================================================
    const burguerBtn = document.getElementById('burguerBtn');
    const navMenu = document.getElementById('navMenu');

    if (burguerBtn && navMenu) {
        burguerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // ===================================================
    // 3. CARRUSEL DE FOTOS
    // ===================================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        slides[currentSlide].classList.add('active');
    }

    if (nextBtn && prevBtn && slides.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
        });

        setInterval(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, 5000);
    }

    // ===================================================
    // 4. VALIDACIÓN DE FORMULARIO
    // ===================================================
    const hireForm = document.getElementById('hireForm');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const mensajeInput = document.getElementById('mensaje');
    const alertaBox = document.getElementById('alertaBox');

    if (hireForm) {
        hireForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (nombreInput.value.trim() === "" || correoInput.value.trim() === "" || mensajeInput.value.trim() === "") {
                alertaBox.innerHTML = '<p class="msg-error">✦ Por favor, completa todos los espacios de la misiva.</p>';
            } else {
                alertaBox.innerHTML = '<p class="msg-exito">✦ ¡Misiva enviada con suma elegancia y éxito!</p>';
                nombreInput.value = "";
                correoInput.value = "";
                mensajeInput.value = "";
            }
        });
    }

});

// ===================================================
// 5. ACORDEÓN DESPLEGABLE PARA MÚSICA Y JUEGOS
// ===================================================
function toggleAccordion(button) {
    const item = button.parentElement;
    
    // Opcional: Si deseas que solo uno esté abierto a la vez, descomenta las siguientes líneas:
    /*
    const allItems = document.querySelectorAll('.accordion-item');
    allItems.forEach(i => {
        if (i !== item) i.classList.remove('active');
    });
    */

    item.classList.toggle('active');
}