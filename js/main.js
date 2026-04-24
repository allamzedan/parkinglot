const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "CityLot.com",
  "description": "Premium .com domain asset for parking, PropTech, urban land, mobility, and city-facing digital platforms.",
  "brand": { "@type": "Brand", "name": "CityLot" },
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "USD",
      "minPrice": 25000
    },
    "availability": "https://schema.org/InStock"
  }
};

const structuredDataScript = document.createElement('script');
structuredDataScript.type = 'application/ld+json';
structuredDataScript.textContent = JSON.stringify(structuredData);
document.head.appendChild(structuredDataScript);

const copyBtn = document.getElementById('copyBtn');
const emailText = document.getElementById('emailText');
const toast = document.getElementById('toast');

copyBtn?.addEventListener('click', async () => {
  const value = emailText?.textContent?.trim();

  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);
    toast.textContent = 'Copied.';
    copyBtn.style.transform = 'scale(.96)';
    setTimeout(() => copyBtn.style.transform = '', 140);
    setTimeout(() => toast.textContent = '', 1800);
  } catch (error) {
    toast.textContent = value;
    setTimeout(() => toast.textContent = '', 2400);
  }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const selector = link.getAttribute('href');
    if (!selector || selector === '#') return;

    const target = document.querySelector(selector);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior:'smooth', block:'start' });
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:.14 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

const hero = document.querySelector('.hero');

hero?.addEventListener('mousemove', event => {
  const rect = hero.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - .5) * 10;
  const y = ((event.clientY - rect.top) / rect.height - .5) * 8;

  hero.style.setProperty('--x', `${x}px`);
  hero.style.setProperty('--y', `${y}px`);

  hero.animate([
    { transform:'translate3d(0,0,0)' },
    { transform:`translate3d(${x * .08}px,${y * .08}px,0)` }
  ], { duration:600, fill:'forwards', easing:'ease-out' });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.use-card img').forEach(img => {
  img.addEventListener('click', () => {
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose?.focus();
  });
});

function closeLightbox(){
  if (!lightbox || !lightboxImg) return;

  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  lightboxImg.alt = '';
  document.body.style.overflow = '';
}

lightboxClose?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});