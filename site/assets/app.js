(() => {
  'use strict';

  const SESSION_KEY = 'learning-representations-review-session';
  const SESSION_VERSION = 1;

  function hasValidSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return false;
      const session = JSON.parse(raw);
      return session.version === SESSION_VERSION
        && Number.isFinite(session.expiresAt)
        && session.expiresAt > Date.now();
    } catch (_error) {
      sessionStorage.removeItem(SESSION_KEY);
      return false;
    }
  }

  function loginUrl() {
    const target = new URL('login.html', window.location.href);
    target.searchParams.set(
      'returnTo',
      `${window.location.pathname}${window.location.search}${window.location.hash}`
    );
    return target.href;
  }

  if (!hasValidSession()) {
    window.location.replace(loginUrl());
    return;
  }

  const root = document.documentElement;
  const savedTheme = localStorage.getItem('learning-rep-theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = savedTheme || (systemDark ? 'dark' : 'light');

  const themeButton = document.getElementById('theme-toggle');
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      localStorage.setItem('learning-rep-theme', next);
    });
  }

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (navToggle && nav) {
    if (!nav.querySelector('[data-logout]')) {
      const logoutButton = document.createElement('button');
      logoutButton.type = 'button';
      logoutButton.className = 'auth-logout';
      logoutButton.dataset.logout = '';
      logoutButton.textContent = 'Sign out';
      const themeToggle = nav.querySelector('#theme-toggle');
      nav.insertBefore(logoutButton, themeToggle || null);
      logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.replace(new URL('login.html', window.location.href).href);
      });
    }

    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const progress = document.getElementById('scroll-progress');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, value))}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
})();