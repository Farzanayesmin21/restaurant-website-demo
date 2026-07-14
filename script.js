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
  let path = window.location.pathname.split('/').pop() || 'index.html';
  if (path === 'blog-post.html') path = 'blog.html';
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
  heroDots.forEach(d => d.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showHeroSlide(parseInt(d.dataset.i, 10)); }
  }));
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
  dots.forEach(d => d.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showSlide(parseInt(d.dataset.i, 10)); }
  }));
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

/* ===================== About Section Image Slider (Homepage) ===================== */
document.addEventListener('DOMContentLoaded', function() {
  const aboutSlides = document.querySelectorAll('.about-slide');
  if (!aboutSlides.length) return;

  let aboutCurrent = 0;
  const aboutSlideInterval = 4000; // Image change timing (4 seconds)

  function nextAboutSlide() {
    // Current image hide korbe
    aboutSlides[aboutCurrent].classList.remove('opacity-100');
    aboutSlides[aboutCurrent].classList.add('opacity-0');

    // Index update korbe
    aboutCurrent = (aboutCurrent + 1) % aboutSlides.length;

    // Porer image show korbe
    aboutSlides[aboutCurrent].classList.remove('opacity-0');
    aboutSlides[aboutCurrent].classList.add('opacity-100');
  }

  // Set interval to repeat automatically
  setInterval(nextAboutSlide, aboutSlideInterval);
});

