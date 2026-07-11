document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const navButton = document.querySelector('.nav-button');
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-list a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });

  if (navButton) {
    navButton.setAttribute('role', 'button');
    navButton.setAttribute('tabindex', '0');
    navButton.setAttribute('aria-label', 'メニューを開閉');
    navButton.setAttribute('aria-expanded', 'false');
    const syncMenuState = () => navButton.setAttribute('aria-expanded', document.body.classList.contains('menu-open'));
    navButton.addEventListener('click', () => requestAnimationFrame(syncMenuState));
    navButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navButton.click();
      }
    });
  }

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealTargets = document.querySelectorAll(
    'section h1, section .sub_title, .vision_txt, .business_item, .news_list, .box-area, table, .googlemap, .recruit > a, .formtable, .btn'
  );
  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 80}ms`);
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }
});
