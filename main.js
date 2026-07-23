(function () {
  'use strict';

  // Lucide icons
  if (window.lucide) window.lucide.createIcons();

  // Mobile nav toggle
  var nav = document.getElementById('site-nav');
  var toggle = document.getElementById('nav-toggle');
  var toggleLabel = toggle ? toggle.querySelector('.visually-hidden') : null;
  function setNavOpen(isOpen) {
    nav.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (toggleLabel) toggleLabel.textContent = isOpen ? 'Fermer le menu' : 'Ouvrir le menu';
  }
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      setNavOpen(!nav.classList.contains('is-open'));
    });
    nav.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        setNavOpen(false);
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
})();
