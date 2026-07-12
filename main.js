(function () {
  'use strict';

  // Lucide icons
  if (window.lucide) window.lucide.createIcons();

  // Mobile nav toggle
  var nav = document.getElementById('site-nav');
  var toggle = document.getElementById('nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal
  var reveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
    reveal.observe(el);
  });
  // Safety net: force visibility if the observer ever fails to fire.
  setTimeout(function () {
    document.querySelectorAll('.reveal:not(.is-visible), .reveal-stagger:not(.is-visible)').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }, 3000);

  // Contact form — maquette : validation + confirmation locale, pas d'envoi réseau.
  // TODO(supabase) : remplacer la simulation ci-dessous par un insert dans la table
  // `leads` (source='claro-avocat', metadata={ situation }) une fois le projet Supabase
  // "antigravity-leads" branché — voir clients/_pense-bete/supabase-leads-schema.sql
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      contactForm.classList.add('is-submitted');
    });
  }

  // Newsletter — même logique de maquette.
  var newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('nl-email');
      if (!newsletterForm.checkValidity()) {
        newsletterForm.reportValidity();
        return;
      }
      input.value = '';
      input.placeholder = 'Merci, à bientôt !';
    });
  }
})();
