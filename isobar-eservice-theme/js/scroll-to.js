(function($) {
    $('body').on('click', 'a[href="#content"]', (e) => {
        e.preventDefault();
        const content = $('.body-container');
        $("html, body").animate({ scrollTop: content.offset().top }, 500);
    });
}(jQuery));
