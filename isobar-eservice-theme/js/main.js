(function () {
  // Polyfill for NodeList.prototype.forEach() in IE
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  const eserviceAPP = {
    init: function(){
      this.locale.init();
      this.forms.init();
      this.blogs.init();
    },
    locale: {
      init: function(){
        this.locales = ['en', 'pl'];
        this.pathArray = window.location.pathname.toLowerCase().substr(1).split('/');
        this.current = this.locales.includes(this.pathArray[0]) ? this.pathArray[0]:null;
      },
      locales: [],
      pathArray: [],
      current: ''
    },
    forms: {
      init: function() {
        const formReadyInterval = setInterval(()=>{
          if (eserviceAPP.forms.formElements() &&eserviceAPP.forms.formElements().length>0){
            eserviceAPP.forms.focusingBehaviour();
            window.clearInterval(formReadyInterval);
          };
        },20);
      },
      formElements: ()=>{
        return document.querySelectorAll('form .hs-form-field input, form .hs-form-field text-area');
      },
      focusingBehaviour: ()=>{
        const forms = eserviceAPP.forms;
        for(let element of forms.formElements()) {
          const parent = element.closest('.hs-form-field');

          // todo: refactor
          // element.addEventListener('focusin', ()=>{
          //   parent.classList.add('focused');
          //   parent.classList.remove('valid');
          // });
          //
          // element.addEventListener('focusout', ()=>{
          //   if (
          //     element.type !== 'radio'
          //     && element.type !== 'checkbox'
          //     && element.value !== ""
          //     && !element.classList.contains('error')
          //   ) {
          //     parent.classList.add('valid');
          //   } else {
          //     parent.classList.remove('valid');
          //   }
          //   parent.classList.remove('focused');
          // });
        }
      }
    },
    blogs: {
      init: function() {
        const pathArray = window.location.pathname.toLowerCase().substr(1).split('/');
        if (eserviceAPP.locale.current) {
          this.getTranslations().then(value =>{
            eserviceAPP.blogs.translate(eserviceAPP.locale.current);
          })
        }
      },
      translations: {},
      translationService: {
        apiUrl: 'https://api.hubapi.com/hubdb/api/v2/tables',
        portalId: PORTAL_ID,
        getFields(db) {
            const url = `${this.apiUrl}/${db}/rows?portalId=${this.portalId}`;
            return fetch(url)
                .then(response => response.json())
                .then(data => data['objects'])
                .then(data => {
                    let tempObj = {};
                    data.map(field => {
                        tempObj[field.values[2]] = this.mapField(field);
                    });
                    return tempObj;
                });
        },
        mapField(field) {
            const values = field.values;
            return {
                breadCrumbsMainPage: values[3],
                breadCrumbsTitle: values[4],
                pageTitle: values[5],
                paginationPrevious: values[6],
                paginationNext: values[7],
            }
        }
      },
      getTranslations: async function() {
        let fields = await this.translationService.getFields(3410106);
        this.translations = fields;
        return new Promise((resolve)=>{
          resolve(true);
        })
      },
      translate: function(lang) {
        //using translations fields, manipulate DOM to replace marked elements
        const markedNewest = document.querySelectorAll('.newest-badge');
        const targetElements = document.querySelectorAll('[data-translate="true"]');

        for (element of markedNewest) {
          element.classList.add('newest-badge--'+lang);
        }

        for (element of targetElements) {
          const elementKey = element.dataset.translateKey;
          const output = this.translations[lang][elementKey];
          element.text = output;
          element.innerText = output;
        }
      }

    },
  };

  var HIDE_FOCUS_STYLES_CLASS = 'disable-focus-styles';
  var SHOW_FOCUS_STYLES_CLASS = 'enable-focus-styles';

  function domReady(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  function showFocusOutline() {
    document.body.classList.add(SHOW_FOCUS_STYLES_CLASS);
    document.body.classList.remove(HIDE_FOCUS_STYLES_CLASS);
  }

  function hideFocusOutline() {
    document.body.classList.add(HIDE_FOCUS_STYLES_CLASS);
    document.body.classList.remove(SHOW_FOCUS_STYLES_CLASS);
  }

  domReady(function () {
    if (!document.body) {
      return;
    } else {
      //isobar main app init
      eserviceAPP.init();

      // Show the focus outline when keyboard activity occurs
      document.body.addEventListener('keydown', showFocusOutline);

      // Hide the focus outline when mouse activity occurs
      document.body.addEventListener('mousemove', hideFocusOutline);
      document.body.addEventListener('mousedown', hideFocusOutline);
      document.body.addEventListener('mouseup', hideFocusOutline);
    }
  });
})();
