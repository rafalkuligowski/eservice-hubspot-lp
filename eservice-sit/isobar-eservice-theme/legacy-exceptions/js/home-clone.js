const loadQuiz = () => {
  function deparam(query) {
    var pairs, i, keyValuePair, key, value, map = {};
    // remove leading question mark if its there
    if (query.slice(0, 1) === '?') {
        query = query.slice(1);
    }
    if (query !== '') {
        pairs = query.split('&');
        for (i = 0; i < pairs.length; i += 1) {
            keyValuePair = pairs[i].split('=');
            key = decodeURIComponent(keyValuePair[0]);
            value = (keyValuePair.length > 1) ? decodeURIComponent(keyValuePair[1]) : undefined;
            map[key] = value;
        }
    }
    return map;
  }

  let currentStep = 1;
  const backButton = $('#hs-button_widget_1601015102478');
  const forwardButton = $('#hs-button_widget_1601015111838');
  const form = $('#hs_form_target_widget_1600941708103 form');
  
  const firstStep = $('.hs_step1');
  const secondStep = $('.hs_step2');
  const thirdStep = $('.hs_step3');
  
  const selesto = $('.selesto__cta');
  const cstore = $('.cstore__cta');
  const media = $('.media__cta');
  
  firstStep.prepend('<div class="counter"><p class="form-label">PYTANIE <span class="primary">1 z 3</span></p></div>');
  secondStep.prepend('<div class="counter"><p class="form-label">PYTANIE <span class="primary">2 z 3</span></p></div>');
  thirdStep.prepend('<div class="counter"><p class="form-label">PYTANIE <span class="primary">3 z 3</span></p></div>');
  
  form.submit(function(e) {
    e.preventDefault();
  })
  
  forwardButton.unbind('click').click(function(e) {
    e.preventDefault();
    const formData = deparam(form.serialize());
    if (formData.step1 && currentStep === 1) {
      if (formData.step1 === '1_2') {
        window.location.href = media.attr('href');
      } else {
        firstStep.hide();
        secondStep.show();
        currentStep = 2;
      }
      return;
    }
    if (formData.step2 && currentStep === 2) {
       if (formData.step2 === '2_3') {
        window.location.href = cstore.attr('href');
      } else {
        secondStep.hide();
        thirdStep.show();
        currentStep = 3;
      }
      return;
    }
    if (formData.step3 && currentStep === 3) {
      if (formData.step3 === '3_1') {
        window.location.href = selesto.attr('href');
      } else {
        window.location.href = cstore.attr('href');
      }
      return;
    }
  });
  
  backButton.unbind('click').click(function(e) {
    e.preventDefault();
    if (currentStep === 2) {
      secondStep.hide();
      firstStep.show();
      currentStep = 1;
      return;
    }
    if (currentStep === 3) {
      thirdStep.hide();
      secondStep.show();
      currentStep = 2;
      return;
    }
  })
};

window.addEventListener('load', function () {
  const quizCheck = setInterval(() => {
    const form = $('#hs_form_target_widget_1600941708103 form');
    const selesto = $('.selesto__cta');
    const cstore = $('.cstore__cta');
    const media = $('.media__cta');
    if(form.length > 0 && selesto.length > 0 && cstore.length > 0 && media.length > 0) {
      loadQuiz();
      clearInterval(quizCheck);
    }
  }, 300);
});

