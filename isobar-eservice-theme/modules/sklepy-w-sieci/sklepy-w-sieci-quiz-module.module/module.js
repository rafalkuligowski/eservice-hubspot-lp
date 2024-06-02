const resultWrapper = document.querySelector('.sws-quiz-module__results-wrapper');
resultWrapper.style.marginTop = '-' + resultWrapper.offsetHeight + 'px';

window.addEventListener('message', event => {
    if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
        const inputs = document.querySelectorAll('.sws-quiz-module__form ul[role="checkbox"] input');
        const results = document.querySelectorAll('.sws-quiz-module__result');
        const form = document.querySelectorAll('.sws-quiz-module__form form');
        const maxItems = parseInt(inputs[inputs.length-1].value.split('_')[0]);
        let fillIndex = 0;
        let resultArray = [];

        for(let input of inputs) {
            input.addEventListener('change', event=>{
                let tempVal = input.value.split('_');
                resultArray[parseInt(tempVal[0]) - 1] = tempVal[1];
                
                fillIndex=0;
                resultArray.map(value=>{
                    fillIndex++;
                });

                if(fillIndex === maxItems) {
                    const resultString = resultArray.join(',');
                    let itemSelected = false;

                    for (let result of results){
                        result.classList.remove('selected');
                        const DOMelementResultArray = result.dataset.resultString.split(';');
                        if(!itemSelected && DOMelementResultArray.includes(resultString)){
                            itemSelected = true;
                            result.classList.add('selected');
                            resultWrapper.style.marginTop = '-' + resultWrapper.offsetHeight + 'px';
                            resultWrapper.classList.add('animated');
                            resultWrapper.style.marginTop = 0;
                        }
                    }
                }
            });
        }
    }
 });
       