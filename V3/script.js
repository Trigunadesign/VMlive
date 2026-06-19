/* ============================================
   VM LIVE V3 — INTERACTIONS & ANIMATIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Preloader ──
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('done');
      triggerHeroReveal();
    }, 1400);
  });
  // Failsafe
  setTimeout(() => {
    preloader.classList.add('done');
    triggerHeroReveal();
  }, 3000);

  // ── 2. Custom Cursor ──
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover state
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .service-card, input, textarea');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // ── 3. Hero Reveal ──
  function triggerHeroReveal() {
    const lines = document.querySelectorAll('.hero-heading .line');
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add('revealed'), i * 200);
    });
    // Reveal other hero elements
    document.querySelectorAll('.hero .reveal-up, .hero .reveal-text').forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), 600 + i * 150);
    });
  }

  // ── 4. Scroll Reveal (Intersection Observer) ──
  const revealElements = document.querySelectorAll('.reveal-up:not(.hero .reveal-up), .reveal-text:not(.hero .reveal-text)');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── 5. Header Scroll Effect ──
  const header = document.getElementById('main-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const st = window.pageYOffset;
    if (st > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = st;
  });

  // ── 6. Mobile Menu Toggle ──
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── 7. Horizontal Scroll Gallery (scroll-driven) ──
  const hscrollTrack = document.getElementById('hscroll-track');
  if (hscrollTrack) {
    const hscrollSection = hscrollTrack.closest('.hscroll-section');

    window.addEventListener('scroll', () => {
      const rect = hscrollSection.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = 1 - (rect.bottom / (windowH + rect.height));
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const totalScroll = hscrollTrack.scrollWidth - hscrollSection.offsetWidth;
      hscrollTrack.style.transform = `translateX(-${clampedProgress * totalScroll * 0.6}px)`;
    });
  }

  // ── 8. Stats Counter Animation ──
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ── 9. Magnetic Button Effect ──
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ── 10. Contact Form Submit ──
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      alert(`Thank you, ${name}! We'll get back to you shortly.`);
      contactForm.reset();
    });
  }

  // ── 11. Smooth anchor scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
