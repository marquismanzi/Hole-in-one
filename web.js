// Wait for DOM
document.addEventListener('DOMContentLoaded', function(){
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navMenu = document.getElementById('navMenu');

  menuToggle && menuToggle.addEventListener('click', function(){
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', !isHidden);
    // also toggle desktop nav for small screens
    navMenu && navMenu.classList.toggle('hidden', !isHidden);
  });

  // Close mobile menu when a nav link is clicked
  const navLinks = document.querySelectorAll('#mobileMenu a, #navMenu a');
  navLinks.forEach(a => a.addEventListener('click', () => {
    if(window.innerWidth < 768){
      mobileMenu.classList.add('hidden');
      navMenu && navMenu.classList.add('hidden');
    }
  }));

  // Accessibility toggles
  const toggleContrast = document.getElementById('toggleContrast');
  const toggleTextSize = document.getElementById('toggleTextSize');
  toggleContrast && toggleContrast.addEventListener('click', function(){
    document.documentElement.classList.toggle('high-contrast');
  });
  toggleTextSize && toggleTextSize.addEventListener('click', function(){
    document.documentElement.classList.toggle('large-text');
  });

  // Lazy load images: mark loaded when they finish
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    if(img.complete) img.classList.add('loaded');
    else img.addEventListener('load', () => img.classList.add('loaded'));
  });

  // Contact form validation and fake submit
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      // simple validation
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');
      let ok = true;
      // name
      if(!name.value.trim()){ ok = false; showError('nameError'); } else { hideError('nameError'); }
      // email
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)){ ok = false; showError('emailError'); } else { hideError('emailError'); }
      // message (optional but if provided minimum length)
      if(message.value && message.value.length < 10){ ok = false; showError('messageError'); } else { hideError('messageError'); }

      if(!ok) return;

      // simulate submit
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true; submitBtn.textContent = 'Sending...';
      setTimeout(() => {
        submitBtn.disabled = false; submitBtn.textContent = 'Submit';
        form.reset();
        alert('Thanks — we\'ll contact you soon.');
      }, 900);
    });
  }

  function showError(id){
    const el = document.getElementById(id); if(el) el.classList.remove('hidden');
  }
  function hideError(id){
    const el = document.getElementById(id); if(el) el.classList.add('hidden');
  }

  // Optional: simple hero slider that cycles a few background images
  const hero = document.querySelector('.hero-slider');
  if(hero){
    const images = [
      'https://images.unsplash.com/photo-1590692473604-69f3781f925f',
      'https://images.unsplash.com/photo-1505843505202-3c3f7a6e8c35',
      'https://images.unsplash.com/photo-1508253578933-e5fc4f9a9f4c'
    ];
    let idx = 0;
    setInterval(()=>{
      idx = (idx+1) % images.length;
      hero.style.backgroundImage = `url('${images[idx]}')`;
    },7000);
  }
});
