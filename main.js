/* ============================================
   JAFFNA TRAVEL GUIDE — main.js
   UI interactions: filter cards, navbar scroll
   ============================================ */

(function () {
  "use strict";

  /* ---- Navbar scroll effect ---- */
  function initNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
    window.addEventListener("scroll", () => {
      navbar.style.borderBottomColor = window.scrollY > 60
        ? "rgba(201, 168, 76, 0.25)"
        : "rgba(201, 168, 76, 0.1)";
    }, { passive: true });
  }

  /* ---- Card category filter ---- */
  function initCardFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".card");

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        // Show/hide cards with staggered animation
        let delay = 0;
        cards.forEach(card => {
          const show = filter === "all" || card.dataset.cat === filter;
          if (show) {
            card.classList.remove("hidden");
            card.style.animationDelay = (delay * 0.055) + "s";
            card.style.animation = "none";
            // Force reflow to restart animation
            void card.offsetHeight;
            card.style.animation = "";
            delay++;
          } else {
            card.classList.add("hidden");
          }
        });

        // Sync map filter if map is loaded
        if (window.jaffnaMap) {
          window.jaffnaMap.filter(filter);
        }
      });
    });
  }

  /* ---- Animate cards on scroll into view ---- */
  function initScrollReveal() {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".card, .tip-item").forEach(el => {
      el.style.animationPlayState = "paused";
      observer.observe(el);
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", (e) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const navH = document.getElementById("navbar")?.offsetHeight || 60;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }

  /* ---- Active nav link on scroll ---- */
  function initActiveNav() {
    const sections = ["home", "places", "map", "tips"].map(id => document.getElementById(id));
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        if (!section) return;
        const top = section.getBoundingClientRect().top;
        if (top <= 80) current = section.id;
      });
      navLinks.forEach(link => {
        const href = link.getAttribute("href").replace("#", "");
        link.style.color = href === current
          ? "rgba(232, 201, 122, 0.9)"
          : "rgba(255, 253, 248, 0.55)";
      });
    }, { passive: true });
  }

  /* ---- Boot ---- */
  document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initCardFilter();
    initScrollReveal();
    initSmoothScroll();
    initActiveNav();
  });

})();
