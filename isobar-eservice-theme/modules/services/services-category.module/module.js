(function($) {
    const grid = new Masonry( '.services-category__items', {
        itemSelector: '.e-shadow-box',
        gutter: 0,
        columnWidth: '.grid-sizer',
        horizontalOrder: true,
        percentPosition: true,
    });

    const fontSwitcherEl = document.querySelector('.js-font-switcher');

    $('.services-category__items').on('click', '.e-shadow-box__toggle', (e) => {
        setTimeout(() => {
            grid.layout();
        }, 500);
    });

    $(document).ready(() => {
        grid.layout();
    });

    fontSwitcherEl.addEventListener('click', ()=>{
        //as recalculation occurs before class change 
        setTimeout(()=>{
            grid.layout();
        },500)
    });
}(jQuery));
