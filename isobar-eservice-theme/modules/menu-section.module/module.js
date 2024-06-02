(function ($) {

  const setSubPosition = (el) => {
    const left = $(el).offset().left;
    const halfWindow = window.innerWidth / 2;
    if(left > halfWindow) {
      $(el).find('> .e-menu__level').addClass('e-menu__level--rig22ht');
    }
  };

  $(".e-menu__level--1 > .e-menu__item").each((index, menu) => {
    setSubPosition(menu);
  })

  $(".e-menu__item--with-childs > .e-menu__link > .e-menu__toggle").on('click', (e) => {
    e.preventDefault();
    const menuItem = $(e.currentTarget).closest('.e-menu__item');
    menuItem.toggleClass('e-menu__item--open');
  })


})(jQuery);
