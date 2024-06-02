const buttons = document.querySelectorAll('.clickable-area-module__button');
const parentWrapper = document.querySelector('.clickable-area-module');
const paddingButton = 32;

const countPosition = function() {
    for (button of buttons) {
        const relText = document.querySelector('#clickableAreaModuleTextSection'+button.dataset.textNumber);
        relText.style.maxHeight = parentWrapper.offsetHeight+'px';
        
        if( button.offsetLeft>(parentWrapper.offsetWidth/2) ) {
            //text should be on the left side
            relText.style.maxWidth = (parentWrapper.offsetWidth - (parentWrapper.offsetWidth-button.offsetLeft) - paddingButton)+'px';
            
            //set top offset
            let textTopOffset = (button.offsetTop+button.offsetHeight/2) - Math.floor(relText.offsetHeight/2);
            textTopOffset = textTopOffset < 0 ? 0 : textTopOffset;
            textTopOffset = (textTopOffset+ relText.offsetHeight) > parentWrapper.offsetHeight ? parentWrapper.offsetHeight-relText.offsetHeight : textTopOffset;
            relText.style.top = textTopOffset +'px';

            //set left offset
            let  textLeftOffset = (button.offsetLeft - paddingButton - relText.offsetWidth);
            relText.style.left = textLeftOffset +'px';
        } else {
            //text should be on the right side
            relText.style.maxWidth = (parentWrapper.offsetWidth - button.offsetLeft - button.offsetWidth - paddingButton)+'px';
            
            //set top offset
            let textTopOffset = (button.offsetTop+button.offsetHeight/2) - Math.floor(relText.offsetHeight/2);
            textTopOffset = textTopOffset < 0 ? 0 : textTopOffset;
            relText.style.top = textTopOffset +'px';

            //set left offset
            let  textLeftOffset = (button.offsetLeft + button.offsetWidth + paddingButton);
            relText.style.left = textLeftOffset +'px';
        }
    }
}

const clickableModuleAddEvents = function() {
    for (button of buttons) {
        const relText = document.querySelector('#clickableAreaModuleTextSection'+button.dataset.textNumber);
        relText.style.maxHeight = parentWrapper.offsetHeight+'px';
        
        button.addEventListener('mouseenter', event=>{
            relText.classList.add('hovered');
        });
        
        button.addEventListener('mouseout', event=>{
            relText.classList.remove('hovered');
        });
    }

    window.addEventListener('resize',()=>{
        countPosition();
    })
}

const clickableModuleInit = function() {
    setTimeout(()=>{
        countPosition();
        clickableModuleAddEvents();
    },100);
}

clickableModuleInit();