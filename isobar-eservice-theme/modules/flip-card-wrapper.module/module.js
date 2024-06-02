$('body').on('click', '.m-service-card__toggle', (e) => {
    const serviceCard = $(e.currentTarget).closest('.m-service-card');
    const back = $(serviceCard).find('.m-service-card__back .m-service-card__content');
    if(serviceCard.hasClass('m-service-card--reversed')) {
        serviceCard.css('min-height', `0px`);
    } else {
        serviceCard.css('min-height', `${back.outerHeight(true)}px`);
    }
    serviceCard.toggleClass('m-service-card--reversed');
});