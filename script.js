document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const stickyCta = document.querySelector('.sticky-cta');
    const faqItems = document.querySelectorAll('.faq-item');
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    // Variables
    let currentTestimonial = 0;
    const cardWidth = 100; // 100%
    
    // Initialize testimonial carousel
    function setupCarousel() {
        // Set initial position
        updateCarousel();
        
        // Set card widths
        testimonialCards.forEach(card => {
            card.style.minWidth = `${cardWidth}%`;
        });
    }
    
    // Update carousel position
    function updateCarousel() {
        testimonialTrack.style.transform = `translateX(-${currentTestimonial * cardWidth}%)`;
        
        // Update dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        testimonialDots[currentTestimonial].classList.add('active');
    }
    
    // Mobile Menu Toggle with animation
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Animate menu bars
            const bars = this.querySelectorAll('.bar');
            if (this.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Reset menu bars
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // Navbar scroll effect with enhanced animation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show/hide sticky CTA with animation
        if (window.scrollY > 500) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
        
        // Animate elements on scroll
        animateOnScroll();
    });
    
    // Enhanced FAQ Accordion with animations
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items with animation
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                
                // Scroll to the opened FAQ if it's not fully visible
                const itemRect = item.getBoundingClientRect();
                if (itemRect.bottom > window.innerHeight) {
                    window.scrollBy({
                        top: itemRect.bottom - window.innerHeight + 50,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Next testimonial
    nextButton.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        updateCarousel();
    });
    
    // Previous testimonial
    prevButton.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        updateCarousel();
    });
    
    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateCarousel();
        });
    });
    
    // Auto rotate testimonials
    const testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        updateCarousel();
    }, 5000);
    
    // Pause auto rotation on hover
    const testimonialCarousel = document.querySelector('.testimonials-carousel');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
    }
    
    // Enhanced animation on scroll with staggered effect
    function animateOnScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                // Add delay if specified
                const delay = element.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                        element.classList.add('active');
                    }, parseInt(delay));
                } else {
                    element.classList.add('active');
                }
            }
        });
    }
    
    // Initialize animations
    animateOnScroll();
    
    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add highlight effect to the target section
                targetElement.classList.add('highlight-section');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Remove highlight effect after scrolling
                setTimeout(() => {
                    targetElement.classList.remove('highlight-section');
                }, 1500);
            }
        });
    });
    
    // Enhanced count animation for stats with easing
    const stats = document.querySelectorAll('.count');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/,/g, '').replace(/\+/g, ''));
        const duration = 2500; // 2.5 seconds
        
        const animateCount = () => {
            let startTime = null;
            
            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                
                // Use easeOutExpo for smoother animation
                const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const current = Math.floor(easeOutExpo * target);
                
                if (stat.textContent.includes('+')) {
                    stat.textContent = current.toLocaleString() + '+';
                } else {
                    stat.textContent = current.toLocaleString();
                }
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            
            window.requestAnimationFrame(step);
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 600) {
                hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
            }
        });
    }
    
    // Add image loading animation
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading placeholder
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', function() {
            // Fade in image when loaded
            this.style.opacity = '1';
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Animate the limited offer bubble
    const limitedOffer = document.querySelector('.limited-offer');
    if (limitedOffer) {
        setInterval(() => {
            limitedOffer.classList.add('pulse');
            setTimeout(() => {
                limitedOffer.classList.remove('pulse');
            }, 1000);
        }, 3000);
    }
    
    // Initialize the carousel
    setupCarousel();
});