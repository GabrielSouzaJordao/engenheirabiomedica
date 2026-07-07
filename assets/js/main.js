/**
 * SGMS Consultoria - Animacoes nobres e profissionais
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
      var banner = document.querySelector('.brand-hero__image');
      if (banner) {
        banner.style.opacity = '1';
        banner.style.transform = 'none';
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
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('is-loaded');
    initReveal();
  });

})();
