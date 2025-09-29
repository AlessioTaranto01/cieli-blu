// Modern Memorial Website JavaScript with Advanced Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeInteractions();
    initializePerformanceOptimizations();
    initializeAccessibility();
    
    console.log('🌟 Memorial website loaded with modern enhancements');
});

// Navigation System
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile Navigation Toggle with enhanced animations
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isActive = hamburger.classList.contains('active');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add body scroll lock when menu is open
            document.body.style.overflow = isActive ? 'auto' : 'hidden';
            
            // Animate menu items
            if (!isActive) {
                animateMenuItems();
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach((link, index) => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Enhanced smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add visual feedback
                target.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    target.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });

    // Advanced navbar scroll effects
    let lastScrollTop = 0;
    let scrollDirection = 'up';

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Determine scroll direction
        scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        
        // Add/remove scrolled class
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction (optional)
        if (scrollTop > 300) {
            if (scrollDirection === 'down' && !navMenu.classList.contains('active')) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }

    // Debounced scroll event
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
}

// Advanced Animation System
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Add special effects for different elements
                    if (entry.target.classList.contains('video-card')) {
                        animateVideoCard(entry.target);
                    } else if (entry.target.classList.contains('memory-category')) {
                        animateMemoryCard(entry.target);
                    } else if (entry.target.classList.contains('result-card')) {
                        animateResultCard(entry.target);
                    }
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.video-card, .memory-category, .result-card, .swimming-section, .testimonial, .donation-info').forEach(el => {
        el.classList.add('fade-in');
        animationObserver.observe(el);
    });

    // Hero section entrance animation with proper visibility
    setTimeout(() => {
        const badge = document.querySelector('.hero-badge');
        if (badge) {
            badge.classList.add('slide-in-left');
            badge.classList.add('visible');
        }
        setTimeout(() => {
            const title = document.querySelector('.hero-title');
            if (title) {
                title.classList.add('fade-in');
                title.classList.add('visible');
            }
            setTimeout(() => {
                const subtitle = document.querySelector('.hero-subtitle');
                if (subtitle) {
                    subtitle.classList.add('fade-in');
                    subtitle.classList.add('visible');
                }
                setTimeout(() => {
                    const buttons = document.querySelector('.hero-buttons');
                    if (buttons) {
                        buttons.classList.add('slide-in-left');
                        buttons.classList.add('visible');
                    }
                    setTimeout(() => {
                        const stats = document.querySelector('.hero-stats');
                        if (stats) {
                            stats.classList.add('fade-in');
                            stats.classList.add('visible');
                        }
                    }, 300);
                }, 300);
            }, 300);
        }, 300);
    }, 800);

    // Floating elements animation
    createFloatingElements();
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Interactive Elements
function initializeInteractions() {
    // Enhanced IBAN copy functionality
    const ibanBox = document.querySelector('.iban-box');
    if (ibanBox) {
        // Add hover effect
        ibanBox.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        ibanBox.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        ibanBox.addEventListener('click', function() {
            const iban = this.textContent.trim();
            
            // Visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(iban).then(() => {
                    showAdvancedNotification('✅ IBAN copiato negli appunti!', 'success');
                }).catch(err => {
                    console.error('Errore nella copia:', err);
                    fallbackCopyTextToClipboard(iban);
                });
            } else {
                fallbackCopyTextToClipboard(iban);
            }
        });
    }

    // Interactive buttons with ripple effect
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        // Magnetic effect on hover
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Image hover effects
    document.querySelectorAll('.hero-img, .swimming-img, .course-img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) contrast(1)';
        });
    });

    // Card tilt effect
    document.querySelectorAll('.video-card, .memory-category, .result-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Lazy loading for images with blur effect
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.dataset.src || img.src;
                
                // Create a new image to preload
                const newImg = new Image();
                newImg.onload = () => {
                    img.src = src;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                };
                newImg.src = src;
                
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });

    // Video loading optimization with intersection observer
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && !iframe.src && iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                    
                    // Add loading animation
                    const wrapper = entry.target;
                    wrapper.classList.add('video-loading');
                    
                    iframe.onload = () => {
                        wrapper.classList.remove('video-loading');
                        wrapper.classList.add('video-loaded');
                    };
                }
            }
        });
    });

    document.querySelectorAll('.video-wrapper').forEach(wrapper => {
        videoObserver.observe(wrapper);
    });

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(function() {
            // Recalculate animations and layouts
            updateAnimations();
        }, 250);
    });
}

// Accessibility Enhancements
function initializeAccessibility() {
    // Keyboard navigation for interactive elements
    document.querySelectorAll('.iban-box, .btn, .video-card, .memory-category').forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add focus indicators
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0.01ms');
        document.documentElement.style.setProperty('--transition-normal', '0.01ms');
        document.documentElement.style.setProperty('--transition-slow', '0.01ms');
    }

    // High contrast mode detection
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
}

// Helper Functions
function animateMenuItems() {
    const menuItems = document.querySelectorAll('.nav-menu .nav-link');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function animateVideoCard(card) {
    card.style.transform = 'scale(1.05)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 300);
}

function animateMemoryCard(card) {
    const icon = card.querySelector('i');
    if (icon) {
        icon.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            icon.style.transform = 'rotate(0deg) scale(1)';
        }, 500);
    }
}

function animateResultCard(card) {
    const icon = card.querySelector('i');
    if (icon) {
        icon.style.animation = 'bounce 0.6s ease';
    }
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
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
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Add CSS for ripple animation if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% {
                    transform: translate3d(0,0,0);
                }
                40%, 43% {
                    transform: translate3d(0,-30px,0);
                }
                70% {
                    transform: translate3d(0,-15px,0);
                }
                90% {
                    transform: translate3d(0,-4px,0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function showAdvancedNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 2em;
        height: 2em;
        padding: 0;
        border: none;
        outline: none;
        box-shadow: none;
        background: transparent;
    `;
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showAdvancedNotification('✅ IBAN copiato negli appunti!', 'success');
        } else {
            showAdvancedNotification('⚠️ Impossibile copiare automaticamente', 'warning');
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showAdvancedNotification('❌ Errore nella copia', 'error');
    }
    
    document.body.removeChild(textArea);
}

function updateAnimations() {
    // Recalculate any position-dependent animations
    const elements = document.querySelectorAll('.fade-in.visible');
    elements.forEach(el => {
        // Trigger reflow for smooth transitions
        el.style.transform = 'translateY(0)';
    });
}

// Error handling for missing images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
        
        // Show placeholder or alternative content
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 100%;
            height: 200px;
            background: linear-gradient(45deg, #f3f4f6, #e5e7eb);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-style: italic;
            border-radius: 8px;
        `;
        placeholder.textContent = 'Immagine non disponibile';
        
        if (e.target.parentNode) {
            e.target.parentNode.insertBefore(placeholder, e.target);
        }
    }
}, true);