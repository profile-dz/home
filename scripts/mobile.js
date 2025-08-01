// Mobile-specific JavaScript for ProFile website

class MobileApp {
    constructor() {
        this.isMenuOpen = false;
        this.currentSlide = 0;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupTouchGestures();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();
    }

    setupEventListeners() {
        // Menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileNav = document.getElementById('mobileNav');
        const closeMenu = document.querySelector('.close-menu');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleMenu());
        }

        if (closeMenu) {
            closeMenu.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileNav && !mobileNav.contains(e.target) && 
                !e.target.closest('.menu-toggle')) {
                this.closeMenu();
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });

        // Portfolio slider controls
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showSlide(index));
        });

        // Auto-advance slides
        this.startSlideAutoAdvance();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loading');
                    this.addStaggeredAnimation(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    setupTouchGestures() {
        // Touch feedback for interactive elements
        const touchElements = document.querySelectorAll('.service-card, .cta-mobile, .social-links a');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                this.addTouchFeedback(element, e);
            });
            
            element.addEventListener('touchend', () => {
                this.removeTouchFeedback(element);
            });
        });

        // Swipe gestures for portfolio slider
        const portfolioSlider = document.querySelector('.portfolio-slider');
        if (portfolioSlider) {
            portfolioSlider.addEventListener('touchstart', (e) => {
                this.handleTouchStart(e);
            });

            portfolioSlider.addEventListener('touchmove', (e) => {
                this.handleTouchMove(e);
            });

            portfolioSlider.addEventListener('touchend', (e) => {
                this.handleTouchEnd(e);
            });
        }

        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    setupPerformanceOptimizations() {
        // Lazy load images
        this.lazyLoadImages();

        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 16); // ~60fps
        });

        // Optimize animations
        this.setupAnimationOptimizations();
    }

    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Focus management
        this.setupFocusManagement();

        // Screen reader announcements
        this.setupScreenReaderSupport();
    }

    // Menu functionality
    toggleMenu() {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) {
            this.isMenuOpen = !this.isMenuOpen;
            mobileNav.classList.toggle('active');
            
            // Announce to screen readers
            this.announceToScreenReader(this.isMenuOpen ? 'Menu opened' : 'Menu closed');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        }
    }

    closeMenu() {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav && this.isMenuOpen) {
            this.isMenuOpen = false;
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Smooth scrolling
    smoothScrollTo(target) {
        const headerHeight = document.querySelector('.mobile-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Portfolio slider
    showSlide(index) {
        const slides = document.querySelectorAll('.portfolio-slide');
        const dots = document.querySelectorAll('.slider-dot');
        
        if (slides.length === 0) return;

        this.currentSlide = index;
        
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Announce slide change to screen readers
        this.announceToScreenReader(`Slide ${index + 1} of ${slides.length}`);
    }

    startSlideAutoAdvance() {
        const slides = document.querySelectorAll('.portfolio-slide');
        if (slides.length > 1) {
            setInterval(() => {
                this.currentSlide = (this.currentSlide + 1) % slides.length;
                this.showSlide(this.currentSlide);
            }, 5000);
        }
    }

    // Touch gestures
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (!this.touchStartX || !this.touchStartY) return;

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;

        const diffX = this.touchStartX - touchEndX;
        const diffY = this.touchStartY - touchEndY;

        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            e.preventDefault();
        }
    }

    handleTouchEnd(e) {
        if (!this.touchStartX || !this.touchStartY) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const diffX = this.touchStartX - touchEndX;
        const diffY = this.touchStartY - touchEndY;

        // Swipe threshold
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            const slides = document.querySelectorAll('.portfolio-slide');
            if (slides.length > 1) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    this.currentSlide = (this.currentSlide + 1) % slides.length;
                } else {
                    // Swipe right - previous slide
                    this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
                }
                this.showSlide(this.currentSlide);
            }
        }

        this.touchStartX = 0;
        this.touchStartY = 0;
    }

    // Touch feedback
    addTouchFeedback(element, e) {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        
        // Add ripple effect
        this.createRippleEffect(element, e);
    }

    removeTouchFeedback(element) {
        element.style.transform = '';
        element.style.transition = '';
    }

    createRippleEffect(element, e) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.touches[0].clientX - rect.left - size / 2;
        const y = e.touches[0].clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Performance optimizations
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    handleScroll() {
        // Add scroll-based animations or effects here
        const header = document.querySelector('.mobile-header');
        if (header) {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    }

    setupAnimationOptimizations() {
        // Use requestAnimationFrame for smooth animations
        const animatedElements = document.querySelectorAll('.service-card, .cta-mobile');
        
        animatedElements.forEach(element => {
            element.style.willChange = 'transform';
        });
    }

    // Accessibility
    handleKeyboardNavigation(e) {
        switch(e.key) {
            case 'Escape':
                this.closeMenu();
                break;
            case 'ArrowLeft':
                if (this.isMenuOpen) {
                    this.navigateMenu(-1);
                }
                break;
            case 'ArrowRight':
                if (this.isMenuOpen) {
                    this.navigateMenu(1);
                }
                break;
        }
    }

    navigateMenu(direction) {
        const menuItems = document.querySelectorAll('.mobile-nav a');
        const currentIndex = Array.from(menuItems).findIndex(item => 
            item === document.activeElement
        );
        
        if (currentIndex !== -1) {
            const newIndex = (currentIndex + direction + menuItems.length) % menuItems.length;
            menuItems[newIndex].focus();
        }
    }

    setupFocusManagement() {
        // Trap focus in mobile menu when open
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) {
            const focusableElements = mobileNav.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            mobileNav.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }
    }

    setupScreenReaderSupport() {
        // Add ARIA labels and roles
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            menuToggle.setAttribute('aria-expanded', 'false');
        }

        // Update aria-expanded when menu toggles
        this.updateAriaExpanded = () => {
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', this.isMenuOpen.toString());
            }
        };
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Animation helpers
    addStaggeredAnimation(element) {
        const children = element.querySelectorAll('.service-card, .cta-mobile');
        children.forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Initialize mobile app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileApp();
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Service Worker for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart);
        }
    }
});

performanceObserver.observe({ entryTypes: ['navigation'] });

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could send this to an analytics service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an analytics service
}); 