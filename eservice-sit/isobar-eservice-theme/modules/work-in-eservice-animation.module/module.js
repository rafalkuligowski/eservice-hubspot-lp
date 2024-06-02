const items = document.querySelectorAll('.work-in-eservice-animation__item');
const buttonsElements = document.querySelectorAll('.work-in-eservice-animation__header');

for (let button of buttonsElements) {
    button.addEventListener('click', (event)=>{
        const parent = event.target.closest('.work-in-eservice-animation__item');
        const isOpened = parent.classList.contains('opened');
        if (!isOpened){
            parent.classList.add('opened');
        } else {
            parent.classList.remove('opened');
        }
    })
}


(function(){
	function hasClass(el, cls) {
		if (el.className.match('(?:^|\\s)'+cls+'(?!\\S)')) { return true; } 
		}
	function addClass(el, cls) {
		if (!el.className.match('(?:^|\\s)'+cls+'(?!\\S)')) { el.className += ' '+cls; } 
		}
	function delClass(el, cls) {
		el.className = el.className.replace(new RegExp('(?:^|\\s)'+cls+'(?!\\S)'),'');
		}

	function elementFromTop(elem, classToAdd, distanceFromTop, unit) {
		var winY = window.innerHeight || document.documentElement.clientHeight, 
		elemLength = elem.length, distTop, distPercent, distPixels, distUnit, i;
		for (i = 0; i < elemLength; ++i) {
			distTop = elem[i].getBoundingClientRect().top;
			distPercent = Math.round((distTop / winY) * 100);
			distPixels = Math.round(distTop);
			distUnit = unit == 'percent' ? distPercent : distPixels;
			if (distUnit <= distanceFromTop) {
				if (!hasClass(elem[i], classToAdd)) { addClass(elem[i], classToAdd); }
				} 
        // else {
				// delClass(elem[i], classToAdd);
				// }
			}
		}
	// params: element, classes to add, distance from top, unit ('percent' or 'pixels')

	window.addEventListener('scroll', function() {
		elementFromTop(document.querySelectorAll('.work-in-eservice-animation__wrapper'),       'work-in-eservice-animation__wrapper_active',       50, 'percent');
	}, false);

	window.addEventListener('resize', function() {
		elementFromTop(document.querySelectorAll('.work-in-eservice-animation__wrapper'),       'work-in-eservice-animation__wrapper_active',       50, 'percent');
	}, false);
})();