const TopBanner = {
    cookieKey: 'TOP_BANNER_SEEN',
    cookieExpDays: 0.5,
    classes: {
        topBannerEl: 'js-top-banner',
        closeBtn: 'js-top-banner-close',
        enableBanner: 'top-banner--enable',
    },
    init() {
        this.setBannerState();
        this.events();
    },
    events() {
        const { closeBtn } = this.classes;
        $(`.${closeBtn}`).on('click', () => this.hideBanner());
    },
    hideBanner() {
        const { topBannerEl } = this.classes;
        $(`.${topBannerEl}`).slideUp();
        this.setSessionValue(true);
    },
    setBannerState() {
        const { topBannerEl, enableBanner } = this.classes;
        const $topBannerEl = $(`.${topBannerEl}`);
        const seen = this.getSessionValue();
        if (seen) {
            $topBannerEl.removeClass(enableBanner);
        } else {
            $topBannerEl.addClass(enableBanner);
        }
    },
    /*
    Based on: https://www.w3schools.com/js/js_cookies.asp
     */
    getSessionValue() {
        const name = this.cookieKey + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
    },
    /*
    Based on: https://www.w3schools.com/js/js_cookies.asp
     */
    setSessionValue(value) {
        const d = new Date();
        d.setTime(d.getTime() + (this.cookieExpDays * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        document.cookie = this.cookieKey + '=' + value + ';' + expires + ';path=/';
    },
};
TopBanner.init();
