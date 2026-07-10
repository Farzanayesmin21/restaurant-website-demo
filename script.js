/* ===================== Page Loader ===================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('opacity-0', 'invisible'), 300);
});

/* ===================== Sticky Navbar ===================== */
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('bg-ink/95', 'shadow-lg', 'shadow-black/25', 'py-3');
      navbar.classList.remove('bg-ink/85', 'shadow-md', 'shadow-black/10', 'py-5');
    } else {
      navbar.classList.remove('bg-ink/95', 'shadow-lg', 'shadow-black/25', 'py-3');
      navbar.classList.add('bg-ink/85', 'shadow-md', 'shadow-black/10', 'py-5');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
}

/* ===================== Mobile Menu ===================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  const bars = hamburger.querySelectorAll('span');
  hamburger.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    if (!isOpen) {
      bars[0].classList.add('rotate-45', 'translate-y-2');
      bars[1].classList.add('opacity-0');
      bars[2].classList.add('-rotate-45', '-translate-y-2');
    } else {
      bars[0].classList.remove('rotate-45', 'translate-y-2');
      bars[1].classList.remove('opacity-0');
      bars[2].classList.remove('-rotate-45', '-translate-y-2');
    }
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    bars[0].classList.remove('rotate-45', 'translate-y-2');
    bars[1].classList.remove('opacity-0');
    bars[2].classList.remove('-rotate-45', '-translate-y-2');
  }));
}

/* ===================== Active Nav Link ===================== */
(function highlightActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href').split('#')[0] || 'index.html';
    if (href === path || (href === 'index.html' && path === '')) {
      a.classList.add('text-goldlight');
      a.classList.remove('text-white/70');
    }
  });

  // On the homepage, also highlight based on scroll position within sections
  const sections = document.querySelectorAll('main section[id]');
  if (sections.length) {
    const navAnchors = document.querySelectorAll('.nav-link[href*="#"]');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('text-goldlight'));
          const match = document.querySelector('.nav-link[href$="#' + entry.target.id + '"]');
          if (match) match.classList.add('text-goldlight');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => sectionObserver.observe(s));
  }
})();

/* ===================== Scroll Progress Bar ===================== */
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  });
}

/* ===================== Back to Top ===================== */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('opacity-0', window.scrollY < 500);
    backToTop.classList.toggle('invisible', window.scrollY < 500);
    backToTop.classList.toggle('translate-y-3', window.scrollY < 500);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ===================== Fade-up / Reveal on Scroll ===================== */
const revealEls = document.querySelectorAll('.fade-up, .reveal-el');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
      entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
      // sear-mark inside this element, if any
      const path = entry.target.querySelector('.sear-path');
      if (path) path.style.strokeDashoffset = '0';
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* ===================== Floating Embers (Hero) ===================== */
const embersEl = document.getElementById('embers');
if (embersEl) {
  for (let i = 0; i < 22; i++) {
    const e = document.createElement('div');
    e.className = 'absolute bottom-0 w-1 h-1 rounded-full bg-gold shadow-[0_0_8px_2px_rgba(184,137,43,0.55)] animate-ember';
    e.style.left = Math.random() * 100 + '%';
    e.style.animationDuration = (6 + Math.random() * 8) + 's';
    e.style.animationDelay = (Math.random() * 10) + 's';
    e.style.opacity = 0.35 + Math.random() * 0.4;
    embersEl.appendChild(e);
  }
}

/* ===================== Animated Counters ===================== */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ===================== Hero Banner Slider (Homepage) ===================== */
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
if (heroSlides.length) {
  let heroCurrent = 0;
  function showHeroSlide(i) {
    heroSlides.forEach(s => s.classList.remove('opacity-100'));
    heroSlides.forEach(s => s.classList.add('opacity-0'));
    heroDots.forEach(d => { d.classList.remove('bg-goldlight', 'scale-125'); d.classList.add('bg-white/40'); });
    heroSlides[i].classList.remove('opacity-0');
    heroSlides[i].classList.add('opacity-100');
    heroDots[i].classList.add('bg-goldlight', 'scale-125');
    heroDots[i].classList.remove('bg-white/40');
    heroCurrent = i;
  }
  heroDots.forEach(d => d.addEventListener('click', () => showHeroSlide(parseInt(d.dataset.i, 10))));
  setInterval(() => showHeroSlide((heroCurrent + 1) % heroSlides.length), 6000);
}

