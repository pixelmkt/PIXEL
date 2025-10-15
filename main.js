// main.js — Corregido (sin cursor personalizado)
document.addEventListener('DOMContentLoaded', () => {
  // Menú móvil
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.onclick = () => mobileMenu.classList.toggle('hidden');
  }

  // Scroll reveal con IntersectionObserver (fallback si no hay GSAP)
  const runIO = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  };

  // Si cargas GSAP, úsalo; si no, usa IO
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // reveal general
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      gsap.fromTo(el, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });

    // Efecto magnético opcional
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    if (window.matchMedia('(pointer: fine)').matches) {
      magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left - r.width/2;
          const y = e.clientY - r.top - r.height/2;
          gsap.to(el, { x: x*0.3, y: y*0.3, duration: 0.8, ease: 'elastic.out(1,0.3)' });
        });
        el.addEventListener('mouseleave', () => gsap.to(el, { x:0, y:0, duration:0.5, ease:'power3.out' }));
      });
    }
  } else {
    runIO();
  }

  // Formspree (Contacto)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formStatus = document.getElementById('form-status');
      formStatus.textContent = 'Enviando...';
      const formData = new FormData(contactForm);
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST', body: formData, headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          formStatus.style.color = 'var(--verde-feedback)';
          formStatus.textContent = '¡Mensaje enviado!';
          contactForm.reset();
        } else {
          formStatus.style.color = 'var(--rojo-feedback)';
          formStatus.textContent = 'Hubo un error al enviar.';
        }
      } catch (err) {
        formStatus.style.color = 'var(--rojo-feedback)';
        formStatus.textContent = 'Error de red.';
      }
    });
  }
});
