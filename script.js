(function () {
      // Sticky nav: add shadow/solid background once scrolled
      var navWrap = document.getElementById('navWrap');
      function onScroll() {
        if (window.scrollY > 40) {
          navWrap.classList.add('scrolled');
        } else {
          navWrap.classList.remove('scrolled');
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // Scroll reveal
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var items = document.querySelectorAll('.reveal, .stagger');
      if (reduce || !('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('visible'); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      items.forEach(function (el) { io.observe(el); });

      // Flip cards
      var cards = document.querySelectorAll('.flip-card');
      cards.forEach(function (card) {
        card.addEventListener('click', function () {
          var flipped = card.classList.toggle('flipped');
          card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
        });
      });
    })();

(function () {
  // FAQ accordion
  var qs = document.querySelectorAll('.faq-q');
  qs.forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var answer = item.querySelector('.faq-a');
      var isOpen = item.classList.toggle('open');
      q.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      answer.style.maxHeight = isOpen ? answer.scrollHeight + 'px' : null;
    });
  });

  // Contact form -> Formspree (AJAX, no page reload)
  var form = document.getElementById('contactForm');
  if (form) {
    var status = document.getElementById('cf-status');
    var submit = document.getElementById('cf-submit');
    var endpoint = form.getAttribute('data-endpoint') || '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic required-field check
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // If the endpoint hasn't been configured yet, fall back to email so nothing breaks.
      if (endpoint.indexOf('YOUR_FORM_ID') !== -1) {
        var subj = encodeURIComponent('New inquiry from ' + (form.name.value || 'website'));
        var body = encodeURIComponent(
          'Name: ' + form.name.value + '\nEmail: ' + form.email.value +
          '\nBusiness: ' + form.business.value + '\n\n' + form.message.value
        );
        window.location.href = 'mailto:taylor_lewis906@hotmail.com?subject=' + subj + '&body=' + body;
        return;
      }

      submit.disabled = true;
      submit.textContent = 'SENDING…';
      status.textContent = '';
      status.style.color = '';

      fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          status.style.color = '#1f7a3d';
          status.textContent = 'Thanks! Your message has been sent — we\'ll reply within a day.';
          submit.textContent = 'MESSAGE SENT ✓';
        } else {
          return res.json().then(function (data) {
            throw new Error((data && data.errors && data.errors[0] && data.errors[0].message) || 'Something went wrong.');
          });
        }
      }).catch(function (err) {
        status.style.color = '#b23c3c';
        status.textContent = 'Sorry — that didn\'t send. Please email taylor_lewis906@hotmail.com directly.';
        submit.disabled = false;
        submit.textContent = 'SEND MESSAGE';
      });
    });
  }
})();
