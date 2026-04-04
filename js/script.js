/* ============================================
   JANNATUL FERDAUS - PORTFOLIO JAVASCRIPT
   CSE 3154 | Web Programming
   ============================================ */

/* ---- Nav Scroll Effect ---- */
(function () {
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  /* ---- Active Nav Link ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Hamburger Mobile Nav ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      }
    });
  }

  /* ---- Dark / Light Theme Toggle ---- */
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ---- Back to Top Button ---- */
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Scroll Reveal Animations ---- */
  function initReveal() {
    const selectors = '.reveal, .reveal-left, .reveal-right';
    const elements = document.querySelectorAll(selectors);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, entry.target.dataset.delay || 0);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach((el, i) => {
      el.dataset.delay = (i % 6) * 80;
      observer.observe(el);
    });
  }
  initReveal();

  /* ---- Skill Bar Animation ---- */
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const target = bar.dataset.width || '0%';
          setTimeout(() => { bar.style.width = target; }, 200);
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
  }
  initSkillBars();

  /* ---- Animated Counters ---- */
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const decimals = el.dataset.decimals || 0;
          const duration = 1600;
          let start = null;

          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = (eased * target).toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }
  animateCounters();

  /* ---- Project Filter Buttons ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;
        card.style.transition = 'all 0.35s ease';
        if (show) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.display = 'flex';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            if (btn.classList.contains('active') && card.dataset.category !== btn.dataset.filter && btn.dataset.filter !== 'all') {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });

  /* ---- Contact Form Validation ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    const successMsg = document.getElementById('formSuccessMsg');

    function showError(field, msg) {
      field.classList.add('error');
      field.classList.remove('success');
      const errEl = document.getElementById(field.id + 'Error');
      if (errEl) { errEl.textContent = msg; errEl.classList.add('show'); }
    }

    function showSuccess(field) {
      field.classList.remove('error');
      field.classList.add('success');
      const errEl = document.getElementById(field.id + 'Error');
      if (errEl) errEl.classList.remove('show');
    }

    function clearField(field) {
      field.classList.remove('error', 'success');
      const errEl = document.getElementById(field.id + 'Error');
      if (errEl) errEl.classList.remove('show');
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    // Real-time validation
    [nameField, emailField, subjectField, messageField].forEach(field => {
      if (!field) return;
      field.addEventListener('input', () => {
        clearField(field);
        if (field.value.trim().length > 0) showSuccess(field);
      });
      field.addEventListener('blur', () => {
        if (!field.value.trim()) showError(field, 'This field is required.');
        else if (field === emailField && !validateEmail(field.value)) {
          showError(field, 'Please enter a valid email address.');
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      if (!nameField.value.trim()) { showError(nameField, 'Please enter your full name.'); valid = false; }
      else showSuccess(nameField);

      if (!emailField.value.trim()) { showError(emailField, 'Please enter your email address.'); valid = false; }
      else if (!validateEmail(emailField.value)) { showError(emailField, 'Please enter a valid email (e.g. name@example.com).'); valid = false; }
      else showSuccess(emailField);

      if (!subjectField.value.trim()) { showError(subjectField, 'Please enter a subject.'); valid = false; }
      else showSuccess(subjectField);

      if (!messageField.value.trim()) { showError(messageField, 'Please enter your message.'); valid = false; }
      else if (messageField.value.trim().length < 20) { showError(messageField, 'Message must be at least 20 characters.'); valid = false; }
      else showSuccess(messageField);

      if (valid) {
        const submitBtn = contactForm.querySelector('.form-submit');
        submitBtn.textContent = '⏳ Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          contactForm.reset();
          [nameField, emailField, subjectField, messageField].forEach(f => clearField(f));
          if (successMsg) successMsg.classList.add('show');
          submitBtn.textContent = '✉️ Send Message';
          submitBtn.disabled = false;
          setTimeout(() => { if (successMsg) successMsg.classList.remove('show'); }, 5000);
        }, 1400);
      }
    });
  }

  /* ---- Typing Effect (Hero) ---- */
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const words = ['ETE Student', 'Robotics Enthusiast', 'Gardening Lover', 'Storyteller', 'Photographer'];
    let wordIdx = 0, charIdx = 0, deleting = false;

    function type() {
      const word = words[wordIdx];
      if (!deleting) {
        typingEl.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typingEl.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
      }
      setTimeout(type, deleting ? 60 : 110);
    }
    type();
  }

  /* ---- Smooth Page Transitions ---- */
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('http')) {
      link.addEventListener('click', function(e) {
        // Allow normal navigation
      });
    }
  });

})();
