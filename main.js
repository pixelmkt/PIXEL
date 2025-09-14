// main.js
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.onclick = () => mobileMenu.classList.toggle('hidden');
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formStatus = document.getElementById('form-status');
            formStatus.textContent = 'Enviando...';
            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
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