/* ===================== Menu Items Renderer (Menu Page) ===================== */
if (document.getElementById('miTabs') && document.getElementById('miGrid')) {
  (function(){
    const CATEGORIES = ["All","Pizza","Burgers","Pasta","Starters","Drinks & Juice","Desserts","Tea","Coffee"];

    const ITEMS = [
      {name:"Margherita Pizza", cat:"Pizza", time:"20 min", desc:"Classic mozzarella, basil and San Marzano tomato sauce.", price:8, img:"pizza,margherita,cheese", photo:"img/1.jpg"},
      {name:"Pepperoni Pizza", cat:"Pizza", time:"22 min", desc:"Loaded with spicy pepperoni and a blend of melted cheese.", price:9, img:"pepperoni,pizza,slice", photo:"img/2.jpg"},
      {name:"BBQ Chicken Pizza", cat:"Pizza", time:"25 min", desc:"Grilled chicken, red onion and smoky barbecue drizzle.", price:10, img:"bbq,chicken,pizza", photo:"img/(3).jpg"},
      {name:"Veggie Supreme", cat:"Pizza", time:"20 min", desc:"Bell peppers, olives, mushroom and sweet corn on a crisp base.", price:9, img:"vegetable,pizza,fresh", photo:"img/4.jpg"},

      {name:"Classic Beef Burger", cat:"Burgers", time:"15 min", desc:"Juicy beef patty, cheddar, lettuce and house sauce.", price:7, img:"beef,burger,cheese", photo:"img/5.jpg"},
      {name:"Chicken Crunch Burger", cat:"Burgers", time:"15 min", desc:"Crispy fried chicken thigh with slaw and spicy mayo.", price:7, img:"chicken,burger,crispy", photo:"img/6.jpg"},
      {name:"Double Cheese Burger", cat:"Burgers", time:"18 min", desc:"Two beef patties stacked high with melted double cheese.", price:9, img:"double,cheeseburger", photo:"img/7.jpg"},
      {name:"Smoky BBQ Burger", cat:"Burgers", time:"18 min", desc:"Beef patty, onion rings and smoky barbecue glaze.", price:8, img:"bbq,burger,onion,rings", photo:"img/8.jpg"},

      {name:"Spaghetti Alfredo", cat:"Pasta", time:"18 min", desc:"Silky parmesan cream sauce tossed with fresh spaghetti.", price:9, img:"alfredo,pasta,creamy", photo:"img/9.jpg"},
      {name:"Penne Bolognese", cat:"Pasta", time:"20 min", desc:"Slow-simmered beef ragu over al dente penne.", price:10, img:"bolognese,pasta,penne", photo:"img/10.jpg"},
      {name:"Chicken Carbonara", cat:"Pasta", time:"20 min", desc:"Smoky chicken, egg yolk and pecorino in a rich sauce.", price:10, img:"carbonara,pasta,chicken", photo:"img/11.jpg"},
      {name:"Pesto Fusilli", cat:"Pasta", time:"15 min", desc:"Basil pesto, pine nuts and cherry tomato over fusilli.", price:9, img:"pesto,pasta,basil", photo:"img/12.jpg"},

      {name:"Crispy Spring Rolls", cat:"Starters", time:"12 min", desc:"Hand-rolled veg spring rolls with a tangy dip.", price:5, img:"spring,rolls,crispy", photo:"img/13.jpg"},
      {name:"Garlic Cheese Bread", cat:"Starters", time:"10 min", desc:"Toasted baguette with garlic butter and molten cheese.", price:5, img:"garlic,bread,cheese", photo:"img/14.jpg"},
      {name:"Buffalo Wings", cat:"Starters", time:"18 min", desc:"Fiery buffalo-glazed wings with a cool ranch dip.", price:7, img:"buffalo,wings,spicy", photo:"img/15.jpg"},
      {name:"Loaded Nachos", cat:"Starters", time:"12 min", desc:"Tortilla chips piled with cheese, jalapeno and salsa.", price:6, img:"nachos,cheese,loaded", photo:"img/16.jpg"},

      {name:"Fresh Orange Juice", cat:"Drinks & Juice", time:"5 min", desc:"Cold-pressed oranges, squeezed fresh to order.", price:4, img:"orange,juice,fresh", photo:"img/17.jpg"},
      {name:"Mango Smoothie", cat:"Drinks & Juice", time:"7 min", desc:"Ripe mango blended smooth and creamy with yogurt.", price:5, img:"mango,smoothie,drink", photo:"img/18.jpg"},
      {name:"Classic Lemonade", cat:"Drinks & Juice", time:"5 min", desc:"Sweet, tangy lemonade over crushed ice with mint.", price:4, img:"lemonade,mint,drink", photo:"img/19.jpg"},
      {name:"Berry Blast Cooler", cat:"Drinks & Juice", time:"7 min", desc:"Mixed berries blended with soda and a splash of lime.", price:5, img:"berry,drink,cooler", photo:"img/20.jpg"},

      {name:"Chocolate Lava Cake", cat:"Desserts", time:"15 min", desc:"Warm cake with a molten chocolate centre.", price:6, img:"chocolate,lava,cake", photo:"img/21.jpg"},
      {name:"Classic Cheesecake", cat:"Desserts", time:"10 min", desc:"Creamy baked cheesecake with a berry compote.", price:6, img:"cheesecake,berry,dessert", photo:"img/22.jpg"},
      {name:"Vanilla Ice Cream", cat:"Desserts", time:"5 min", desc:"Two scoops of rich vanilla bean ice cream.", price:4, img:"vanilla,ice,cream", photo:"img/23.jpg"},
      {name:"Fudge Brownie", cat:"Desserts", time:"10 min", desc:"Dense chocolate fudge brownie, warm and gooey.", price:5, img:"chocolate,brownie,fudge", photo:"img/24.jpg"},

      {name:"Masala Chai", cat:"Tea", time:"8 min", desc:"Spiced black tea simmered with milk and ginger.", price:3, img:"masala,chai,tea", photo:"img/25.jpg"},
      {name:"Green Tea", cat:"Tea", time:"5 min", desc:"Light, antioxidant-rich brew served hot.", price:3, img:"green,tea,cup", photo:"img/26.jpg"},
      {name:"Lemon Ginger Tea", cat:"Tea", time:"6 min", desc:"Zesty lemon and warming ginger, honey optional.", price:3, img:"lemon,ginger,tea", photo:"img/27.jpg"},
      {name:"Milk Tea", cat:"Tea", time:"7 min", desc:"Smooth, comforting tea brewed strong with milk.", price:3, img:"milk,tea,cup", photo:"img/28.jpg"},

      {name:"Espresso Shot", cat:"Coffee", time:"3 min", desc:"Bold and concentrated, pulled fresh to order.", price:3, img:"espresso,shot,coffee", photo:"img/29.jpg"},
      {name:"Creamy Cappuccino", cat:"Coffee", time:"5 min", desc:"Espresso topped with a thick layer of milk foam.", price:4, img:"cappuccino,coffee,foam", photo:"img/30.jpg"},
      {name:"Caffe Latte", cat:"Coffee", time:"5 min", desc:"Smooth espresso with steamed milk and light foam.", price:4, img:"latte,coffee,milk", photo:"img/31.jpg"},
      {name:"Iced Mocha", cat:"Coffee", time:"6 min", desc:"Chilled espresso, chocolate and cold milk over ice.", price:5, img:"iced,mocha,coffee", photo:"img/32.jpg"}
    ];

    let activeCat = "All";

    function slugify(str){ return str.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
    function imgUrl(seed){ return `https://picsum.photos/seed/${slugify(seed)}/300/300`; }

    function renderTabs(){
      const tabs = document.getElementById('miTabs');
      tabs.innerHTML = CATEGORIES.map(c =>
        `<button type="button" class="mi-tab ${c===activeCat?'active':''}" data-cat="${c}">${c}</button>`
      ).join('');
      tabs.querySelectorAll('.mi-tab').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          activeCat = btn.dataset.cat;
          renderTabs();
          renderGrid();
        });
      });
    }

    function renderGrid(){
      const grid = document.getElementById('miGrid');
      const items = activeCat === "All" ? ITEMS : ITEMS.filter(i=>i.cat===activeCat);
      grid.innerHTML = items.map((item, idx)=>{
        return `
        <div class="mi-card relative pt-14 pb-6 px-5 mi-fade" style="animation-delay:${idx*30}ms">
          <div class="absolute -top-9 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full mi-ring flex items-center justify-center overflow-hidden">
            <img src="${item.photo || imgUrl(item.img)}" onerror="this.onerror=null;this.src='${imgUrl(item.img)}';" alt="${item.name}" class="w-20 h-20 rounded-full object-cover" loading="lazy">
          </div>

          <h3 class="font-heading text-xl leading-none mt-2">${item.name}</h3>
          <div class="flex items-center gap-1 text-[11px] mt-2" style="color:var(--mi-muted)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
            ${item.time}
          </div>
          <p class="text-[13px] mt-3 leading-relaxed" style="color:var(--mi-muted)">${item.desc}</p>

          <div class="mt-5">
            <span class="font-heading font-semibold text-lg" style="color:var(--mi-red)">$${item.price.toFixed(2)}</span>
          </div>
        </div>`;
      }).join('');
    }

    const HASH_MAP = {
      pizza:"Pizza", burgers:"Burgers", pasta:"Pasta", starters:"Starters",
      drinks:"Drinks & Juice", desserts:"Desserts", tea:"Tea", coffee:"Coffee"
    };

    function applyHashCategory(){
      const key = (location.hash || '').replace('#','').toLowerCase();
      if(key && HASH_MAP[key]){
        activeCat = HASH_MAP[key];
        return true;
      }
      return false;
    }

    const hadCategoryHash = applyHashCategory();
    renderTabs();
    renderGrid();

    if(hadCategoryHash){
      const target = document.getElementById('menu-items');
      if(target) setTimeout(()=> target.scrollIntoView({behavior:'smooth', block:'start'}), 50);
    }

    window.addEventListener('hashchange', ()=>{
      if(applyHashCategory()){
        renderTabs();
        renderGrid();
      }
    });
  })();
}

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

