setTimeout(
    ()=>{
        for(item of document.querySelectorAll('.button-picker__cta-wrapper')) {
            item.id = "";
            const textToSwitch = item.querySelector('.text-to-switch');
            textToSwitch.classList.remove('text-to-switch');
            const ctaItem = item.querySelector('.hs-cta-node a');
            if (ctaItem.querySelector('span')) {
                ctaItem.querySelector('span').replaceWith(textToSwitch.textContent);
            }
            if (ctaItem.querySelector('strong')) {
                ctaItem.querySelector('strong').replaceWith(textToSwitch.textContent);
            }
            if (ctaItem.querySelector('img')) {
                ctaItem.querySelector('img').replaceWith(textToSwitch.textContent);
            }
            
            ctaItem.classList = textToSwitch.classList;
            textToSwitch.remove();
        };
    }, 500);