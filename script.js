(() => {
  const body = document.body;
  const toggle = document.querySelector('.theme-toggle');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const applyTheme = (theme) => {
    const dark = theme === 'dark';
    body.dataset.theme = dark ? 'dark' : 'light';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Switch to Brushed Platinum light mode' : 'Switch to Obsidian Slate dark mode');
    metaTheme.setAttribute('content', dark ? '#171a1b' : '#f2f1ee');
  };
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('ibrokhim-theme'); } catch (_) {}
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
  toggle.addEventListener('click', () => {
    const next = body.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('ibrokhim-theme', next); } catch (_) {}
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -24px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const card = document.querySelector('.identity-card');
  const finePointer = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (finePointer.matches) {
    const reset = () => { card.style.transform = ''; };
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 3.4}deg) rotateX(${-y * 3.1}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', reset);
    card.addEventListener('pointercancel', reset);
  }
})();
