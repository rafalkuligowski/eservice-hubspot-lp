(function($) {
    /**
     * jQuery function to scroll the viewport middle to the element.
     */
    $.fn.scrollToMiddle = function(options) {
        var settings = $.extend({
            duration: 1000,
            margin: 0,
        }, options );

        return this.each(function() {
            var $el = $(this);
            var elOffset = $el.offset().top;
            var elHeight = $el.height();
            var windowHeight = $(window).height();
            var offset;
            if (elHeight < windowHeight) {
                offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
            }
            else {
                offset = elOffset;
            }
            $('html, body').animate({
                scrollTop: offset - settings.margin
            }, settings.duration);
        });
    };
    $.fn.scrollToTop = function(options) {
        var settings = $.extend({
            duration: 1000,
            margin: 0,
        }, options );

        const media = window.matchMedia('(max-width: 1023px)');

        if(media.matches) {
            settings.margin += $('.page-header').outerHeight();
        }
        return this.each(function() {
            var $el = $(this);
            var elOffset = $el.offset().top;
            $('html, body').animate({
                scrollTop: elOffset - settings.margin
            }, settings.duration);
        });
    };
}(jQuery));
