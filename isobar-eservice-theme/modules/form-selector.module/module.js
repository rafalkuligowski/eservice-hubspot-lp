let formSelectorModule = {
    init: function() {
        for (element of this.selectorElements){
            element.addEventListener('click', (event)=>{
                const   selector = event.currentTarget,
                        formId = '#'+selector.dataset.target;
                this.closeAll();
                this.open(selector, formId);
            })
        }
    },
    selectorElements: document.querySelectorAll('.form-selector__button'),
    forms: document.querySelectorAll('.form-selector__form-wrapper'),
    open: function (selectorElement, formId){
        selectorElement.classList.add('selected');
        document.querySelector(formId).classList.remove('hidden');
    },
    closeAll: function(){
        for (element of this.selectorElements) {
            element.classList.remove('selected');
        }
        for (form of this.forms) {
            form.classList.add('hidden');
        }
    }
}

formSelectorModule.init();