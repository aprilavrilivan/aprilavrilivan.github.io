(() => {
  const navLinks = [...document.querySelectorAll('.docs-nav a[href^="#"]')];
  const sections = navLinks
    .map((link) => {
      const id = decodeURIComponent(link.hash.slice(1));
      const section = document.getElementById(id);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  let activeLink = null;
  let frameRequested = false;

  const setActiveLink = (nextLink) => {
    if (nextLink === activeLink) return;

    sections.forEach(({ link }) => {
      const isActive = link === nextLink;
      link.classList.toggle('is-active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    activeLink = nextLink;
  };

  const updateActiveSection = () => {
    frameRequested = false;

    const topbar = document.querySelector('.docs-topbar');
    const topbarHeight = topbar?.getBoundingClientRect().height || 0;
    const readingLine = window.scrollY + topbarHeight + Math.min(window.innerHeight * 0.28, 220);
    let current = sections[0];

    sections.forEach((item) => {
      const sectionTop = item.section.getBoundingClientRect().top + window.scrollY;
      if (sectionTop <= readingLine) current = item;
    });

    const pageBottom = window.scrollY + window.innerHeight;
    const documentBottom = document.documentElement.scrollHeight - 2;
    if (pageBottom >= documentBottom) current = sections[sections.length - 1];

    setActiveLink(current.link);
  };

  const requestUpdate = () => {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(updateActiveSection);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('hashchange', requestUpdate);
  window.addEventListener('load', updateActiveSection);
  updateActiveSection();
})();