/* ===================== Blog Post Data (shared by blog.html + blog-post.html) ===================== */
const BLOG_POSTS = [
  {
    slug: "dry-aging-45-days",
    category: "Technique",
    readTime: "9 min read",
    date: "Jan 14, 2026",
    author: "Elias Marchetti",
    role: "Executive Chef",
    hero: "https://images.unsplash.com/photo-1558030006-450675393462?w=1600&q=80",
    excerpt: "Dry-aging isn't just about time — it's controlled decay, done on purpose. Here's what actually happens to a cut of beef inside our aging room, and why we never rush it.",
    title: "The Science of Dry-Aging: Why 45 Days Changes Everything",
    body: [
      { t: "p", c: "Walk into our aging room and the first thing you notice is the smell — not spoiled, but deep, mineral, almost like a wine cellar. That smell is the whole point. Dry-aging is a slow, deliberate exposure of beef to controlled temperature, humidity, and airflow, and every one of those variables is doing real work on the meat." },
      { t: "p", c: "At Obsidian, primal cuts go into the room at 34°F and roughly 80% humidity, hung on open racks so air moves freely on every side. Over the following weeks, enzymes already present in the muscle begin breaking down connective tissue and proteins into simpler compounds. That's what tenderizes the meat far beyond what any marinade could do." },
      { t: "h2", c: "Where the flavor actually comes from" },
      { t: "p", c: "Moisture evaporates steadily throughout the process, concentrating the beef flavor that remains. At the same time, a very specific, food-safe mold culture develops on the exterior crust, contributing the nutty, almost blue-cheese-adjacent notes that dry-aged beef is known for. That crust is trimmed away entirely before the steak ever reaches a plate." },
      { t: "quote", c: "We're not fighting the process, we're managing it. Every degree of temperature and every percentage point of humidity is a decision, not an accident." },
      { t: "p", c: "45 days is our house standard for ribeye and striploin, though we'll occasionally push a tomahawk to 60 for guests who want that flavor turned up further. Go much shorter and you lose the depth; go much longer and the funk can overwhelm the cut. It took years of tasting notes to land on 45 as our sweet spot." },
      { t: "p", c: "The yield loss is significant — we lose close to 30% of the original weight to moisture and trim by the time a cut is ready to fabricate. It's part of why dry-aged beef costs more than wet-aged. You're not just paying for the meat, you're paying for the room, the time, and the loss." },
      { t: "p", c: "Next time you order the ribeye, know that what's on your plate spent six and a half weeks becoming what it is before it ever touched the grill." }
    ]
  },
  {
    slug: "wine-pairing-red-meat",
    category: "Wine",
    readTime: "7 min read",
    date: "Mar 1, 2026",
    author: "Camille Dupont",
    role: "Head Sommelier",
    hero: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=1600&q=80",
    excerpt: "A sommelier's practical approach to pairing wine with red meat — built around fat, char, and how a dish actually behaves on the palate.",
    title: "Pairing Wine With Red Meat: A Sommelier's Guide",
    body: [
      { t: "p", c: "The old rule — big red with red meat — isn't wrong, but it's only the first sentence of a much longer conversation. What actually matters is how a wine's tannin, acidity, and weight interact with the fat, char, and seasoning of the specific cut in front of you." },
      { t: "h2", c: "Start with the fat, not the meat" },
      { t: "p", c: "A well-marbled ribeye coats the palate in fat, and tannin is what cuts through that richness and resets your tongue for the next bite. That's why a structured Cabernet Sauvignon or a Bordeaux blend works so well here — the grip of the tannin is doing real, functional work, not just sitting alongside the food." },
      { t: "p", c: "Leaner cuts, like a filet mignon, need a gentler hand. Too much tannin on a cut with little fat to soften it can taste harsh and drying. We usually steer guests toward a Pinot Noir or a lighter-styled Syrah instead — enough structure to stand up to the meat, without punishing a leaner bite." },
      { t: "quote", c: "Pairing isn't about matching intensity for intensity. It's about matching function — what does this wine need to do for this specific plate?" },
      { t: "h2", c: "Don't ignore the char" },
      { t: "p", c: "Every steak that leaves our kitchen carries some degree of Maillard char from the sear, and that char brings bitter, smoky notes that a wine needs to complement rather than fight. Wines with a touch of oak — vanilla, toast, baking spice — tend to echo those char notes rather than clash with them." },
      { t: "p", c: "For guests who prefer white wine, don't rule it out entirely. A full-bodied, oaked Chardonnay can hold its own against a butter-basted filet, particularly one finished with a compound butter rather than a heavy sauce." },
      { t: "p", c: "Our advice at the table is always the same: tell us the cut, the doneness, and the sauce you're leaning toward, and let us build the glass around the whole plate — not just the protein." }
    ]
  },
  {
    slug: "behind-the-grill-kitchen",
    category: "Chef's Notes",
    readTime: "6 min read",
    date: "Feb 20, 2026",
    author: "Elias Marchetti",
    role: "Executive Chef",
    hero: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80",
    excerpt: "A first-person look at what a single dinner service actually looks like from behind the pass at Obsidian.",
    title: "Behind the Grill: A Night in Obsidian's Kitchen",
    body: [
      { t: "p", c: "5:00 PM. The kitchen is quiet in the way it only ever is for about twenty more minutes. Prep is done, the grill is climbing toward temperature, and every station has done its final check — mise en place squared away, sauces tasted and adjusted, the pass wiped down for the third time." },
      { t: "p", c: "By 6:30, the first tickets start printing, slow and spaced out. This is the calibration window. The first few steaks of the night tell us how the grill is behaving — hot spots shift slightly with the weather and the wood, and a good grill cook is constantly reading the fire, not just the clock." },
      { t: "h2", c: "The rush" },
      { t: "p", c: "By 8:00, tickets are stacking two and three deep. This is where the room runs on rhythm more than instruction — everyone already knows their job, and the calls from the pass are short: fire table twelve, hold nine, ribeye's up. There isn't time for full sentences during the rush, and there doesn't need to be." },
      { t: "quote", c: "A good kitchen doesn't get louder when it's busy. It gets quieter, because everyone already knows exactly where they need to be." },
      { t: "p", c: "The grill station is the loneliest job in the building during a rush — one person, twelve or more cuts on the fire at once, each at a different point of doneness, each one someone's dinner. There's no room for a wrong call there." },
      { t: "p", c: "By 10:30 the tickets thin out again. The last few tables of the night get the same attention as the first — if anything, more, because by then the whole kitchen has settled into a rhythm and there's room to fuss over a plate a little longer." },
      { t: "p", c: "We close the pass around midnight, break down the stations, and start the list for tomorrow's prep before anyone goes home. Then we do it again." }
    ]
  },
  {
    slug: "five-cuts-steak-lover",
    category: "Technique",
    readTime: "8 min read",
    date: "Feb 5, 2026",
    author: "Elias Marchetti",
    role: "Executive Chef",
    hero: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1600&q=80",
    excerpt: "Ribeye, filet, striploin, tomahawk, and picanha — what actually separates them, and how to order the right one for the night you're having.",
    title: "Five Cuts Every Steak Lover Should Know",
    body: [
      { t: "p", c: "Every cut of steak comes from a different part of the animal, and that origin determines almost everything about how it eats — how much fat runs through it, how tender it is on its own, and how it responds to heat. Knowing five cuts well will get you through almost any steakhouse menu with confidence." },
      { t: "h2", c: "Ribeye" },
      { t: "p", c: "Cut from the rib section, the ribeye is prized for the thick seam of intramuscular fat running through it — the marbling that bastes the meat from the inside as it cooks. It's the cut we recommend most for guests who want maximum flavor and don't mind a little extra richness." },
      { t: "h2", c: "Filet Mignon" },
      { t: "p", c: "Taken from the tenderloin, a muscle that does very little work in the animal, the filet is the most tender cut on the menu but carries the least fat and, by extension, the mildest flavor. It rewards a confident sear and a light hand with sauce rather than a heavy one." },
      { t: "h2", c: "New York Striploin" },
      { t: "p", c: "The striploin sits between the ribeye and the filet — firmer bite, moderate marbling, and a distinct beefy flavor with a band of fat along one edge. It's the cut we point steak newcomers toward when they want something classic without extremes in either direction." },
      { t: "quote", c: "There's no single 'best' cut. There's only the best cut for the appetite you're bringing to the table tonight." },
      { t: "h2", c: "Tomahawk" },
      { t: "p", c: "Essentially a ribeye left on the bone with the rib frenched for presentation, the tomahawk is built for sharing and for spectacle as much as flavor. The bone insulates the meat near it during cooking, which can produce slightly uneven doneness edge to center — part of its charm, not a flaw." },
      { t: "h2", c: "Picanha" },
      { t: "p", c: "A South American favorite cut from the top of the rump, the picanha carries a thick fat cap on one side that's typically left on and rendered slowly over the fire. Sliced against the grain after resting, it delivers big beef flavor at a friendlier price point than the cuts above." }
    ]
  },
  {
    slug: "hosting-private-dinner",
    category: "Events",
    readTime: "5 min read",
    date: "Jan 28, 2026",
    author: "Nadia Reyes",
    role: "Events Director",
    hero: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1600&q=80",
    excerpt: "What actually goes into planning a private dinner at Obsidian, from the first call to the last course.",
    title: "Hosting the Perfect Private Dinner at Obsidian",
    body: [
      { t: "p", c: "Private dining requests come to us for every reason imaginable — milestone birthdays, closing a deal, a family gathering that's outgrown the usual table. What they all share is a desire for a room and a menu that feel built specifically for that night, not borrowed from a standard set-up." },
      { t: "h2", c: "Start with the shape of the evening" },
      { t: "p", c: "Before we talk about food, we talk about pacing. A celebratory dinner for twelve moves very differently than a corporate dinner for eight where three courses need to fit around a conversation. We build the timing of the menu around the actual purpose of the gathering, not the other way around." },
      { t: "p", c: "Our private room seats up to sixteen comfortably at a single table, with a separate service entrance so your evening never crosses paths with the main dining room. It's a genuinely closed-door experience — the kind where the room feels like it belongs to your group for the night." },
      { t: "quote", c: "The best private dinners don't feel catered. They feel like the restaurant simply reorganized itself around your table for the evening." },
      { t: "h2", c: "Building the menu together" },
      { t: "p", c: "We'll walk you through a tasting menu built from the same kitchen as the main room, adjusted for dietary needs, favorite cuts, or a specific wine you'd like the meal to be built around. Most groups land on a shared family-style format for starters, followed by individually plated mains." },
      { t: "p", c: "For groups wanting something more theatrical, we can bring elements of the open kitchen into the private room — a tableside carving, a live-fire finish on the tomahawk, or a dessert flambéed at the table." },
      { t: "p", c: "If you're planning something worth marking, reach out through our contact page with a rough headcount and date, and we'll take it from there." }
    ]
  },
  {
    slug: "tomahawk-fire-to-plate",
    category: "Chef's Notes",
    readTime: "6 min read",
    date: "Jan 14, 2026",
    author: "Elias Marchetti",
    role: "Executive Chef",
    hero: "https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?w=1600&q=80",
    excerpt: "From the aging room to the open flame to your table — tracing the full journey of our signature tomahawk.",
    title: "From Fire to Plate: The Journey of Our Tomahawk",
    body: [
      { t: "p", c: "Our tomahawk starts its journey long before it reaches the grill — as a full rib primal, hung in the aging room for a minimum of 45 days. Only after that process is complete does it get fabricated into the long-boned, frenched cut that arrives dramatically at the table." },
      { t: "h2", c: "The sear" },
      { t: "p", c: "Given its thickness, the tomahawk gets a reverse-sear treatment: a slow ride in a low oven to bring the internal temperature up gently and evenly, followed by a hard, fast sear directly over open flame to build the crust. This order matters — searing first on a cut this thick tends to overcook the exterior long before the center catches up." },
      { t: "p", c: "The bone plays a genuine role here, not just a decorative one. It insulates the meat closest to it, slowing that section's cooking slightly and creating a natural gradient of doneness from edge to bone — something we consider a feature of the cut, not something to correct for." },
      { t: "quote", c: "You're not cooking a steak when you cook a tomahawk. You're managing a small, uneven mass of meat and bone, and respecting that it won't behave like a filet." },
      { t: "h2", c: "The rest, and the finish" },
      { t: "p", c: "After the sear, the tomahawk rests for a full ten minutes before it's touched again — long enough for the juices driven to the center during cooking to redistribute back through the meat. Skip this step and you'll lose a noticeable amount of moisture the moment it's sliced." },
      { t: "p", c: "It arrives at the table whole, finished with little more than flaked salt and a pat of herb butter melting into the crust, and is carved tableside. It's the one dish on our menu where the presentation is doing just as much work as the cooking." }
    ]
  },
  {
    slug: "salt-rest-sear",
    category: "Technique",
    readTime: "5 min read",
    date: "Dec 30, 2025",
    author: "Elias Marchetti",
    role: "Executive Chef",
    hero: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1600&q=80",
    excerpt: "Three simple rules govern every steak that leaves our kitchen. None of them are complicated, but all three are non-negotiable.",
    title: "Salt, Rest, Sear: The Three Rules We Never Break",
    body: [
      { t: "p", c: "Ask any cook on our line what the three non-negotiables are and you'll get the same answer every time: salt early, sear hot, rest properly. None of it is a secret technique — it's just discipline, applied the same way on every single cut, every single night." },
      { t: "h2", c: "Salt early, not at the last second" },
      { t: "p", c: "We salt our steaks well ahead of cooking, not right before the pan. Salt applied early has time to draw moisture to the surface and then reabsorb back into the meat, carrying seasoning with it and helping the exterior dry slightly for a better crust. Salting right before cooking just sits on the surface and does far less work." },
      { t: "h2", c: "Sear hot, and leave it alone" },
      { t: "p", c: "Our grill runs hotter than most home setups can manage, and that heat is doing the real work of building a deep, browned crust through the Maillard reaction. The instinct to move or flip a steak constantly is almost always the wrong one — let it sit long enough to actually develop that crust before it's touched again." },
      { t: "quote", c: "Every flip you make out of impatience is a flip that costs you crust. The grill needs less help than people think." },
      { t: "h2", c: "Rest, every single time" },
      { t: "p", c: "The most commonly skipped rule at home is the rest. Cooking pushes juices toward the center of the meat, and cutting into a steak straight off the heat sends most of that moisture straight onto the cutting board instead of staying in the meat. Five to ten minutes, depending on thickness, is the difference between a juicy plate and a dry one." },
      { t: "p", c: "None of these three rules require special equipment or rare technique. They just require doing them the same way, every time, without shortcuts — which is harder than it sounds, and exactly why we hold the line on all three." }
    ]
  }
];

