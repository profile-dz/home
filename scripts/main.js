
// Card Expander Carousel Logic for .cv-cards
const list = document.querySelector('.cv-cards');
if (list) {
  const items = list.querySelectorAll('li');
  const setIndex = (event) => {
    const closest = event.target.closest('li');
    if (closest) {
      const index = [...items].indexOf(closest);
      const cols = new Array(list.children.length)
        .fill()
        .map((_, i) => {
          items[i].dataset.active = (index === i).toString();
          return index === i ? '10fr' : '1fr';
        })
        .join(' ');
      list.style.setProperty('grid-template-columns', cols);
    }
  };
  list.addEventListener('focus', setIndex, true);
  list.addEventListener('click', setIndex);
  list.addEventListener('pointermove', setIndex);
  const resync = () => {
    const w = Math.max(
      ...[...items].map((i) => {
        return i.offsetWidth;
      })
    );
    list.style.setProperty('--article-width', w);
  };
  window.addEventListener('resize', resync);
  resync();
}

// MOBILE MENU FUNCTIONALITY
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    const isOpen = navMenu.classList.contains('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.body.classList.toggle('menu-open', isOpen);
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('nav ul');
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
    });
});

// Keyboard support for mobile menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('nav ul');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        }
    }
});
