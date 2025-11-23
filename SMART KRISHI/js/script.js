// SMART KRISHI - JavaScript for Interactive Features

// Mobile Navigation Toggle & Sticky Header
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar') || document.querySelector('.header');

    // Sticky header with blur on scroll
    if (navbar) {
        const onScroll = () => {
            if (window.scrollY > 24) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const isActive = navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Smooth scrolling for anchor links with focus management
    // Handle both #solution and #features pointing to the same section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            let target = document.querySelector(href);
            
            // If #features is clicked, scroll to #solution section
            if (href === '#features' && !target) {
                target = document.querySelector('#solution');
            }
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Focus target for accessibility
                setTimeout(() => {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }, 300);
            }
        });
    });

    // Animate sensor readings in hero section
    animateSensorReadings();
    
    // Initialize progress bar
    initProgressBar();
});

// Animate sensor readings
function animateSensorReadings() {
    const moistureEl = document.getElementById('moisture');
    const phEl = document.getElementById('ph');
    const tempEl = document.getElementById('temp');

    if (moistureEl && phEl && tempEl) {
        // Simulate real-time sensor readings
        setInterval(() => {
            // Moisture: 50-80%
            const moisture = (50 + Math.random() * 30).toFixed(0);
            moistureEl.textContent = moisture + '%';

            // pH: 6.0-7.5
            const ph = (6.0 + Math.random() * 1.5).toFixed(1);
            phEl.textContent = ph;

            // Temperature: 25-32°C
            const temp = (25 + Math.random() * 7).toFixed(0);
            tempEl.textContent = temp + '°C';
        }, 2000);
    }
}

// Progress Bar for long pages
function initProgressBar() {
    let progressBar = document.querySelector('.progress-bar') || document.querySelector('.top-progress');
    
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'top-progress';
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-label', 'Page scroll progress');
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        document.body.appendChild(progressBar);
    }
    
    const updateProgress = () => {
        const h = document.documentElement;
        const percent = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        progressBar.style.width = `${Math.min(Math.max(percent, 0), 100)}%`;
        progressBar.setAttribute('aria-valuenow', Math.round(percent));
    };
    
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .problem-card, .insight-card, .case-study-card, .community-card, .future-card, .card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
