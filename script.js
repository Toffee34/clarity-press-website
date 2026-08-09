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

  // Contact form -> mailto (static-site friendly; upgrade to Formspree later)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.name.value || '').trim();
      var email = (form.email.value || '').trim();
      var business = (form.business.value || '').trim();
      var message = (form.message.value || '').trim();
      var subject = encodeURIComponent('New inquiry from ' + (name || 'website'));
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Business: ' + business + '\n\n' +
        message
      );
      window.location.href = 'mailto:taylor_lewis906@hotmail.com?subject=' + subject + '&body=' + body;
    });
  }
})();