/* ===================== Single Blog Post Page (blog-post.html) ===================== */
const postContainer = document.getElementById('postContent');
if (postContainer) {
  (function renderBlogPost() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('post');
    const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];

    document.title = post.title + ' — OBSIDIAN Journal';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.excerpt);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', post.title + ' (Concept Project)');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', post.excerpt);
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', post.hero);

    const heroImg = document.getElementById('postHeroImg');
    if (heroImg) { heroImg.src = post.hero; heroImg.alt = post.title; }

    const catEl = document.getElementById('postCategory');
    if (catEl) catEl.textContent = post.category;
    const titleEl = document.getElementById('postTitle');
    if (titleEl) titleEl.textContent = post.title;
    const metaEl = document.getElementById('postMeta');
    if (metaEl) metaEl.textContent = post.category + ' · ' + post.readTime;
    const authorEl = document.getElementById('postAuthor');
    if (authorEl) authorEl.textContent = 'Written by ' + post.author + ', ' + post.role;
    const dateEl = document.getElementById('postDate');
    if (dateEl) dateEl.textContent = 'Published ' + post.date;

    const bodyEl = document.getElementById('postBody');
    if (bodyEl) {
      bodyEl.innerHTML = post.body.map(block => {
        if (block.t === 'h2') return `<h2 class="font-heading text-2xl md:text-3xl mt-10 mb-4 text-ink">${block.c}</h2>`;
        if (block.t === 'quote') return `<blockquote class="border-l-2 border-gold pl-6 py-1 my-8 font-heading text-xl md:text-2xl italic text-wine leading-snug">${block.c}</blockquote>`;
        return `<p class="text-stone leading-relaxed mb-5">${block.c}</p>`;
      }).join('');
    }

    // Related articles — up to 3 other posts
    const relatedEl = document.getElementById('relatedGrid');
    if (relatedEl) {
      const related = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);
      relatedEl.innerHTML = related.map(p => `
        <article class="bg-white border border-line overflow-hidden hover:border-gold hover:-translate-y-1.5 transition-all duration-500 group">
          <a href="blog-post.html?post=${p.slug}" class="block h-52 overflow-hidden">
            <img src="${p.hero.replace('w=1600','w=700')}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async">
          </a>
          <div class="p-6">
            <span class="text-stone text-xs tracking-[1.5px] uppercase">${p.category} · ${p.date}</span>
            <h3 class="font-heading text-xl my-3 leading-snug"><a href="blog-post.html?post=${p.slug}" class="hover:text-gold transition">${p.title}</a></h3>
            <a href="blog-post.html?post=${p.slug}" class="text-gold text-xs tracking-[1.5px] uppercase border-b border-gold pb-0.5">Read More</a>
          </div>
        </article>
      `).join('');
    }

    // Share links use the current page URL once the slug is known
    const shareUrl = encodeURIComponent(window.location.origin + window.location.pathname + '?post=' + post.slug);
    const shareText = encodeURIComponent(post.title + ' — OBSIDIAN Journal');
    const twitterLink = document.getElementById('shareTwitter');
    if (twitterLink) twitterLink.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
    const facebookLink = document.getElementById('shareFacebook');
    if (facebookLink) facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    const mailLink = document.getElementById('shareEmail');
    if (mailLink) mailLink.href = `mailto:?subject=${shareText}&body=${shareUrl}`;
  })();
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
