// ===================================
// HELLO SUNSHINE V3 - JAVASCRIPT
// Interactive Elements & Animations
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // FLOATING PARTICLES SYSTEM
    // ===================================
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles');
        document.body.appendChild(particlesContainer);
        
        // Create different sized particles for depth
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 15) + 's';
            
            // Vary particle sizes
            const size = 2 + Math.random() * 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Vary opacity
            particle.style.opacity = 0.3 + Math.random() * 0.7;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // ===================================
    // PARALLAX SUN EFFECT
    // ===================================
    const sun = document.querySelector('.sun');
    let ticking = false;
    
    function updateSunPosition(scrollPos) {
        const translateY = scrollPos * 0.3;
        const rotate = scrollPos * 0.05;
        sun.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) rotate(${rotate}deg)`;
    }
    
    // Add parallax to cards
    const parallaxCards = document.querySelectorAll('.about-card, .habit-card');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateSunPosition(scrollPos);
                
                // Parallax cards
                parallaxCards.forEach((card, index) => {
                    const rect = card.getBoundingClientRect();
                    const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                    
                    if (scrollPercent > 0 && scrollPercent < 1) {
                        const movement = (scrollPercent - 0.5) * 20;
                        card.style.transform = `translateY(${movement}px)`;
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(18, 18, 26, 0.9)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ===================================
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===================================
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe cards and sections with enhanced stagger
    const cards = document.querySelectorAll('.about-card, .habit-card, .impact-stat');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        fadeInObserver.observe(card);
    });
    
    // ===================================
    // SECTION AMBIENT GLOW ON SCROLL
    // ===================================
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ===================================
    // TIMELINE ANIMATION ON SCROLL
    // ===================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // ===================================
    // STATS COUNTER ANIMATION
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    function animateStats() {
        statNumbers.forEach((stat, index) => {
            const finalValue = stat.textContent;
            
            if (finalValue === '∞') {
                // Animate infinity symbol with a pulse
                stat.style.animation = 'pulseStat 2s ease-in-out infinite';
                return;
            }
            
            const target = parseInt(finalValue);
            const duration = 2000;
            const startTime = performance.now();
            
            function easeOutQuart(t) {
                return 1 - Math.pow(1 - t, 4);
            }
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                
                const current = Math.floor(easedProgress * target);
                stat.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = finalValue;
                }
            }
            
            setTimeout(() => {
                requestAnimationFrame(updateCounter);
            }, index * 200);
        });
    }
    
    // ===================================
    // CARD HOVER EFFECTS WITH GLOW + 3D TILT
    // ===================================
    const hoverCards = document.querySelectorAll('.about-card, .habit-card, .timeline-content');
    
    hoverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 32px rgba(244, 196, 48, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = '';
        });
        
        // 3D Tilt Effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            this.style.transition = 'box-shadow 0.3s ease';
        });
    });
    
    // ===================================
    // BUTTON RIPPLE EFFECT + MAGNETIC ATTRACTION
    // ===================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Magnetic effect
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ===================================
    // DYNAMIC BACKGROUND GRADIENT ON MOUSE MOVE
    // ===================================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateGradient() {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        const percentX = (targetX / window.innerWidth) * 100;
        const percentY = (targetY / window.innerHeight) * 100;
        
        sun.style.left = `calc(50% + ${(percentX - 50) * 0.2}px)`;
        sun.style.top = `calc(20% + ${(percentY - 50) * 0.2}px)`;
        
        requestAnimationFrame(updateGradient);
    }
    
    updateGradient();
    
    // ===================================
    // WEEK BADGE PULSE ON HOVER
    // ===================================
    const weekBadges = document.querySelectorAll('.week-badge');
    
    weekBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.animation = 'pulseBadge 0.5s ease';
        });
        
        badge.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // ===================================
    // DONATION BUTTON SPECIAL EFFECT
    // ===================================
    const donateButtons = document.querySelectorAll('.btn-donate, .btn-nav-donate');
    
    donateButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add a special glow effect
            this.style.boxShadow = '0 0 60px rgba(244, 196, 48, 0.8)';
            
            // Create expanding circle effect
            const circle = document.createElement('div');
            const rect = this.getBoundingClientRect();
            circle.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                left: ${e.clientX - rect.left}px;
                top: ${e.clientY - rect.top}px;
                transform: translate(-50%, -50%) scale(0);
                animation: expandCircle 0.6s ease-out;
                pointer-events: none;
            `;
            this.appendChild(circle);
            
            setTimeout(() => {
                this.style.boxShadow = '';
                circle.remove();
            }, 600);
        });
        
        // Add hover wave effect
        btn.addEventListener('mouseenter', function(e) {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
                pointer-events: none;
            `;
            this.appendChild(wave);
            
            setTimeout(() => {
                wave.style.width = '300px';
                wave.style.height = '300px';
            }, 10);
            
            setTimeout(() => {
                wave.remove();
            }, 650);
        });
    });
    
    // ===================================
    // TEXT SCRAMBLE EFFECT ON HERO LOAD
    // ===================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let iteration = 0;
        
        const scrambleInterval = setInterval(() => {
            heroTitle.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            iteration += 1/3;
            
            if (iteration >= originalText.length) {
                clearInterval(scrambleInterval);
                heroTitle.textContent = originalText;
            }
        }, 30);
    }
    
    // ===================================
    // TEXT REVEAL ANIMATION FOR SECTION HEADERS
    // ===================================
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    
    const headerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target;
                const textContent = text.textContent;
                text.textContent = '';
                text.style.opacity = '1';
                
                textContent.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.opacity = '0';
                    span.style.display = 'inline-block';
                    span.style.animation = `fadeInChar 0.5s ease forwards ${index * 0.03}s`;
                    text.appendChild(span);
                });
                
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        headerObserver.observe(header);
    });
    
    // ===================================
    // ICON ROTATION ON SCROLL
    // ===================================
    const icons = document.querySelectorAll('.card-icon, .habit-icon, .impact-stat-icon');
    
    window.addEventListener('scroll', function() {
        icons.forEach(icon => {
            const rect = icon.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
            
            if (scrollPercent > 0 && scrollPercent < 1) {
                const rotation = scrollPercent * 360;
                icon.style.transform = `rotate(${rotation}deg)`;
            }
        });
    });
    
    // ===================================
    // CURSOR GLOW TRAIL EFFECT
    // ===================================
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(244, 196, 48, 0.15) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);
    
    let cursorX = 0;
    let cursorY = 0;
    let glowX = 0;
    let glowY = 0;
    
    document.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
        cursorGlow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
        cursorGlow.style.opacity = '0';
    });
    
    function animateCursorGlow() {
        glowX += (cursorX - glowX) * 0.1;
        glowY += (cursorY - glowY) * 0.1;
        
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        
        requestAnimationFrame(animateCursorGlow);
    }
    
    animateCursorGlow();
    
    // ===================================
    // SCROLL PROGRESS INDICATOR
    // ===================================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #f4c430, #ffd966);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(244, 196, 48, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
        
        // Add glow intensity based on scroll
        const glowIntensity = Math.min(scrollPercent / 100, 1);
        progressBar.style.boxShadow = `0 0 ${10 + glowIntensity * 20}px rgba(244, 196, 48, ${0.3 + glowIntensity * 0.4})`;
    });
    
    // ===================================
    // LAZY LOADING EFFECT FOR IMAGES (if added later)
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ===================================
    // CONSOLE EASTER EGG
    // ===================================
    console.log('%c☀️ Hello Sunshine', 'font-size: 24px; color: #f4c430; font-weight: bold;');
    console.log('%cFighting isolation, one connection at a time.', 'font-size: 14px; color: #b8b8c8;');
    console.log('%cInterested in the code? Check out our GitHub!', 'font-size: 12px; color: #808090;');
    
    // ===================================
    // MOBILE MENU TOGGLE (for future mobile nav)
    // ===================================
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.display = 'none';
    
    // Add to navbar for mobile devices
    if (window.innerWidth <= 768) {
        // Mobile menu functionality can be expanded here
    }
});

// ===================================
// CSS ANIMATIONS (Added dynamically)
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes pulseStat {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
    }
    
    @keyframes pulseBadge {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes fadeInChar {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes expandCircle {
        to {
            transform: translate(-50%, -50%) scale(30);
            opacity: 0;
        }
    }
    
    .timeline-item.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
