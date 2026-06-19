const revealItems = document.querySelectorAll("[data-reveal]");
const siteHeader = document.querySelector(".site-header");
let lastScrollY = window.scrollY;
let ticking = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));

window.addEventListener(
  "scroll",
  () => {
    if (!siteHeader || ticking) return;

    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const pastHeader = currentScrollY > 90;

      siteHeader.classList.toggle("is-hidden", isScrollingDown && pastHeader);
      lastScrollY = Math.max(currentScrollY, 0);
      ticking = false;
    });
    ticking = true;
  },
  { passive: true }
);
