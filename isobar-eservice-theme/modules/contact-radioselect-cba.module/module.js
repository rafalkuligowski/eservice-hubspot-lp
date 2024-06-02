const RadioSelect = {
    init() {
        this.events();
        this.urlParamRead();
        this.checkBox();
    },
    checkBox() {
        const boxes = document.querySelectorAll('.contact-box__cta .shadow-box__wrapper ');
        const shadowBox = document.querySelector('.contact-box__cta');
        if (boxes.length === 1) {
            boxes[0].style.maxWidth = '350px';
            shadowBox.style.alignItems = 'center';
            shadowBox.style.justifyContent = 'center';
        }
    },
    events() {
        const switcher = $('.contact-switcher');
        const subjectSelect = $('.contact-switcher__select');
        switcher.on('click', '.c-switch', (e) => {
            $('.contact-switcher__item').removeClass('arrowed');
            $('.c-switch').removeClass('c-switch--active');
            $(e.currentTarget).addClass('c-switch--active');
            this.switchContainers($(e.currentTarget).attr('id'));
        });

        subjectSelect.on('change', (e) => {
            const tabId = $(e.currentTarget).val();
            this.showTab(tabId);
            $('.contact-tabs').scrollToTop({ duration: 500 });
        });
    },
    showTab(tabId = 0) {
        $('.contact-tab').hide();
        $(`.contact-tab[data-id="${tabId}"]`).show();
    },
    hideTabs() {
        $('.contact-tab').hide();
    },
    urlParamRead() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const brand = urlParams.get('branza');
        const subject = urlParams.get('temat');
        const cooperationElement = $('#cooperation');
        const clientElement = $('#client');

        // if (urlParams.has('branza')) {
        //     cooperationElement.trigger('click');
        //     $(window).on('load', () => {
        //         const historyRefHidden = $('input[name ="history_ref"]');
        //         historyRefHidden.val(brand);
        //     })

        // } else if (urlParams.has('temat')) {
        //     clientElement.trigger('click');
        //     const subjectSelect = $('.contact-switcher__select');
        //     const subjects = subjectSelect.find('option');
        //     subjects.toArray().find(sub => {
        //         if (sub.innerText === subject) {
        //             subjectSelect.val($(sub).val());
        //             subjectSelect.trigger('change');
        //         }
        //     })
        // }
    },
    switchContainers(element) {
        $('.contact-switcher__content').hide();
        if (element === 'cooperation') {
            this.hideTabs();
            this.showTab('cooperation');
            $('.contact-tabs').scrollToTop({ duration: 500 });
        }
        if (element === 'client') {
            this.hideTabs();
            this.showTab('client');
            $('.contact-tabs').scrollToTop({ duration: 500 });
            // const content = $('.contact-switcher__content');
            // content.show();
            // const subjectSelect = $('.contact-switcher__select');
            // const tabId = $(subjectSelect).val();
            // if (tabId) {
            //     this.showTab(tabId);
            //     $('.contact-tabs').scrollToTop({ duration: 500 });
            // }
        }
    },

};
RadioSelect.init();

