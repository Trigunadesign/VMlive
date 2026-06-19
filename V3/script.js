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

  // ── 12. Project Modal Interaction & Data ──
  const projectData = {
    "01": {
      title: "MG Motors — <em>80+ Showrooms</em>",
      tag: "Automotive Retail",
      desc: "End-to-end showroom design, signage fabrication, and pan-India deployment.",
      image: "assets/pptx/selected/image12.png",
      client: "MG Motor India",
      scope: "Turnkey Retail, Signage, ACP Cladding",
      location: "80+ Cities (Pan-India)",
      scale: "3,000 - 8,000 sq.ft. per outlet",
      story: "VM Live was commissioned to fabricate and roll out MG Motor India's signature dealership look across their nationwide expansion. We developed a standardized modular framework for internal branding elements, metal ceiling louvers, and massive exterior LED claddings, ensuring visual consistency and flawless assembly at 80+ sites."
    },
    "02": {
      title: "Simple Energy — <em>EV Outlets</em>",
      tag: "EV Experience",
      desc: "Turnkey interiors and futuristic layouts for India's next-gen EV showrooms.",
      image: "assets/pptx/selected/image83.png",
      client: "Simple Energy",
      scope: "Experience Center Design, Custom Joinery",
      location: "Bengaluru, Pune & Chennai",
      scale: "1,500 - 2,500 sq.ft.",
      story: "For Simple Energy's electric mobility experience centers, VM Live executed a ultra-modern, minimalist architectural blueprint. Highlighting the electric two-wheelers required seamless lighting integration, architectural concrete finishes, and custom floating acrylic stands engineered entirely in-house."
    },
    "03": {
      title: "HP — <em>Modular Display Systems</em>",
      tag: "Tech Fixtures",
      desc: "Flat-pack modular fixtures engineered for 40+ retail technology hubs.",
      image: "assets/pptx/fixtures/image15.png",
      client: "Hewlett-Packard India",
      scope: "Modular Fixtures, Flat-pack Engineering",
      location: "40+ Retail Hubs",
      scale: "Multi-format display counters",
      story: "HP required highly durable, modular island counters and wall bay systems that could be flat-packed and shipped to Tier-1 and Tier-2 city dealers. VM Live engineered these units using premium wood finishes, CNC-routed acrylic elements, and built-in LED lighting structures for rapid tool-less assembly on-site."
    },
    "04": {
      title: "Suzuki — <em>Display Zones</em>",
      tag: "Premium Display",
      desc: "Premium wooden display zones deployed across 34+ multi-brand outlets.",
      image: "assets/pptx/selected/image72.png",
      client: "Suzuki Motorcycle India",
      scope: "In-Store Branding, Shop-in-Shops",
      location: "34+ Retail Partners",
      scale: "Dedicated brand zones",
      story: "To establish dedicated premium zones within multi-brand motorcycle outlets, we fabricated architectural wooden backdrop panels and raised platform bases. Incorporating brushed steel borders and illuminated brand logos, this layout gives the product a standalone premium spotlight."
    },
    "05": {
      title: "Identity Systems — <em>Facades & Signs</em>",
      tag: "Signage & Facades",
      desc: "3D metal lettering, backlit channels, and storefront ACP claddings.",
      image: "assets/pptx/selected/image97.png",
      client: "Various Corporate Clients",
      scope: "Signage, 3D Metal Typography, ACP Facades",
      location: "Pan-India",
      scale: "Exterior storefront identity",
      story: "A curated collection of facade design systems built using premium weather-resistant composites. VM Live specializes in custom metal channel letters, acrylic solid letters with internal warm LED lighting, and large scale structural ACP (Aluminum Composite Panel) installations for flagship retail facades."
    },
    "06": {
      title: "Exhibition Pavilions — <em>Events & Expos</em>",
      tag: "Events & Expos",
      desc: "Reusable double-decker pavilions built for maximum trade-show impact.",
      image: "assets/pptx/selected/image38.png",
      client: "Triguna / VM Live Exhibits",
      scope: "Double-decker pavilions, Custom Stalls",
      location: "Pragati Maidan, New Delhi",
      scale: "400+ sq.meter exhibition space",
      story: "Designed and built for major trade exhibitions, these structures are engineered to be modular, structural, and completely reusable. Featuring lounge areas, private meeting rooms on the mezzanine level, and custom-manufactured lighting rigs, they represent the pinnacle of exhibition design."
    }
  };

  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalStory = document.getElementById('modal-story-text');
  const modalClient = document.getElementById('modal-client');
  const modalScope = document.getElementById('modal-scope');
  const modalLocation = document.getElementById('modal-location');
  const modalScale = document.getElementById('modal-scale');
  const modalClose = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  function openModal(id) {
    const data = projectData[id];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags for alt
    modalTag.textContent = data.tag;
    modalTitle.innerHTML = data.title;
    modalDesc.textContent = data.desc;
    modalStory.textContent = data.story;
    modalClient.textContent = data.client;
    modalScope.textContent = data.scope;
    modalLocation.textContent = data.location;
    modalScale.textContent = data.scale;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event Listeners for Project Cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      if (id) openModal(id);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Esc key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
