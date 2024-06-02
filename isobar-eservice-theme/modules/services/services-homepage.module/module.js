const element = $('.m-service-brand');

const ServicesHome = {
    element: $('.m-service-brand'),
    services_hubdb: $('.m-service-brand').attr('data-services-hubdb'),
    services_category_hubdb: $('.m-service-brand').attr('data-services-category-hubdb'),
    brandSlider: null,
    typeElement: $('.m-service-type'),
    typeSlider: null,
    typeSliderInitiated: false,
    activeCategory: {
      id: '',
      slug: '',
      name: '',
    },
    content: {
        moreButton: {
            text: element.attr('data-more-button-text'),
        },
        contactButton: {
            text: element.attr('data-contact-button-text'),
            link: element.attr('data-contact-button-link'),
        }
    },
    init() {
        this.brandSlider = $('.m-service-brand__slider');
        this.typeSlider = $('.m-service-type__slider');
        this.popularSlider = $('.m-popular-services__slider');
        this.initBrandSlider();
        this.getPopularServices();
        this.events();
    },
    events() {
        const getCategoryAttr = (categoryEl) => {
            return {
                id: $(categoryEl).attr('data-category-id'),
                favorites: $(categoryEl).attr('data-favorites-ids'),
                name: $(categoryEl).attr('data-category-name'),
                path: $(categoryEl).attr('data-category-path'),
            };
        };

        $('.m-service-brand__slider').on('click', '.m-service-brand__slide', (e) => {
            const category = getCategoryAttr(e.currentTarget);
            $('.m-service-brand__slide').removeClass('m-service-brand__slide--active');
            $(e.currentTarget).addClass('m-service-brand__slide--active');
            this.getSubCategories(category);
        });
        $('.m-service-type__slider').on('click', '.m-service-type__slide', (e) => {
            const category = getCategoryAttr(e.currentTarget);
            $('.m-service-type__slide').removeClass('m-service-type__slide--active');
            $(e.currentTarget).addClass('m-service-type__slide--active');
            this.getServicesByCategory(category);
        });
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
    },
    initBrandSlider() {
        this.brandSlider.slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
        this.getCategories();
    },
    initTypeSlider() {
        this.typeSlider.slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
        this.typeSliderInitiated = true;
    },
    initPopularSlider() {
        this.popularSlider.slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });

        let setTabIndexes = function(){
            let notTabableElements = $('.m-popular-services__slider').find('.slick-slide:not(.slick-active), .slick-slide:not(.slick-active) .m-service-card, slick-slide:not(.slick-active) .m-service-card__toggle,slick-slide:not(.slick-active) .m-service-card__buttons m-service-card__button-contact');
            let tabableElements = $('.m-popular-services__slider').find('.slick-slide.slick-active, .slick-slide.slick-active .m-service-card, slick-slide.slick-active .m-service-card__toggle,slick-slide.slick-active .m-service-card__buttons m-service-card__button-contact');

            for (let element of notTabableElements) {
                element.tabIndex = -1;
            }
            for (let element of tabableElements) {
                element.tabIndex = 0;
            }
        }

        setTabIndexes();

        this.popularSlider.on('afterChange', ()=>{
            setTabIndexes();
        });

    },
    async getCategories() {
        const getBrandSlideTmpl = (data) => {
            return `
            <div class="m-service-brand__slide"
                 data-category-id="${data.id}"
                 data-favorites-ids="${data.favoriteServices.map(s => s.id).join(',')}"
                 data-category-path="${data.path}"
                 data-category-name="${data.name}"
                 tabindex="0"
            >
                ${data.description && `<div class="m-service-brand__tooltip e-tooltip">
                    <div class="e-tooltip__content">${data.description}</div>
                </div>` || ''}
                <figure class="m-service-brand__slide-figure">
                    <img src="${data.icon && data.icon.url}" alt="${data.name}" class="m-service-brand__slide-img"/>
                </figure>
                <h3 class="m-service-brand__slide-title">${data.name}</h3>
                <div class="m-service-brand__slide-check"></div>
            </div>`;
        };
        let categories = await ServicesService.getCategories(this.services_category_hubdb);
        categories = categories.filter(cat => !cat.parentCategory);
        for(let cat of categories) {
            this.brandSlider.slick('slickAdd',`<div>${getBrandSlideTmpl(cat)}`);
        }
    },
    async getSubCategories(category) {
        const getTypeSlideTmpl = (data) => {
            return `
            <div class="m-service-type__slide"
                 data-category-id="${data.id}"
                 data-favorites-ids="${data.favoriteServices.map(s => s.id).join(',')}"
                 data-category-path="${data.path}"
                 data-category-name="${data.name}"
                 tabindex="0"
                 >
                <h4 class="m-service-type__title">
                    ${data.name}
                </h4>
                ${data.description && (`<div class="m-service-type__tooltip e-tooltip">
                    <div class="e-tooltip__content">
                        ${data.description}
                    </div>
                </div>`) || ''}
            </div>`;
        };
        const categories = await ServicesService.getCategories(this.services_category_hubdb, category.id);
        if(this.typeSliderInitiated) {
            this.typeSlider.slick('unslick');
            this.typeSlider.html('');
        }
        for(let cat of categories) {
            this.typeSlider.append(`<div>${getTypeSlideTmpl(cat)}</div>`);
        }
        if (categories.length) {
            this.typeElement.show();
        } else {
            this.typeElement.hide();
        }
        if(!categories.length) {
            this.getServicesByCategory(category);
        } else {
            this.typeElement.scrollToTop({duration: 500});
            this.initTypeSlider();
        }
    },
    getCardTmpl(data, category = null) {
        const getContactUrl = (defaultUrl) => {
            let url =  new URL(defaultUrl);
            if(category && category.name) {
                url.searchParams.append('branza', category.name);
            }
            return url.href;
        }
        return `
            <div class="m-service-card" tabindex="0">
            <div class="m-service-card__inner">
                <div class="m-service-card__front">
                    <button class="m-service-card__toggle"></button>
                    <div class="m-service-card__image"
                         style="background-image: url(${data.image.url});"></div>
                    <div class="m-service-card__content">
                        <h4 class="m-service-card__title">${data.name}</h4>
                        <div class="m-service-card__text">
                            ${data.shortDescription}
                        </div>
                        <div class="m-service-card__buttons">
                            ${data.customPagePath && `<a href="${data.customPagePath}" class="button js-service-link">${this.content.moreButton.text}</a>` || '' }
                            ${this.content.contactButton.link && `<a href="${getContactUrl(this.content.contactButton.link)}" class="button button--primary m-service-card__button-contact">${this.content.contactButton.text}</a>`}
                        </div>
                    </div>
                </div>
                <div class="m-service-card__back">
                    <button class="m-service-card__toggle"></button>
                    <div class="m-service-card__content m-service-card__content--back">
                        <h4 class="m-service-card__title">${data.name}</h4>
                        <div class="m-service-card__text">
                            ${data.description}
                        </div>
                        <div class="m-service-card__buttons">
                            ${data.customPagePath && `<a href="${data.customPagePath}" class="button js-service-link">${this.content.moreButton.text}</a>` || '' }
                            ${this.content.contactButton.link && `<a href="${getContactUrl(this.content.contactButton.link)}" class="button button--primary m-service-card__button-contact">${this.content.contactButton.text}</a>` }
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;
    },
    async getServicesByCategory(category) {
        const items = $('.m-sh__items');
        items.addClass('m-sh__items--anime-out').removeClass('m-sh__items--anime-in');
        const services = await ServicesService.getServicesByIds(this.services_hubdb, category.favorites);
        const list = $('.m-sh__list');
        list.show();
        setTimeout(() => {
            items.html('');
            for(const service of services) {
                items.append(this.getCardTmpl(service, category));
            }
            items.removeClass('m-sh__items--anime-out').addClass('m-sh__items--anime-in');
        }, 400);
        list.scrollToTop({duration: 500});
        this.setCategoryLink(category.path);
    },
    async getPopularServices() {
        const services = await ServicesService.getPopularServices(this.services_hubdb);
        const container = $('.m-popular-services__slider');
        for(const service of services) {
            container.append(`<div>${this.getCardTmpl(service)}</div>`);
        }
        this.initPopularSlider();
    },
    setCategoryLink(categorySlug) {
        const mainPage = element.attr('data-category-link');
        const button = $('.m-service-brand__category-link');
        button.attr('href', `${mainPage}/${categorySlug}`);
    },
};
ServicesHome.init();
