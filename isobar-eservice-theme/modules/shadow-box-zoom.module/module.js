(function ($) {

    const debounce = function (func, wait, immediate) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            let later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    const setHeight = (media) => {
        if (media.matches) {
            $('.shadow-box-zoom__wrapper').css('min-height', '0');
        } else {
            const sections = $('.dnd-section').filter((index, section) => {
                if ($(section).find('.shadow-box-zoom__wrapper').length) {
                    return section;
                }
            });
            sections.each((index, section) => {
                const boxes = $(section).find('.shadow-box-zoom__wrapper');
                let maxHeight = Array.from(boxes).reduce(function (prev, box) {
                    return Math.max(prev, $(box).outerHeight(true));
                }, 0);
                boxes.css('min-height', `${maxHeight}px`);
            });
        }
    };

    const media = window.matchMedia('(max-width: 1023px)');
    // resize boxes on page fully loaded
    window.addEventListener('load', () => {
        setHeight(media);
    });

    // resize boxes on breakpoint
    media.addEventListener('change', (e) => {
        setHeight(e);
    });


    // resize boxes on window resize
    window.addEventListener('resize', debounce(function (e) {
        $('.shadow-box-zoom__wrapper').css('min-height', '0');
        setTimeout(() => {
            const media = window.matchMedia('(max-width: 1023px)');
            setHeight(media);
        }, 50);
    }, 250));

}(jQuery));
