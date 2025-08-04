
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
