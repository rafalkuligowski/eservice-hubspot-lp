const items = document.querySelectorAll('.accordion-module__item');
const buttonsElements = document.querySelectorAll('.accordion-module__label');
const contents = document.querySelectorAll('.accordion-module__content');
const getHeightAllChilds = (parentEl) => {
    const elements = [...parentEl.children];
    return elements.reduce(function(prev, current) {
        return $(current).outerHeight(true) + prev;
    }, 0);
};

for (let button of buttonsElements) {
    button.addEventListener('click', (event)=>{
        const parent = event.target.closest('.accordion-module__item');
        const content = parent.querySelector('.accordion-module__content');
        const isOpened = parent.classList.contains('opened');
        const height = getHeightAllChilds(content)+15;

        const openedElements = document.querySelectorAll('.accordion-module__wrapper .opened');

        for (item of openedElements) {
            if (item !== parent) {
                item.classList.remove('opened');
            }
        }

        $(contents).css('max-height', '0px');
        $(parent).removeClass('opened');
        if (!isOpened){
            $(content).css('max-height', `${height}px`);
            $(parent).addClass('opened');
        } else {
            $(content).css('max-height', '0px');
            $(parent).removeClass('opened');
        }
    })
}
