(function($) {
    /**
     * jQuery function to scroll the viewport middle to the element.
     */
    $('body').on('click', '.e-shadow-box__toggle', (e) => {
        const shadowBox = $(e.currentTarget).closest('.e-shadow-box');
        const back = $(shadowBox).find('.e-shadow-box__content--back');
        if(shadowBox.hasClass('e-shadow-box--flipped')) {
            shadowBox.css('min-height', `0px`);
        } else {
            shadowBox.css('min-height', `${back.outerHeight(true)}px`);
        }
        shadowBox.toggleClass('e-shadow-box--flipped');
    });
}(jQuery));
