// Cielo Blu - Passion Carousel JavaScript

class PassionCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 4;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 6000; // 6 seconds
        this.isPlaying = true;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startAutoPlay();
        this.addCloudEffects();
    }
    
    bindEvents() {
        // Navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause on hover
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carouselWrapper.addEventListener('mouseleave', () => this.resumeAutoPlay());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Touch/swipe support
        this.addTouchSupport();
    }
    
    addTouchSupport() {
        const carouselTrack = document.getElementById('carouselTrack');
        if (!carouselTrack) return;
        
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoPlay();
        });
        
        carouselTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        carouselTrack.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isDragging = false;
            this.resumeAutoPlay();
        });
    }
    
    goToSlide(slideIndex) {
        if (this.isTransitioning || slideIndex === this.currentSlide) return;
        
        this.isTransitioning = true;
        this.currentSlide = slideIndex;
        
        // Update carousel track position
        const carouselTrack = document.getElementById('carouselTrack');
        if (carouselTrack) {
            carouselTrack.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        }
        
        // Update active slide
        this.updateActiveSlide();
        
        // Update indicators
        this.updateIndicators();
        
        // Add cloud animation effect
        this.triggerCloudEffect();
        
        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }
    
    updateActiveSlide() {
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.autoPlayInterval = setInterval(() => {
            if (this.isPlaying && !this.isTransitioning) {
                this.nextSlide();
            }
        }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        this.isPlaying = false;
    }
    
    resumeAutoPlay() {
        this.isPlaying = true;
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        this.isPlaying = false;
    }
    
    triggerCloudEffect() {
        const activeSlide = document.querySelector('.carousel-slide.active .video-card');
        if (!activeSlide) return;
        
        // Add temporary cloud animation class
        activeSlide.classList.add('cloud-transition');
        
        setTimeout(() => {
            activeSlide.classList.remove('cloud-transition');
        }, 1000);
    }
    
    addCloudEffects() {
        // Add floating cloud elements for enhanced visual appeal
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        if (!carouselWrapper) return;
        
        // Create floating cloud elements
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'floating-cloud';
            cloud.style.cssText = `
                position: absolute;
                width: ${60 + Math.random() * 40}px;
                height: ${30 + Math.random() * 20}px;
                background: radial-gradient(ellipse, 
                    rgba(248, 248, 255, 0.3) 0%, 
                    rgba(135, 206, 235, 0.1) 70%, 
                    transparent 100%);
                border-radius: 50px;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: 1;
                animation: cloudFloat ${15 + Math.random() * 10}s infinite linear;
                opacity: 0.6;
            `;
            
            carouselWrapper.appendChild(cloud);
        }
    }
    
    // Method to handle visibility change (pause when tab is not active)
    handleVisibilityChange() {
        if (document.hidden) {
            this.pauseAutoPlay();
        } else {
            this.resumeAutoPlay();
        }
    }
}

// Enhanced cloud floating animation
const style = document.createElement('style');
style.textContent = `
    .cloud-transition {
        animation: cloudTransition 1s ease-out;
    }
    
    @keyframes cloudTransition {
        0% {
            transform: scale(0.95) translateY(10px);
            opacity: 0.8;
        }
        50% {
            transform: scale(1.02) translateY(-5px);
            opacity: 1;
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes cloudFloat {
        0% {
            transform: translateX(-100px) translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateX(calc(100vw + 100px)) translateY(-20px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .floating-cloud {
        filter: blur(1px);
    }
`;
document.head.appendChild(style);

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new PassionCarousel();
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        carousel.handleVisibilityChange();
    });
    
    // Add intersection observer for performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    carousel.resumeAutoPlay();
                } else {
                    carousel.pauseAutoPlay();
                }
            });
        }, { threshold: 0.5 });
        
        const carouselElement = document.querySelector('.passion-carousel-container');
        if (carouselElement) {
            observer.observe(carouselElement);
        }
    }
});

// Export for potential external use
window.PassionCarousel = PassionCarousel;