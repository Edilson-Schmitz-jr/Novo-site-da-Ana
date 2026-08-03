document.addEventListener('DOMContentLoaded', function () {

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky header shadow on scroll ---- */
  var header = document.getElementById('siteHeader');
  function onScrollHeader() {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  /* Close mobile nav after clicking a link */
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Active nav link on scroll ---- */
  var sections = Array.from(document.querySelectorAll('main section[id]'));
  var navLinks = Array.from(document.querySelectorAll('.nav-link'));

  function setActiveLink() {
    var scrollPos = window.scrollY + 140;
    var current = null;
    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(function (link) {
      var match = link.getAttribute('href') === '#' + current;
      link.classList.toggle('active', match);
    });
  }
  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---- Reveal-on-scroll animations ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', (!isOpen).toString());
    });
  });

});
