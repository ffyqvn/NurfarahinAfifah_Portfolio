// Highlights the current section's link in the tab nav as the visitor scrolls.

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('.tabs a'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      // Pick the entry closest to the top of the viewport that's currently visible.
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length) {
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(visible[0].target.id);
      }
    }, {
      rootMargin: '-45% 0px -50% 0px', // trigger when a section is near the middle of the screen
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  // Keep the sticky tab bar scrolled to show the active tab on small screens.
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setActive(link.getAttribute('href').slice(1));
    });
  });
});