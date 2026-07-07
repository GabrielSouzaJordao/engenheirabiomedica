/**
 * SGMS Consultoria - Animacoes e efeitos visuais
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initReveal() {
    var targets = document.querySelectorAll(
      '.tv-web, .specialist-profile, .section-heading, .about-band__text p, .service-box, .mvp-block, .contact-band__text, .contact-band__actions'
    );

    if (!targets.length) return;

    targets.forEach(function (el) {
      el.classList.add('reveal');
    });

    document.querySelectorAll('.tv-web').forEach(function (el) {
      el.classList.add('reveal--left');
    });

    document.querySelectorAll('.service-box').forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', (i * 0.12) + 's');
    });

    document.querySelectorAll('.mvp-block').forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', (i * 0.15) + 's');
    });

    document.querySelectorAll('.about-band__text p').forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', (i * 0.1) + 's');
    });

    if (prefersReducedMotion) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      var wa = document.querySelector('.whatsapp-float');
      if (wa) {
        wa.style.opacity = '1';
        wa.style.transform = 'none';
      }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  }

  function initHeroParallax() {
    if (prefersReducedMotion) return;

    var hero = document.querySelector('.brand-hero');
    var texture = document.querySelector('.brand-hero__texture');
    var glow = document.querySelector('.brand-hero__glow');
    if (!hero || !texture) return;

    var ticking = false;

    hero.addEventListener('mousemove', function (e) {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(function () {
        var rect = hero.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;

        texture.style.transform = 'translate(' + (x * 12) + 'px, ' + (y * 8) + 'px)';
        if (glow) {
          glow.style.transform = 'translate(' + (x * -18) + 'px, ' + (y * -12) + 'px)';
        }
        ticking = false;
      });
    });

    hero.addEventListener('mouseleave', function () {
      texture.style.transform = '';
      if (glow) glow.style.transform = '';
    });
  }

  function initIconTilt() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('.brand-services__item').forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        item.classList.add('is-hovered');
      });
      item.addEventListener('mouseleave', function () {
        item.classList.remove('is-hovered');
      });
    });
  }

  function initTvScan() {
    if (prefersReducedMotion) return;

    var screen = document.querySelector('.tv-web__screen');
    if (!screen) return;

    var scan = document.createElement('span');
    scan.className = 'tv-web__scan';
    scan.setAttribute('aria-hidden', 'true');
    screen.appendChild(scan);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('is-loaded');
    initReveal();
    initHeroParallax();
    initIconTilt();
    initTvScan();
  });

})();
