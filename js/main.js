// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const cartCount = document.querySelectorAll('.cart-count');
const scrollTopBtn = document.querySelector('.scroll-top');
const preloader = document.querySelector('.preloader');
const darkModeToggle = document.createElement('div');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';

// Add dark mode toggle to header
const header = document.querySelector('.header .container');
header.appendChild(darkModeToggle);

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Update cart count from localStorage
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.forEach(count => {
        count.textContent = totalItems;
    });
}

// Initialize cart count
updateCartCount();

// Scroll to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Hero Slider
if (document.querySelector('.hero-slider')) {
    const slides = document.querySelectorAll('.slide');
    const sliderBtns = document.querySelectorAll('.slider-btn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        sliderBtns.forEach(btn => btn.classList.remove('active'));
        
        slides[index].classList.add('active');
        sliderBtns[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto slide change every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Manual slide navigation
    sliderBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });

    // Initialize first slide
    showSlide(0);
}

// Testimonial Slider
if (document.querySelector('.testimonial-carousel')) {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialSlides[index].classList.add('active');
        currentTestimonial = index;
    }

    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    });

    // Initialize first testimonial
    showTestimonial(0);
}

// Product Image Gallery
if (document.querySelector('.thumbnail-container')) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            // Change main image
            mainImage.src = thumbnail.querySelector('img').src;
        });
    });
}

// Product Tabs
if (document.querySelector('.product-tabs')) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// FAQ Accordion
if (document.querySelector('.faq-container')) {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            question.classList.toggle('active');
        });
    });
}

// Quantity Selectors
document.querySelectorAll('.quantity-selector').forEach(selector => {
    const minusBtn = selector.querySelector('.minus');
    const plusBtn = selector.querySelector('.plus');
    const input = selector.querySelector('.quantity-input');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(input.value);
        if (value > 1) {
            input.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(input.value);
        input.value = value + 1;
    });
});

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.querySelector('.toast');
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// Contact Form Submission
if (document.getElementById('contactForm')) {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(() => {
            contactForm.reset();
            showToast('Your message has been sent successfully!', 'success');
        }, 1000);
    });
}

// Newsletter Form Submission
if (document.querySelector('.newsletter-form')) {
    const newsletterForm = document.querySelector('.newsletter-form');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(() => {
            newsletterForm.reset();
            showToast('Thank you for subscribing!', 'success');
        }, 1000);
    });
}