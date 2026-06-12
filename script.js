document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Premium Dark Mode Engine (Theme Switcher)
    // ==========================================
    const themeSlider = document.getElementById('theme-slider');
    
    // Evaluate system background parameters
    const getStoredTheme = () => localStorage.getItem('academic-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = getStoredTheme() || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);

    themeSlider.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('academic-theme', targetTheme);
    });

    // ==========================================
    // 2. High Performance Scroll Reveal Pipeline
    // ==========================================
    const revealTargets = document.querySelectorAll('.reveal');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Keep observing if subtle entrance re-triggering is needed, or unobserve for performance
                elementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    });

    revealTargets.forEach(target => elementObserver.observe(target));

    // ==========================================
    // 3. Interactive Bibliographic Metadata Drawers
    // ==========================================
    const bibToggleButtons = document.querySelectorAll('.toggle-bib');

    bibToggleButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const structuralParent = e.target.closest('.pub-strip');
            const targetedDrawer = structuralParent.querySelector('.drawer-bibtex');
            
            // Toggle presentation matrix
            targetedDrawer.classList.toggle('open');
            
            if (targetedDrawer.classList.contains('open')) {
                btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Close Code';
                btn.style.borderColor = 'var(--text-main)';
            } else {
                btn.innerHTML = '<i class="fa-solid fa-code"></i> BibTeX';
                btn.style.borderColor = 'var(--border-soft)';
            }
        });
    });

    // ==========================================
    // 4. Subtle Lens Magnetic Interaction Effect
    // ==========================================
    const lensFrame = document.querySelector('.interactive-lens-frame');
    if (lensFrame) {
        document.addEventListener('mousemove', (e) => {
            const xOffset = (window.innerWidth / 2 - e.clientX) * 0.02;
            const yOffset = (window.innerHeight / 2 - e.clientY) * 0.02;
            lensFrame.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
        });
    }
});
