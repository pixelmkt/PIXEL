// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.onclick = () => mobileMenu.classList.toggle('hidden');
    }

    // Animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    
    // Cursor Interactivo
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: 'forwards' });
        });
    } else {
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
        document.body.style.cursor = 'auto';
    }

    // Funcionalidad del Formulario de Contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formStatus = document.getElementById('form-status');
            formStatus.textContent = 'Enviando...';
            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST', body: formData, headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    formStatus.style.color = 'var(--verde-feedback)';
                    formStatus.textContent = '¡Mensaje enviado con éxito!';
                    contactForm.reset();
                } else {
                    formStatus.style.color = 'var(--rojo-feedback)';
                    formStatus.textContent = 'Hubo un error al enviar el mensaje.';
                }
            } catch (error) {
                formStatus.style.color = 'var(--rojo-feedback)';
                formStatus.textContent = 'Error de red. Inténtalo de nuevo.';
            }
        });
    }
});