/* ================================================
   GOMEZ DIGITAL — INTERACTIONS
================================================= */
(function () {
  'use strict';

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- nav scroll state ---------- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        burger.classList.remove('is-open');
      });
    });
  }

  /* ---------- cursor glow (desktop only) ---------- */
  var glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(hover: hover)').matches) {
