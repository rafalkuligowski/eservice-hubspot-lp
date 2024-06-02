const Questionnaire = {
    init() {
        this.events();
    },
    events() {
        const switcher = $('.contact-switcher');
        const subjectSelect = $('.contact-switcher__select');
        // const addModel = $('.add-model-active');
        // const addCustomModel = $('.shadow-box__add-custom-model');
        // const nipNumber = $('.shadow-box__nip');
        // const boxes = $('.shadow-box__number-of-devices');
        switcher.on('click', '.c-switch', (e) => {
            $('.contact-switcher__item').removeClass('arrowed');
            $('.c-switch').removeClass('c-switch--active');
            $(e.currentTarget).addClass('c-switch--active');
            this.switchContainers($(e.currentTarget).attr('id'));
        });
        $('.contact-switcher__item').removeClass('arrowed');
        this.showTab('client');

        subjectSelect.on('change', (e) => {
            const tabId = $(e.currentTarget).val();
            this.showTab(tabId);
        });
    },
    clickEvent(addModel) {
        addModel.unbind('click');
        addModel.on('click', () => {
            if (this.checkMaxModels()) return;
            const clone = addModel[0].parentElement.cloneNode(true);
            addModel.removeClass('add-model-active');
            const box = $('.shadow-box__container-box');
            box[0].appendChild(clone);
            this.clickEvent($('.add-model-active'));
        });
    },
    showTab(tabId = 0) {
        $('.contact-tab').hide();
        $(`.contact-tab[data-id="${tabId}"]`).show();
    },
    hideTabs() {
        $('.contact-tab').hide();
    },
    switchContainers(element) {
        $('.contact-switcher__content').hide();
        if (element === 'cooperation-module') {
            this.showTab('cooperation-module');
            setTimeout(() => {
                $('.contact-switcher').scrollToTop({ duration: 500, behaviour: 'smooth' });
            }, 500);
        }
        if (element === 'client') {
            this.showTab('client');
            $('.contact-tabs').scrollToTop({ duration: 500, behaviour: 'smooth' });
        }
    },
};
Questionnaire.init();
