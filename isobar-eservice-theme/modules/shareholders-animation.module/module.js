const buttonsElementsLink = document.querySelectorAll('.shareholder-module__button__more');
const buttonsElements = document.querySelectorAll('.shareholder-module__button');
const chartElements = document.querySelectorAll('.shareholder-module__circle');
const tabsElements = document.querySelectorAll('.shareholder-module__content');
const tabsPercentage = document.querySelectorAll('.shareholder-module__percent');

for (let link of buttonsElementsLink) {
    link.addEventListener('click', (event)=>{
        const tabId = link.getAttribute('data-tab');

        for (let chart of chartElements) {
            const chartOpened = chart.classList.contains('animate__progress');
            if (chart.getAttribute('data-tab') === tabId) {
                chart.classList.remove('animate__regress');
                chart.classList.add('animate__progress');
            } else {
                if (chartOpened){
                    chart.classList.add('animate__regress');
                    chart.classList.remove('animate__progress');
                }
            }
		};
        for (let tab of tabsElements) {
            const tabOpened = tab.classList.contains('animate__fadeInUp');
            if (tab.getAttribute('data-tab') === tabId) {
                tab.classList.remove('animate__fadeOutUp');
                tab.classList.add('animate__fadeInUp');
            } else {
                if (tabOpened){
                    tab.classList.add('animate__fadeOutUp');
                    tab.classList.remove('animate__fadeInUp');
                }
            }
		};
        for (let button of buttonsElements) {
            const buttonActive = button.classList.contains('shareholder-module__button_active');
            if (button.getAttribute('data-tab') === tabId) {
                button.classList.add('shareholder-module__button_active');
            } else {
                button.classList.remove('shareholder-module__button_active');
            }
		};
        for (let percentage of tabsPercentage) {
            const percentageActive = percentage.classList.contains('shareholder-module__percent_active');
            if (percentage.getAttribute('data-tab') === tabId) {
                percentage.classList.add('shareholder-module__percent_active');
            } else {
                percentage.classList.remove('shareholder-module__percent_active');
            }
        };
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
		elementFromTop(document.querySelectorAll('.shareholder-module__wrapper'),       'shareholder-module__wrapper_active',       50, 'percent');
	}, false);

	window.addEventListener('resize', function() {
		elementFromTop(document.querySelectorAll('.shareholder-module__wrapper'),       'shareholder-module__wrapper_active',       50, 'percent');
    }, false);
})();