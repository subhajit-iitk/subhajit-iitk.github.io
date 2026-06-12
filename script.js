document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Theme Configuration Engine (Dark/Light)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check local storage or system preferences
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================
    // 2. Mobile Navigation Setup
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if(navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Close menu when a navigation item link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // ==========================================
    // 3. Reveal on Scroll (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animates once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================
    // 4. Active Navigation Link Tracker
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    });

    // ==========================================
    // 5. BibTeX Dynamic Toggle Matrix
    // ==========================================
    const bibtexButtons = document.querySelectorAll('.bibtex-trigger');

    bibtexButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Find the closest sibling metadata block
            const currentCard = e.target.closest('.pub-card');
            const bibtexBlock = currentCard.querySelector('.bibtex-content');
            
            // Toggle view state
            bibtexBlock.classList.toggle('active');
            
            if(bibtexBlock.classList.contains('active')) {
                button.innerHTML = '<i class="fas fa-times"></i> Hide BibTeX';
            } else {
                button.innerHTML = '<i class="fas fa-quote-right"></i> BibTeX';
            }
        });
    });
});
