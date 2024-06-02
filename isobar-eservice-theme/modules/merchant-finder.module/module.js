const merchantFinder = {
    init: function(source) {
        const _self = merchantFinder;

        _self.variables.source = source;
        _self.methods.setVoivodeshipList(source);
        _self.methods.setupVoivodeOptions(source);
        _self.events.attachEvents();
    },
    variables: {
        source: [],
        voivodeshipList: [],
        activeMode: null,
        radius: null,
        voivodeship: null,
        currentPosition: new Object(),
        geolocationInited: false,
        counted: false,
        loading: false
    },
    classess: {
        voivodeshipSelector: 'merchantFinder-voivodeshipSelector',
        radiusInput: 'merchantFinder-radiusInput',
        modeSelectButtons: 'merchantFinder-modeSelect',
        modeWrapper: 'merchant-finder-module__mode-input',
        resultsButton: 'merchant-finder-module__results-button',
        resultsContainer: 'results-wrapper',
        errorsWrapper: 'merchant-finder-module__errors'
    }, 
    errors: {
        geolocation: false,
        counting: false
    },
    events: {
        modeSelect: function(event){
            const _self = merchantFinder;
            const mode = event.currentTarget.dataset.mode;
            _self.methods.cleanActiveMode();
            _self.methods.setActiveMode(mode);
            
            if((mode === 'radius-mode' || mode === 'closest-mode') && _self.variables.geolocationInited === false ){
                _self.methods.geolocationInit();
            }
        },
        attachEvents: function(){
            const _self = merchantFinder;
            const modeSlectorByttons = document.querySelectorAll(`.${_self.classess.modeSelectButtons}`);
            const resultsButton = document.querySelector(`.${_self.classess.resultsButton}`);
            const voivodeshipSelector = document.querySelector(`.${_self.classess.voivodeshipSelector}`);
            const radiusInput = document.querySelector(`.${_self.classess.radiusInput}`);

            for (let button of modeSlectorByttons) {
                button.addEventListener('click', _self.events.modeSelect);
            }
            voivodeshipSelector.addEventListener('change', function(event){
                _self.variables.voivodeship = event.currentTarget.value;
                _self.methods.setResultsButton();
            });
            radiusInput.addEventListener('change', function(event){
                _self.variables.radius = parseFloat(event.currentTarget.value);
                _self.methods.setResultsButton();
            });
            resultsButton.addEventListener('click', _self.methods.showResults);
        }
    },
    methods: {
        setVoivodeshipList: function(source){
            const _self = merchantFinder;
            source.map(item=>{
                if(!_self.variables.voivodeshipList.includes(item.voivodeship)){
                    _self.variables.voivodeshipList.push(item.voivodeship);
                }
            });
        },
        setupVoivodeOptions: function(){
            const _self = merchantFinder;
            const selector = document.querySelector(`.${_self.classess.voivodeshipSelector}`)
            _self.variables.voivodeshipList.map(voivodeship=>{
                const element = document.createElement('option');
                element.value = voivodeship;
                element.appendChild(document.createTextNode(voivodeship));
                selector.appendChild(element);
            });
        },
        getResults: function() {
            const _self = merchantFinder;
            return new Promise(resolve=>{
                if (_self.variables.activeMode==='voivodeship-mode'){
                    resolve(_self.variables.source);
                }
                else if(!_self.variables.geolocationInited) {
                    navigator.geolocation.getCurrentPosition(position=>{
                        _self.variables.currentPosition = position;
                        _self.variables.geolocationInited = true;
                        resolve(_self.methods.countDistancesToMerchants());
                    }, ()=>{
                        _self.errors.geolocation = true;
                        _self.methods.showErrors();
                    })
                } else {
                    resolve(_self.methods.countDistancesToMerchants());
                }
            });
        },
        geolocationInit: function(){
            const _self = merchantFinder;
            _self.methods.getResults();
        },
        countDistancesToMerchants: function(){
            const _self = merchantFinder;
            const pointA = {
                'latitude': parseFloat(_self.variables.currentPosition.coords.latitude),
                'longitude': parseFloat(_self.variables.currentPosition.coords.longitude)
            }

            if(!_self.variables.counted) {
                for (let i=0;i<_self.variables.source.length;i++){
                    if(_self.variables.source[i].coordinates && _self.variables.source[i].coordinates.length>0){
                        let pointDataset = _self.variables.source[i].coordinates.split(', ');
                        let pointB = {
                            'latitude': parseFloat(pointDataset[0]),
                            'longitude': parseFloat(pointDataset[1])
                        }
                        _self.variables.source[i]['distance'] = _self.methods.pointsDiffer(pointA, pointB);
                    }
                }   
                _self.variables.counted = true;
            } 

            return _self.variables.source;
        },
        cleanActiveMode: function(){
            const _self = merchantFinder;
            const modeWrapper = document.querySelector(`.${_self.classess.modeWrapper}`);
            const modeSlectorByttons = document.querySelectorAll(`.${_self.classess.modeSelectButtons}`);

            for(let button of modeSlectorByttons) {
                button.classList.remove('active');
            }
            modeWrapper.className = `${_self.classess.modeWrapper}`;
            _self.methods.hideResultsButton();
        },
        setActiveMode: function(mode){
            const _self = merchantFinder;
            const modeWrapper = document.querySelector(`.${_self.classess.modeWrapper}`);
            const activeButton = document.querySelector(`[data-mode=${mode}]`)

            _self.variables.activeMode = mode;
            modeWrapper.classList.add(_self.variables.activeMode);
            activeButton.classList.add('active');
            _self.methods.setResultsButton();
            _self.methods.hideErrors();

        },
        setResultsButton: function(){
            const _self = merchantFinder;
            const resultsButton = document.querySelector(`.${_self.classess.resultsButton}`);
            const conditionVoivodeship = _self.variables.activeMode && _self.variables.activeMode === 'voivodeship-mode' && _self.variables.voivodeship;
            const conditionRadius = _self.variables.activeMode && _self.variables.activeMode === 'radius-mode' && _self.variables.radius;
            const conditionClosest = _self.variables.activeMode && _self.variables.activeMode === 'closest-mode';
            if(conditionVoivodeship || conditionRadius || conditionClosest) {
                resultsButton.classList.remove('disabled');
            }
        },
        hideResultsButton: function(){
            const _self = merchantFinder;
            const resultsButton = document.querySelector(`.${_self.classess.resultsButton}`);
            resultsButton.classList.add('disabled');

        },
        getDistance: function(lat1, lat2, lon1, lon2) {
            if ((lat1 === lat2) && (lon1 === lon2)) {
                return 0;
            }
    
            const radlat1 = Math.PI * lat1 / 180;
            const radlat2 = Math.PI * lat2 / 180;
            const theta = lon1 - lon2;
            const radtheta = Math.PI * theta / 180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
    
            return Math.round(dist * 1.609344 * 1000) / 1000;
        },
        pointsDiffer: function(pointA, pointB){
            const _self = merchantFinder;
            return _self.methods.getDistance(pointA.latitude, pointB.latitude, pointA.longitude, pointB.longitude);
        },
        filterResults: function(srcResults){
            
            const _self = merchantFinder;
            let results = [];

            switch (_self.variables.activeMode) {
                case 'closest-mode':
                    for(row of srcResults){
                        const temp = row;
                        if(temp.distance && (results.length === 0 || temp.distance<results[0].distance)){
                            results[0] = temp;
                        };
                    }
                    break;
                case 'radius-mode':
                    for(row of srcResults){
                        const temp = row;
                        if(temp.distance && (temp.distance<=_self.variables.radius)){
                            results.push(temp);
                        };
                    }
                    break;
                case 'voivodeship-mode':
                    for(row of srcResults){
                        const temp = row;
                        if(temp.voivodeship === _self.variables.voivodeship){
                            results.push(temp);
                        };
                    }
                    break;
                default:
                    results = srcResults;
                    break;
            }
            return results;
        },
        showResults: function(){
            const _self = merchantFinder;

            if( !_self.variables.loading ){
                _self.methods.startLoading();
                
                async function callResults() {
                    let results = await _self.methods.getResults();
                    results = _self.methods.filterResults(results);
                    _self.methods.renderResults(results)
                    _self.methods.stopLoading();
                }
                callResults();
            }
        },
        renderResults: function(results) {
            const _self = merchantFinder;
            const resultsContainer = document.querySelector(`.${_self.classess.resultsContainer}`);
            
            //lean results first
            resultsContainer.innerHTML = '';
            if(results.length === 0){
                let temp = document.createElement('div');
                temp.className = 'merchant-finder__empty-results';
                temp.innerHTML = `Niestety, nie znaleziono wyników w podanym zakresie wyszukiwania`;
                resultsContainer.appendChild(temp);
            } else {
                results.map(item=>{
                    let temp = document.createElement('div');
                    temp.className = 'merchant-finder__result-element';
                    temp.innerHTML =  `
                    <span class="company-name">${item.companyName}</span>
                    <span class="street-name">${item.streetName}</span>
                    <span class="city-and-zip">${item.postalCode}, ${item.city}</span>
                    `
                    resultsContainer.appendChild(temp);
                });
            }
        },
        startLoading: function(){
            const _self = merchantFinder;
            const resultsButton = document.querySelector(`.${_self.classess.resultsButton}`);

            _self.variables.loading = true;
            resultsButton.classList.add('loading');
        },
        stopLoading: function(){
            const _self = merchantFinder;
            const resultsButton = document.querySelector(`.${_self.classess.resultsButton}`);

            _self.variables.loading = false;
            resultsButton.classList.remove('loading');
        },
        showErrors: function(){
            const _self = merchantFinder;
            const errorsWrapper = document.querySelector(`.${_self.classess.errorsWrapper}`);

            errorsWrapper.classList.remove('hidden');
        },
        hideErrors: function(){
            const _self = merchantFinder;
            const errorsWrapper = document.querySelector(`.${_self.classess.errorsWrapper}`);
            errorsWrapper.classList.add('hidden');
        }
    }
}

merchantFinder.init(window.merchantFinderSource);