const buttons = document.querySelectorAll('.phone-button-module .cover');

buttons.forEach(button => {
    button.addEventListener('click',(e)=>{
        const parent = e.currentTarget.closest('.phone-button-module');
        const siblings = parent.querySelectorAll('.button--secondary');
        e.target.classList.add('phone-button--hidden');
        siblings.forEach((item)=>{
            item.classList.remove('phone-button--hidden');
        })
    });
});