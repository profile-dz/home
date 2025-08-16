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
const translations = {
    en: {
        brand: "ProFile",
        nav_services: "Services",
        nav_about: "About",
        nav_contact: "Contact",
        hero_cta: "Learn More",
        card_resume_title: "Resume",
        card_resume_desc: "Get a professional resume crafted to match your goals. We highlight your skills, experience, and strengths with design and clarity that gets you noticed.",
        card_letter_title: "Motivation Letter",
        card_letter_desc: "Make a strong impression with a personalized letter that captures who you are and why you're the perfect fit. clear, confident, and authentic.",
        card_linkedin_title: "LinkedIn Profile",
        card_linkedin_desc: "Turn your LinkedIn into a powerful career tool. We help you structure your profile, choose the right keywords, and build a strong personal brand.",
        card_learn_more: "Learn More <i class='fa-solid fa-arrow-right'></i>",
        view_all_services: "View All Services",
        portfolio1_title: "Stuck in the Pile",
        portfolio1_p1: "This is the CV that disappears.",
        portfolio1_p2: "Messy formatting.",
        portfolio1_p3: "Weak words.",
        portfolio1_p4: "No personality.",
        portfolio1_p5: "It doesn’t say <em>who you are</em> or <em>what you can do</em>.",
        portfolio1_p6: "Recruiters barely look.",
        portfolio1_p7: "It's just... another file in the stack.",
        portfolio2_title: "The ProFile Difference",
        portfolio2_p1: "This isn’t just a CV — it's your story.",
        portfolio2_p2: "Designed by experts.",
        portfolio2_p3: "Approved by recruiters.",
        portfolio2_p4: "Optimized for ATS systems.",
        portfolio2_p5: "It speaks in results, not clichés.",
        portfolio2_p6: "Clean, modern, and tailored to <em>you</em>.",
        portfolio2_p7: "With <strong>ProFile</strong>, your first impression becomes unforgettable.",
        mobile_portfolio1: "Basic CV",
        mobile_portfolio2: "ProFile CV",
        why_choose_title: "Why Choose ProFile?",
        feature1_title: "Personalised for You",
        feature1_desc: "Every CV and letter is crafted to fit your goals and industry.",
        feature2_title: "Recruiter & ATS Approved",
        feature2_desc: "We follow global CV rules to help you pass the 6-second test.",
        feature3_title: "Fast & Responsive",
        feature3_desc: "Get results within 4 hours. No delays.",
        feature4_title: "Proven Results",
        feature4_desc: "Students and job seekers land interviews in Algeria and abroad.",
        how_title: "How It Works",
        how_step1_title: "Submit your request",
        how_step1_desc: "Tell us what you need and your career goals by filling out the appropriate form.",
        how_step2_title: "We contact you",
        how_step2_desc: "We'll reach out to discuss your requirements",
        how_step3_title: "Get your professional documents",
        how_step3_desc: "Receive your polished, professional materials",
        get_started: "Get Started",
        footer_slogan: '"Everything.. starts with a profile."',
        footer_company: "Agency",
        footer_services: "Services",
        footer_resume: "Resume Writing",
        footer_letter: "Motivation Letters",
        footer_linkedin: "LinkedIn Makeover",
        footer_newsletter: "Stay Updated",
        footer_newsletter_desc: "Get free tips and insights about career development and professional growth.",
        footer_email_placeholder: "Enter your email",
        footer_privacy: "We respect your privacy. Unsubscribe anytime.",
        footer_copyright: "&copy; 2025 ProFile. All rights reserved.",
        footer_built: "Built with ❤️ by Nacer"
    },
    fr: {
        brand: "ProFile",
        nav_services: "Services",
        nav_about: "À propos",
        nav_contact: "Contact",
        hero_cta: "En savoir plus",
        card_resume_title: "CV",
        card_resume_desc: "Obtenez un CV professionnel adapté à vos objectifs. Nous mettons en valeur vos compétences, votre expérience et vos atouts avec un design et une clarté qui vous distinguent.",
        card_letter_title: "Lettre de motivation",
        card_letter_desc: "Faites forte impression avec une lettre personnalisée qui reflète qui vous êtes et pourquoi vous êtes le candidat idéal. Claire, confiante et authentique.",
        card_linkedin_title: "Profil LinkedIn",
        card_linkedin_desc: "Transformez votre LinkedIn en un véritable atout carrière. Nous structurons votre profil, choisissons les bons mots-clés et bâtissons une marque personnelle forte.",
        card_learn_more: "En savoir plus <i class='fa-solid fa-arrow-right'></i>",
        view_all_services: "Voir tous les services",
        portfolio1_title: "Perdu dans la pile",
        portfolio1_p1: "C'est le CV qui disparaît.",
        portfolio1_p2: "Mise en page désordonnée.",
        portfolio1_p3: "Mots faibles.",
        portfolio1_p4: "Aucune personnalité.",
        portfolio1_p5: "Il ne dit pas <em>qui vous êtes</em> ni <em>ce que vous pouvez faire</em>.",
        portfolio1_p6: "Les recruteurs ne regardent presque pas.",
        portfolio1_p7: "C'est juste... un fichier de plus dans la pile.",
        portfolio2_title: "La différence avec ProFile",
        portfolio2_p1: "Ce n'est pas juste un CV — c'est votre histoire.",
        portfolio2_p2: "Conçu par des experts.",
        portfolio2_p3: "Approuvé par les recruteurs.",
        portfolio2_p4: "Optimisé pour les systèmes ATS.",
        portfolio2_p5: "Il parle en résultats, pas en clichés.",
        portfolio2_p6: "Propre, moderne et adapté à <em>vous</em>.",
        portfolio2_p7: "Avec <strong>ProFile</strong>, votre première impression devient inoubliable.",
        mobile_portfolio1: "CV Basique",
        mobile_portfolio2: "CV ProFile",
        why_choose_title: "Pourquoi choisir ProFile ?",
        feature1_title: "Personnalisé pour vous",
        feature1_desc: "Chaque CV et lettre est conçu pour vos objectifs et votre secteur.",
        feature2_title: "Validé par les recruteurs & ATS",
        feature2_desc: "Nous suivons les règles mondiales du CV pour vous aider à passer le test des 6 secondes.",
        feature3_title: "Rapide & réactif",
        feature3_desc: "Résultats en 4h. Pas de délais.",
        feature4_title: "Résultats prouvés",
        feature4_desc: "Étudiants et chercheurs d'emploi décrochent des entretiens en Algérie et à l'étranger.",
        how_title: "Comment ça marche",
        how_step1_title: "Envoyez votre demande",
        how_step1_desc: "Dites-nous vos besoins et vos objectifs de carrière en remplissant le formulaire adapté.",
        how_step2_title: "Nous vous contactons",
        how_step2_desc: "Nous vous contacterons pour discuter de vos besoins",
        how_step3_title: "Recevez vos documents professionnels",
        how_step3_desc: "Recevez vos documents professionnels soignés et prêts à l'emploi",
        get_started: "Commencer",
        footer_slogan: '"Tout commence par un profil."',
        footer_company: "Agence",
        footer_services: "Services",
        footer_resume: "Rédaction de CV",
        footer_letter: "Lettres de motivation",
        footer_linkedin: "Optimisation LinkedIn",
        footer_newsletter: "Restez informé",
        footer_newsletter_desc: "Recevez des conseils gratuits sur le développement de carrière et la croissance professionnelle.",
        footer_email_placeholder: "Entrez votre email",
        footer_privacy: "Nous respectons votre vie privée. Désabonnez-vous à tout moment.",
        footer_copyright: "&copy; 2025 ProFile. Tous droits réservés.",
        footer_built: "Réalisé avec ❤️ par Nacer"
    }
};

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