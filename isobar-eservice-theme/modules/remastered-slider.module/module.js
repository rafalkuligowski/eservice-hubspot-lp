// Taras Testimonial Slider
(function($) {

    var tarasTestimonial = function() {
  
      return {
  
        options: {
          quoteEl	   	 : '.quote-box, .testimonial__content-wrapper--under-the-image', //
          autoplay     : true,
          speed        : 3000, //default 3 seconds
        },
  
        init: function(options, element) {
          this.options = $.extend(this.options, options);
          this.elem = element;
          this.quoteBox = $(this.elem).find($(this.options.quoteEl));
          console.log(this.options, this.quoteBox);
          this.no_of_quotes = this.quoteBox.length;
          this.current = 0;
          this.max = this.no_of_quotes + 1;
          this.autoChange = 0;
          this.firstLoad();
        },
  
        firstLoad : function () {
          this.attachEvents();
          this.addQuoteDots();
          this.hideQuotes();
          this.displayQuote(this.current);
          this.autoPlay();
          this.lazyLoad();
        },
        /* automatically rotate quotes */
        autoPlay : function () {
          if(this.options.autoplay == 'true') {
            var t = this;
            t.autoChange = setInterval(function(){ 
              t.nextQuote();
            }, this.options.speed);
          } 
        },
        /* synchronously loads images after first image is loaded */
        lazyLoad : function () {
          const elements = document.querySelectorAll('.lazyLoadImage');
          
          function loadImage(element) {
            return new Promise((resolve, reject) => {
              let loadingImage = new Image();
              loadingImage.classList = element.classList;
              loadingImage.alt = element.alt;
              loadingImage.onload = () => resolve(loadingImage);
              loadingImage.onerror = reject;
              loadingImage.src = element.dataset.lazySrc;
            });
          }
          
          const loadCallback = function(index){  
            const nextIndex = index+1;
            const nextElement = elements.item(nextIndex);
            if(nextElement) {
              loadImage(nextElement).then(image=>{
                nextElement.parentNode.replaceChild(image,nextElement);
                loadCallback(nextIndex);
              })
            }
          }
  
          document.addEventListener('DOMContentLoaded', ()=>{
            loadImage(elements[0]).then(image=>{
              elements[0].parentNode.replaceChild(image,elements[0]);
              loadCallback(0);
            })
          });
        },
        /* stop automatic rotation */
        stopAutoPlay : function () {
          clearInterval(this.autoChange);
        },
  
        /* next quote */
        nextQuote : function () {
          this.hideQuotes();
          this.current += 1;
          if (this.current === this.no_of_quotes) {
            this.current = 0;
          }
          this.displayQuote(this.current);
        },
  
        /* previous quote */
        previousQuote : function () {
          this.hideQuotes();
          this.current -= 1;
          if (this.current < 0) {
            this.current = this.no_of_quotes - 1;
          }
          this.displayQuote(this.current);
        },
  
        /* hide all quotes */
        hideQuotes : function () {
          this.quoteBox.hide();
        },
  
        /* display the specific quote n and add active class to dot */
        displayQuote : function (n) {
          this.quoteBox.eq(n).fadeIn("slow");
          $(this.elem).find("ul.quote-dots li").removeClass("active");
          $(this.elem).find("ul.quote-dots li[data-num=" + n + "]").addClass("active");
        },
  
        /* dynamically add dots equivalent to quotes */
        addQuoteDots : function () {
          if($(this.elem).find("ul.quote-dots").length === 0){
            $('<ul class="quote-dots"></ul>').appendTo($(this.elem));
          }
          for (i=0; i<this.no_of_quotes; i++){
            $(this.elem).find("ul.quote-dots").append("<li data-num=" + i + "></li>");
          }
  
          //default slider dots are unclickable so there's a fix for that
          const dotsElements = document.querySelectorAll('ul.quote-dots li');
          for(dot of dotsElements) {
            dot.addEventListener('click', (e)=>{
              this.stopAutoPlay();
              this.hideQuotes();
              this.current = parseInt(e.target.dataset.num);
              this.displayQuote(this.current); 
              this.autoPlay();
            });
          }
          //end of clickable dots fix//
        },
  
        attachEvents: function() {
  
          var self = this;
  
          // $(self.elem).find("ul.quote-dots li").on('click',function() { 
          //   var current = $(this).data("num");
          //   self.hideQuotes();
          //   self.stopAutoPlay();
          //   self.displayQuote(current);
          //   self.autoPlay();
          // });
  
          $(self.elem).find(".previous").on('click',function() { 
            self.stopAutoPlay();
            self.previousQuote();
            self.autoPlay();
          });
  
          $(self.elem).find(".next").on('click',function() {
            self.stopAutoPlay();
            self.nextQuote();
            self.autoPlay();
          });
  
        }
  
      };
  
    };
  
    $.fn.tarasTestimonial = function(options) {
  
      return this.each(function() {
        var tn = new tarasTestimonial();
        tn.init(options, this);
      });
    };
  
  })(jQuery);