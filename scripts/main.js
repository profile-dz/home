// ===== SMOOTH SCROLL FOR ANCHOR LINKS (with sticky header offset) =====
document.addEventListener('DOMContentLoaded', function() {
    function smoothScrollTo(to, duration = 600) {
        const start = window.pageYOffset;
        const change = to - start;
        const startTime = performance.now();
        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;
            window.scrollTo(0, start + change * ease);
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }
        requestAnimationFrame(animateScroll);
    }
    document.querySelectorAll('nav ul li a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 5;
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                } else {
                    smoothScrollTo(targetPosition);
                }
            }
        });
    });
});

// ===== LANGUAGE TRANSLATION =====


function setLanguage(lang) {
    const dict = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT' && el.hasAttribute('data-i18n-placeholder')) {
                el.placeholder = dict[key];
            } else {
                el.innerHTML = dict[key];
            }
        }
    });
    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });
    // Update lang button active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const langBtn = document.getElementById('lang-' + lang);
    if (langBtn) langBtn.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Language switcher
    const btnEn = document.getElementById('lang-en');
    const btnFr = document.getElementById('lang-fr');
    if (btnEn && btnFr) {
        btnEn.addEventListener('click', function() {
            setLanguage('en');
            localStorage.setItem('lang', 'en');
        });
        btnFr.addEventListener('click', function() {
            setLanguage('fr');
            localStorage.setItem('lang', 'fr');
        });
    }
    // Set initial language
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);
});

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

// DESKTOP PORTFOLIO SLIDER FUNCTIONALITY
let desktopSlideIndex = 0;
const desktopSlides = document.querySelector('.portfolio-desktop .slide');
const desktopDots = document.querySelectorAll('.portfolio-desktop .dot');
const contentSlides = document.querySelectorAll('.content-slide');

function showDesktopSlide(index) {
    // Hide all desktop slides
    document.querySelectorAll('.portfolio-desktop .slide').forEach(slide => slide.classList.remove('active'));
    desktopDots.forEach(dot => dot.classList.remove('active'));
    contentSlides.forEach(slide => slide.classList.remove('active'));
    
    // Show current desktop slide
    const currentSlide = document.querySelectorAll('.portfolio-desktop .slide')[index];
    if (currentSlide) {
        currentSlide.classList.add('active');
    }
    if (desktopDots[index]) {
        desktopDots[index].classList.add('active');
    }
    if (contentSlides[index]) {
        contentSlides[index].classList.add('active');
    }
}

function changeDesktopSlide(direction) {
    desktopSlideIndex += direction;
    
    // Only allow 2 slides (0 and 1)
    if (desktopSlideIndex >= 2) {
        desktopSlideIndex = 0;
    }
    if (desktopSlideIndex < 0) {
        desktopSlideIndex = 1;
    }
    
    showDesktopSlide(desktopSlideIndex);
}

function currentDesktopSlide(index) {
    desktopSlideIndex = index - 1;
    showDesktopSlide(desktopSlideIndex);
}

// MOBILE PORTFOLIO SLIDER FUNCTIONALITY
let mobileSlideIndex = 0;
const mobileSlides = document.querySelectorAll('.portfolio-mobile .slide');
const mobileDots = document.querySelectorAll('.portfolio-mobile .dot');
const titleSlides = document.querySelectorAll('.title-slide');

function showMobileSlide(index) {
    // Hide all mobile slides
    mobileSlides.forEach(slide => slide.classList.remove('active'));
    mobileDots.forEach(dot => dot.classList.remove('active'));
    titleSlides.forEach(slide => slide.classList.remove('active'));
    
    // Show current mobile slide
    if (mobileSlides[index]) {
        mobileSlides[index].classList.add('active');
    }
    if (mobileDots[index]) {
        mobileDots[index].classList.add('active');
    }
    if (titleSlides[index]) {
        titleSlides[index].classList.add('active');
    }
}

function changeMobileSlide(direction) {
    mobileSlideIndex += direction;
    
    // Only allow 2 slides (0 and 1)
    if (mobileSlideIndex >= 2) {
        mobileSlideIndex = 0;
    }
    if (mobileSlideIndex < 0) {
        mobileSlideIndex = 1;
    }
    
    showMobileSlide(mobileSlideIndex);
}

function currentMobileSlide(index) {
    mobileSlideIndex = index - 1;
    showMobileSlide(mobileSlideIndex);
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', function() {
    showDesktopSlide(0);
    showMobileSlide(0);
});

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

(function() {
  emailjs.init('L_JtyoBvSOqKCxWJ0'); // <-- Replace with your EmailJS user ID
})();
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  emailjs.sendForm('service_la277p9', 'template_evejkdn', this)
    .then(function() {
      document.getElementById('contact-success').style.display = 'block';
      document.getElementById('contactForm').reset();
    }, function(error) {
      alert('Failed to send message. Please try again later.');
    });
});

// Newsletter form handler
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("newsletterEmail");
  const successMsg = document.getElementById("newsletter-success");

  // ⚠️ ضع هنا رابط API الخاص بك من SheetDB
  const SHEETDB_URL = "https://sheetdb.io/api/v1/ewszamlta81sh"; 

  // Email regex (يتحقق من صحة البريد)
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email || !isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    fetch(SHEETDB_URL, {
      method: "POST",
      body: JSON.stringify({ data: { email: email } }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Reset input
        emailInput.value = "";

        // Show success message
        successMsg.style.display = "block";

        // Hide after 5s
        setTimeout(() => {
          successMsg.style.display = "none";
        }, 5000);
      })
      .catch((err) => {
        console.error("Newsletter error:", err);
        alert("Something went wrong. Please try again later.");
      });
  });
});
