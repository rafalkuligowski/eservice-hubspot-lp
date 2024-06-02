setTimeout(
    ()=>{
        for(item of document.querySelectorAll('.shadow-box-side-image__wrapper .cta_button ')) {
            item.id = "";
        };
    }, 500);

//click propagating mechanics
const clickableElem = document.querySelectorAll('.shadow-box-side-image__item.click-propagator');

for (item of clickableElem) {
    item.addEventListener('click', evt=>{
        const parentWrap = evt.target.closest('.click-propagator');
        const propagateTarget = parentWrap.querySelector('a');
        if (propagateTarget !== evt.target) {
            propagateTarget.click();
        }
    })
}