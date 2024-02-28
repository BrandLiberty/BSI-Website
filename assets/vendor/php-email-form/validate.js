
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;
      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      // Show loading indicator
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(thisForm)

      // If reCAPTCHA is enabled, handle it
      if (recaptcha) {
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.ready(function () {
            try {
              grecaptcha.execute(recaptcha, { action: 'php_email_form_submit' })
                .then(token => {
                  formData.set('recaptcha-response', token);
                  php_email_form_submit(thisForm, action, formData);
                })
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(form, action, formData) {
    console.log('MY FORM DATA', formData)
    fetch(action, {
      method: 'POST',
      body: new URLSearchParams(formData),
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(async (response) => {
        console.log('Response RECIVED', response.status)
        if (response.status === 200) {
          return response
        } else {
          throw new Error(`${response.status} ${response.message} ${response.url}`);
        }
      })
      .then(async res => {
        // Hide loading indicator
        let data = await res.json()
        console.log('DTA RECIEVED',data)
        form.querySelector('.loading').classList.remove('d-block');
        if (res.status===200) {
          // Show success message
          form.querySelector('.sent-message').classList.add('d-block');
          form.reset();
        } else {
          throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action);
        }
      })
      .catch((error) => {
        // Display error message
        displayError(form, error);
      });
  }

  function displayError(form, error) {
    // Hide loading indicator
    form.querySelector('.loading').classList.remove('d-block');
    // Show error message
    form.querySelector('.error-message').innerHTML = error;
    form.querySelector('.error-message').classList.add('d-block');
  }

})();
