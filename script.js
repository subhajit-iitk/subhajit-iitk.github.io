document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Theme Configuration Engine (Dark/Light)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    if (themeToggle && themeIcon) {
        const savedTheme = localStorage.getItem('theme-premium-overlay');
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
                localStorage.setItem('theme-premium-overlay', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('theme-premium-overlay', 'dark');
            }
        });
    }

    // ==========================================
    // 2. Mobile Navigation Toggle System
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if(navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // ==========================================
    // 3. Highlight Current Sub-Page Natively
    // ==========================================
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
            link.style.color = 'var(--text-primary)';
            link.style.fontWeight = '700';
        }
    });

    // ==========================================
    // 4. Reveal Animation Matrix Pipeline
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: "0px 0px -20px 0px"
        });

        revealElements.forEach(element => revealObserver.observe(element));
    }

    // ==========================================
    // 5. Dynamic BibTeX Drawer Actions
    // ==========================================
    const bibtexButtons = document.querySelectorAll('.bibtex-trigger');

    bibtexButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const currentCard = e.target.closest('.pub-card');
            const bibtexBlock = currentCard.querySelector('.bibtex-content');
            
            if (bibtexBlock) {
                bibtexBlock.classList.toggle('active');
                if(bibtexBlock.classList.contains('active')) {
                    button.innerHTML = '<i class="fas fa-times"></i> Hide BibTeX';
                } else {
                    button.innerHTML = '<i class="fas fa-quote-right"></i> BibTeX';
                }
            }
        });
    });
});
