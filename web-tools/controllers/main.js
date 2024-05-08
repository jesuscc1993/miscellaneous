const initialize = () => {
  if (typeof autosize === 'function') {
    const textAreas = querySelectorAll('textarea');
    textAreas.forEach((textarea) => {
      autosize(textarea);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.display = 'block';
  });

  const anchorLinks = querySelectorAll('.anchor-list a');
  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();

      const target = anchor.getAttribute('href');
      document
        .querySelector(target)
        .scrollIntoView({ behavior: 'smooth', block: 'start' });

      window.history.pushState('', '', target);
    });
  });
};

initialize();
