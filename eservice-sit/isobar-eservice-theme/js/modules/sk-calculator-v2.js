const skCalculator = {
    init: function () {
        this.attachEvents();
    },
    elements: {
        inputs: document.querySelectorAll('#skCalculator select'),
        showOffer: document.querySelector('#showOffer'),
        results: document.querySelector('.sk-calculator__results-wrapper'),
        fillable: document.querySelectorAll('.sk-calculator__results-wrapper td:not(.table-title)'),
        hidableDocuments: document.querySelectorAll('.hideable'),
        positiveFillable: document.querySelectorAll('.positiveResponse td:not(.table-title)'),
        positiveResponseSection: document.querySelectorAll('.positiveResponse'),
        negativeResponseSection: document.querySelectorAll('.negativeResponse'),
        packageNumberPositive: document.querySelector('#packageNumberPositive'),
        packageNumberNegative: document.querySelector('#packageNumberNegative'),
        visaCommissionPositive: document.querySelector('#visaCommissionPositive'),
        visaCommissionNegative: document.querySelector('#visaCommissionNegative'),
        masterCardCommissionPositive: document.querySelector('#masterCardCommissionPositive'),
        masterCardCommissionNegative: document.querySelector('#masterCardCommissionNegative'),
        pennyCommissionPositive: document.querySelector('#pennyCommissionPositive'),
        pennyCommissionNegative: document.querySelector('#pennyCommissionNegative'),
        // earningForDealPositive: document.querySelector('#earningForDealPositive'),
        // earningForDealNegative: document.querySelector('#earningForDealNegative'),
        // earningForLeadPositive: document.querySelector('#earningForLeadPositive'),
        // earningForLeadNegative: document.querySelector('#earningForLeadNegative'),
        packageNumberPositiveMobile: document.querySelector('#packageNumberPositiveMobile'),
        packageNumberNegativeMobile: document.querySelector('#packageNumberNegativeMobile'),
        visaCommissionPositiveMobile: document.querySelector('#visaCommissionPositiveMobile'),
        visaCommissionNegativeMobile: document.querySelector('#visaCommissionNegativeMobile'),
        masterCardCommissionPositiveMobile: document.querySelector('#masterCardCommissionPositiveMobile'),
        masterCardCommissionNegativeMobile: document.querySelector('#masterCardCommissionNegativeMobile'),
        pennyCommissionPositiveMobile: document.querySelector('#pennyCommissionPositiveMobile'),
        pennyCommissionNegativeMobile: document.querySelector('#pennyCommissionNegativeMobile'),
        // earningForDealPositiveMobile: document.querySelector('#earningForDealPositiveMobile'),
        // earningForDealNegativeMobile: document.querySelector('#earningForDealNegativeMobile'),
        // earningForLeadPositiveMobile: document.querySelector('#earningForLeadPositiveMobile'),
        // earningForLeadNegativeMobile: document.querySelector('#earningForLeadNegativeMobile'),
        hidablePaxElements: document.querySelectorAll('.pax-hide')
    },
    attachEvents: function () {
        this.elements.inputs.forEach(item => {
            item.addEventListener('change', this.methods.inputOnChange)
        });
        this.elements.showOffer.addEventListener('click', this.methods.showOfferClick);
    },
    methods: {
        inputOnChange: event => {
            const _self = skCalculator;
            if (_self.methods.checkIfFilled()) {
                _self.elements.showOffer.classList.remove('disabled');
            } else {
                _self.elements.showOffer.classList.add('disabled');
            }
        },
        checkIfFilled: function () {
            const _self = skCalculator;
            let result = true;
            _self.elements.inputs.forEach(item => {
                if (item.value === '0') {
                    result = false;
                }
            });
            return result;
        },
        showOfferClick: function () {
            const _self = skCalculator;
            _self.methods.hidePwob();
            _self.methods.hideDocuments();
            _self.methods.clearFillable();
            _self.methods.countAndSet();
            _self.methods.showResults();
        },
        clearFillable: function () {
            const _self = skCalculator;
            _self.elements.fillable.forEach(item => {
                item.innerHTML = '';
            })
        },
        escapeCharacters: function (textToEscape) {
            const escapeFunction = function (text, characterToReplace, replaceCharacter) {
                while (text.indexOf(characterToReplace) > -1) {
                    text = text.replace(characterToReplace, replaceCharacter);
                }
                return text;
            }
            textToEscape = escapeFunction(textToEscape, '/', '');
            textToEscape = escapeFunction(textToEscape, 'ó', 'o');
            textToEscape = escapeFunction(textToEscape, 'ż', 'z');
            textToEscape = escapeFunction(textToEscape, 'ł', 'l');
            textToEscape = escapeFunction(textToEscape, ' ', '');
            return textToEscape;
        },
        hidePwob: function () {
            const _self = skCalculator;
            _self.elements.positiveResponseSection.forEach(item => {
                item.classList.add('hidden');
            });
            _self.elements.negativeResponseSection.forEach(item => {
                item.classList.add('hidden');
            });
        },
        showPwob: function () {
            const _self = skCalculator;
            _self.elements.positiveResponseSection.forEach(item => {
                item.classList.remove('hidden');
            });
            _self.elements.negativeResponseSection.forEach(item => {
                item.classList.remove('hidden');
            });
        },
        hidePax: function () {
            const _self = skCalculator;
            _self.elements.hidablePaxElements.forEach(item => {
                item.classList.add('hidden');
            });
        },
        showPax: function () {
            const _self = skCalculator;
            _self.elements.hidablePaxElements.forEach(item => {
                item.classList.remove('hidden');
            });
        },
        showResults: function () {
            const _self = skCalculator;
            _self.elements.results.classList.remove('hidden');
        },
        hideDocuments: function () {
            const _self = skCalculator;
            _self.elements.hidableDocuments.forEach(item => {
                item.classList.add('hidden');
            });
        },
        showDocument: function (id) {
            const documentEle = document.querySelector(id);
            if (documentEle) {
                documentEle.classList.remove('hidden')
            }
        },
        countAndSet: function () {
            const _self = skCalculator;
            _self.methods.showPax();
            if (_self.methods.checkIfFilled()) {
                let pwI = parseInt(document.querySelector('#skCalculatorPackage').value);
                let pw = 0;
                let pwAlt = 0;
                let comm = ['w1', 'w2', 'w3'];
                const packType = ['Standard', 'Max'];
                const commType = ['Simple', 'Complex']
                // if (pwI === 1 || pwI === 3) {
                //     pw = 2;
                //     pwAlt = 0
                // }  else {
                //     pw = 2;
                //     pwAlt = 1;
                // }
                //as there are only standard version in v2
                pw = 2;
                pwAlt = 1;
                const packageCalcucator = document.querySelector('#skCalculatorPackage');
                if (packageCalcucator.options[packageCalcucator.selectedIndex].text === 'Komercyjna – STANDARD') {
                    pwAlt = 0;
                }
                let temp = window.skCalculator.naj[document.querySelector('#skCalculatorTerminal').value - 1];

                if (parseInt(document.querySelector('#skCalculatorTerminal').value) === 8) {
                    _self.methods.hidePax();
                    _self.elements.packageNumberPositive.innerHTML = temp[pw];
                    _self.elements.packageNumberNegative.innerHTML = "Brak oferty";
                    _self.elements.packageNumberPositiveMobile.innerHTML = temp[pw];
                    _self.elements.packageNumberNegativeMobile.innerHTML = "Brak oferty";

                    temp = window.skCalculator[comm[document.querySelector('#skCalculatorCommission').value - 1]][document.querySelector('#skCalculatorProfile').value - 1];
                    _self.elements.visaCommissionPositive.innerHTML = window.skCalculator.w3[0][0];
                    _self.elements.visaCommissionNegative.innerHTML = "Brak oferty";
                    _self.elements.visaCommissionPositiveMobile.innerHTML = window.skCalculator.w3[0][0];
                    _self.elements.visaCommissionNegativeMobile.innerHTML = "Brak oferty";

                    _self.elements.masterCardCommissionPositive.innerHTML = window.skCalculator.w3[0][1];
                    _self.elements.masterCardCommissionNegative.innerHTML = "Brak oferty";
                    _self.elements.masterCardCommissionPositiveMobile.innerHTML = window.skCalculator.w3[0][1];
                    _self.elements.masterCardCommissionNegativeMobile.innerHTML = "Brak oferty";

                    _self.elements.pennyCommissionPositive.innerHTML = window.skCalculator.w3[0][2] + " " + window.skCalculator.currency;
                    _self.elements.pennyCommissionNegative.innerHTML = "Brak oferty";
                    _self.elements.pennyCommissionPositiveMobile.innerHTML = window.skCalculator.w3[0][2] + " " + window.skCalculator.currency;
                    _self.elements.pennyCommissionNegativeMobile.innerHTML = "Brak oferty";
                } else {
                    _self.elements.packageNumberPositive.innerHTML = temp[pw];
                    _self.elements.packageNumberNegative.innerHTML = temp[pwAlt];
                    _self.elements.packageNumberPositiveMobile.innerHTML = temp[pw];
                    _self.elements.packageNumberNegativeMobile.innerHTML = temp[pwAlt];

                    temp = window.skCalculator[comm[document.querySelector('#skCalculatorCommission').value - 1]][document.querySelector('#skCalculatorProfile').value - 1];
                    _self.elements.visaCommissionPositive.innerHTML = window.skCalculator.w3[0][0];
                    _self.elements.visaCommissionNegative.innerHTML = temp[pwAlt];
                    _self.elements.visaCommissionPositiveMobile.innerHTML = window.skCalculator.w3[0][0];
                    _self.elements.visaCommissionNegativeMobile.innerHTML = temp[pwAlt];

                    _self.elements.masterCardCommissionPositive.innerHTML = window.skCalculator.w3[0][1];
                    _self.elements.masterCardCommissionNegative.innerHTML = temp[pwAlt];
                    _self.elements.masterCardCommissionPositiveMobile.innerHTML = window.skCalculator.w3[0][1];
                    _self.elements.masterCardCommissionNegativeMobile.innerHTML = temp[pwAlt];

                    _self.elements.pennyCommissionPositive.innerHTML = window.skCalculator.w3[0][2] + " " + window.skCalculator.currency;
                    _self.elements.pennyCommissionNegative.innerHTML = temp[2] + " " + window.skCalculator.currency;
                    _self.elements.pennyCommissionPositiveMobile.innerHTML = window.skCalculator.w3[0][2] + " " + window.skCalculator.currency;
                    _self.elements.pennyCommissionNegativeMobile.innerHTML = temp[2] + " " + window.skCalculator.currency;
                }

                if (parseInt(document.querySelector('#skCalculatorTerminal').value) === 8) {
                    // _self.elements.earningForDealPositive?.innerHTML = parseInt(window.skCalculator.end[0][3]) +" "+window.skCalculator.currency;
                    // _self.elements.earningForLeadPositive?.innerHTML = parseInt(window.skCalculator.end[1][3]) + " " + window.skCalculator.currency;
                    // _self.elements.earningForDealPositiveMobile?.innerHTML = parseInt(window.skCalculator.end[0][3]) +" "+window.skCalculator.currency;
                    // _self.elements.earningForLeadPositiveMobile?.innerHTML = parseInt(window.skCalculator.end[1][3]) + " " + window.skCalculator.currency;
                } else {
                    // _self.elements.earningForDealPositive?.innerHTML = (parseInt(window.skCalculator.end[0][2]) + parseInt(window.skCalculator.end[2][2])*12) +" "+window.skCalculator.currency;
                    // _self.elements.earningForDealNegative?.innerHTML = (parseInt(window.skCalculator.end[0][pwAlt]) + parseInt(window.skCalculator.end[2][pwAlt])*12) +" "+window.skCalculator.currency;
                    // _self.elements.earningForLeadPositive?.innerHTML = parseInt(window.skCalculator.end[1][2]) + " " + window.skCalculator.currency;
                    // _self.elements.earningForLeadNegative?.innerHTML = parseInt(window.skCalculator.end[1][pwAlt]) +" "+window.skCalculator.currency;
                    // _self.elements.earningForDealPositiveMobile?.innerHTML = (parseInt(window.skCalculator.end[0][2]) + parseInt(window.skCalculator.end[2][2])*12) +" "+window.skCalculator.currency;
                    // _self.elements.earningForDealNegativeMobile?.innerHTML = (parseInt(window.skCalculator.end[0][pwAlt]) + parseInt(window.skCalculator.end[2][pwAlt])*12) +" "+window.skCalculator.currency;
                    // _self.elements.earningForLeadPositiveMobile?.innerHTML = parseInt(window.skCalculator.end[1][2]) + " " + window.skCalculator.currency;
                    // _self.elements.earningForLeadNegativeMobile?.innerHTML = parseInt(window.skCalculator.end[1][pwAlt]) +" "+window.skCalculator.currency;
                }
                let packageName = "";
                if (parseInt(document.querySelector('#skCalculatorTerminal').value) === 8) {
                    packageName = "#paxLead";
                } else {
                    packageName = '#' + _self.methods.escapeCharacters(window.skCalculator.profiles[document.querySelector('#skCalculatorProfile').value - 1]) + packType[pwAlt] + commType[document.querySelector('#skCalculatorCommission').value - 1];
                }
                _self.methods.showDocument(packageName);

                if (pwI < 3) {
                    _self.methods.showPwob();
                }
            }
        }

    }
}

skCalculator.init();