/* ===================== Testimonials Carousel ===================== */
const slides = document.querySelectorAll('.test-slide');
const dots = document.querySelectorAll('.test-dot');
if (slides.length) {
  let current = 0;
  function showSlide(i) {
    slides.forEach(s => { s.classList.add('opacity-0', 'pointer-events-none'); s.classList.remove('opacity-100'); });
    dots.forEach(d => { d.classList.remove('bg-gold', 'scale-125'); d.classList.add('bg-line'); });
    slides[i].classList.remove('opacity-0', 'pointer-events-none');
    slides[i].classList.add('opacity-100');
    dots[i].classList.add('bg-gold', 'scale-125');
    dots[i].classList.remove('bg-line');
    current = i;
  }
  dots.forEach(d => d.addEventListener('click', () => showSlide(parseInt(d.dataset.i, 10))));
  setInterval(() => showSlide((current + 1) % slides.length), 5500);
}

/* ===================== FAQ Accordion ===================== */
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  const panel = item.querySelector('.faq-answer');
  const icon = item.querySelector('.faq-icon');
  btn.addEventListener('click', () => {
    const isOpen = !panel.classList.contains('hidden');
    document.querySelectorAll('.faq-answer').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180', 'text-gold'));
    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('text-gold'));
    if (!isOpen) {
      panel.classList.remove('hidden');
      icon.classList.add('rotate-180', 'text-gold');
      btn.classList.add('text-gold');
    }
  });
});

/* ===================== Blog Category Filter ===================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('bg-gold', 'text-white', 'border-gold');
      b.classList.add('border-line', 'text-stone');
    });
    btn.classList.add('bg-gold', 'text-white', 'border-gold');
    btn.classList.remove('border-line', 'text-stone');
    const cat = btn.dataset.filter;
    blogCards.forEach(card => {
      const show = cat === 'all' || card.dataset.category === cat;
      card.style.display = show ? '' : 'none';
    });
  });
});

/* ===================== Gallery Filter (Gallery Page) ===================== */
const galleryCards = document.querySelectorAll('.gallery-card');
if (galleryCards.length) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-gold', 'text-white', 'border-gold');
        b.classList.add('border-line', 'text-stone');
      });
      btn.classList.add('bg-gold', 'text-white', 'border-gold');
      btn.classList.remove('border-line', 'text-stone');
      const cat = btn.dataset.filter;
      galleryCards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* ===================== Reservation / Contact Form (EmailJS-ready) ===================== */
/* ---------------------------------------------------------------
   EMAILJS SETUP — takes about 5 minutes, no backend server needed:
   1. Create a free account at https://www.emailjs.com (100 emails/month free)
   2. Add an Email Service (Gmail, Outlook, etc.) -> copy its "Service ID"
   3. Create an Email Template with variables matching the form field
      names used below: {{name}}, {{phone}}, {{date}}, {{time}}, {{guests}},
      {{message}} for the reservation form, and {{name}}, {{email}},
      {{subject}}, {{message}} for the contact form -> copy its "Template ID"
   4. In Account > General, copy your "Public Key"
   5. Paste all three values into the constants below.
   Until configured, forms show a confirmation message only (no email sent) —
   useful for demoing the site without live EmailJS keys.
--------------------------------------------------------------- */
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const emailjsReady = EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && window.emailjs;
if (emailjsReady) emailjs.init(EMAILJS_PUBLIC_KEY);

document.querySelectorAll('form[data-emailjs-form]').forEach(form => {
  const msg = form.querySelector('.form-msg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Honeypot: bots fill every field, humans never see or fill this one.
    const honeypot = form.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value) {
      form.reset();
      return; // silently drop — no error shown, so bots don't learn anything
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const finish = (text, isError = false) => {
      if (msg) {
        msg.textContent = text;
        msg.classList.toggle('text-wine', isError);
        msg.classList.toggle('text-gold', !isError);
      }
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
      if (!isError) form.reset();
    };

    if (emailjsReady) {
      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then(() => finish('Thank you — your message has been sent. We\'ll be in touch shortly.'))
        .catch(() => finish('Something went wrong sending your message. Please call us directly.', true));
    } else {
      // Demo mode — no EmailJS keys configured yet, see setup notes above.
      setTimeout(() => finish('Thank you — your message has been received. We\'ll be in touch shortly.'), 500);
    }
  });
});
