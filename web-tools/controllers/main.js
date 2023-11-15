const initialize = () => {
  if (typeof autosize === 'function') {
    autosize(jQuery('textarea'));
  }

  jQuery(document).ready(() => {
    jQuery('body').fadeIn();
  });

  jQuery('.anchor-list a').each((i, anchor) => {
    jQuery(anchor).click((event) => {
      event.preventDefault();

      const target = jQuery(anchor).attr('href');
      jQuery(target)
        .get(0)
        .scrollIntoView({ behavior: 'smooth', block: 'start' });

      window.history.pushState('', '', target);
    });
  });
};

initialize();
