/**
 * SGMS Consultoria - Animacoes nobres e profissionais
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isFinePointer = window.matchMedia('(pointer: fine)').matches;

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

    document.querySelectorAll('.section-heading, .contact-band__text').forEach(function (el) {
      el.classList.add('reveal--fade');
    });

    document.querySelectorAll('.service-box').forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', (i * 0.18) + 's');
    });

    document.querySelectorAll('.mvp-block').forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', (i * 0.22) + 's');
    });

    document.querySelectorAll('.about-band__text p').forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', (i * 0.15) + 's');
    });

    if (prefersReducedMotion) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      var wa = document.querySelector('.whatsapp-float');
      if (wa) wa.style.opacity = '1';
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  }

  function initHeroParallax() {
    if (prefersReducedMotion || !isFinePointer) return;

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

        texture.style.transform = 'translate(' + (x * 6) + 'px, ' + (y * 4) + 'px)';
        if (glow) {
          glow.style.transform = 'translate(' + (x * -8) + 'px, ' + (y * -5) + 'px)';
        }
        ticking = false;
      });
    });

    hero.addEventListener('mouseleave', function () {
      texture.style.transform = '';
      if (glow) glow.style.transform = '';
    });
  }

  function initIconHover() {
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

  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('is-loaded');
    initReveal();
    initHeroParallax();
    initIconHover();
  });

})();
