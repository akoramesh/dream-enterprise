/* Dream Enterprise – shared site scripts */
(function () {
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  window.toggleNav = function () {
    var links = qs('#navLinks');
    var overlay = qs('#navOverlay');
    var btn = qs('.nav-toggle');
    if (!links) return;
    var open = !links.classList.contains('open');
    links.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    if (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? '✕' : '☰';
    }
  };

  window.closeNav = function () {
    var links = qs('#navLinks');
    var overlay = qs('#navOverlay');
    var btn = qs('.nav-toggle');
    if (links) links.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.classList.remove('nav-open');
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = '☰';
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = qs('.nav-toggle');
    var closeBtn = qs('.nav-close');
    var overlay = qs('#navOverlay');
    var nav = qs('#navLinks');

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.toggleNav();
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.closeNav();
      });
    }
    if (overlay) {
      overlay.addEventListener('click', function () {
        window.closeNav();
      });
    }
    if (nav) {
      qsa('a[href]', nav).forEach(function (a) {
        a.addEventListener('click', function () {
          window.closeNav();
        });
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') window.closeNav();
    });
  });
})();
