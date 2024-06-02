//click propagating mechanics
const clickableElem = document.querySelectorAll('.external-link-box__wrapper.click-propagator');

for (item of clickableElem) {
    item.addEventListener('click', evt=>{
        const parentWrap = evt.target.closest('.click-propagator');
        const propagateTarget = parentWrap.querySelector('a');
        if (propagateTarget !== evt.target) {
            propagateTarget.click();
        }
    })
}