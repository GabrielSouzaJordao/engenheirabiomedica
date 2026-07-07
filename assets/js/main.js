/**
 * SGMS Consultoria  Main JavaScript
 * Scroll animations, counters, navigation
 */

(function () {
  'use strict';

  /* ---- Header scroll effect ---- */
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ---- Mobile navigation ---- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Scroll reveal (Intersection Observer) ---- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- Animated counters ---- */
  function animateCounter(element, target, duration) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * eased);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  const counterSections = document.querySelectorAll('.hero, .highlights');

  if ('IntersectionObserver' in window && counterSections.length) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-counter]').forEach(function (el) {
              if (el.dataset.animated) return;
              el.dataset.animated = 'true';
              const target = parseInt(el.getAttribute('data-counter'), 10);
              if (!isNaN(target)) {
                animateCounter(el, target, 2000);
              }
            });
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counterSections.forEach(function (section) {
      counterObserver.observe(section);
    });
  }

  /* ---- Smooth anchor scroll offset for fixed header ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---- Process steps stagger animation ---- */
  const processSteps = document.querySelectorAll('.process-step');

  if ('IntersectionObserver' in window && processSteps.length) {
    const processObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            processSteps.forEach(function (step, index) {
              step.style.opacity = '0';
              step.style.transform = 'translateY(20px)';
              step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

              setTimeout(function () {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
              }, index * 120);
            });
            processObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    const processTimeline = document.querySelector('.process-timeline');
    if (processTimeline) {
      processObserver.observe(processTimeline);
    }
  }

})();
