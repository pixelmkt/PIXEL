// main.js
document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE MENÚ MÓVIL Y FORMULARIO (sin cambios) ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) { mobileMenuBtn.onclick = () => mobileMenu.classList.toggle('hidden'); }
    
    // ... (la lógica del formulario de contacto aquí)

    // --- NUEVA LÓGICA DE ANIMACIONES CON GSAP ---
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animación de letras del titular
        const titleEl = document.getElementById("hero-title");
        if (titleEl) {
            const chars = titleEl.textContent.split('');
            titleEl.innerHTML = '';
            chars.forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                titleEl.appendChild(span);
            });
            
            gsap.fromTo(titleEl.children,
                { y: '100%', opacity: 0 },
                {
                    y: '0%',
                    opacity: 1,
                    stagger: 0.03,
                    duration: 1,
                    ease: 'power3.out'
                }
            );
        }

        // Animación de párrafos y botones al cargar
        gsap.fromTo(".reveal-on-load", 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 0.5, ease: 'power3.out' }
        );

        // Animación general al hacer scroll
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            gsap.fromTo(el,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // --- EFECTO MAGNÉTICO (SIN CURSOR PERSONALIZADO PARA MEJOR EXPERIENCIA) ---
        const magneticElements = document.querySelectorAll('[data-magnetic]');
        if (window.matchMedia("(pointer: fine)").matches) {
            magneticElements.forEach(el => {
                const strength = 30;
                el.addEventListener('mousemove', (e) => {
                    const pos = el.getBoundingClientRect();
                    const x = e.clientX - pos.left - pos.width / 2;
                    const y = e.clientY - pos.top - pos.height / 2;
                    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.8, ease: "elastic.out(1, 0.3)" });
                });
                el.addEventListener('mouseleave', () => {
                    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
                });
            });
        }
    }
});