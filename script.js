// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initScrollEffects();
    initContactForm();
    initPaymentForm();
    initAnimations();
});

// Navigation Functions
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking on a link
        navMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                navMenu.classList.remove('active');
                
                // Reset hamburger animation
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .value-card, .expertise-card, .service-detail-card, .feature-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Contact Form Functions
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                // Simulate form submission
                submitContactForm();
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
}

function validateContactForm() {
    let isValid = true;
    const form = document.getElementById('contact-form');
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        showError('name-error', 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError('name-error', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('email-error', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    const phone = document.getElementById('phone');
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    if (!phone.value.trim()) {
        showError('phone-error', 'Phone number is required');
        isValid = false;
    } else if (!phoneRegex.test(phone.value)) {
        showError('phone-error', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        showError('message-error', 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('message-error', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + '-error');
    
    if (!errorElement) return;
    
    switch (fieldName) {
        case 'name':
            if (!field.value.trim()) {
                showError(fieldName + '-error', 'Name is required');
            } else if (field.value.trim().length < 2) {
                showError(fieldName + '-error', 'Name must be at least 2 characters');
            } else {
                clearError(fieldName + '-error');
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!field.value.trim()) {
                showError(fieldName + '-error', 'Email is required');
            } else if (!emailRegex.test(field.value)) {
                showError(fieldName + '-error', 'Please enter a valid email address');
            } else {
                clearError(fieldName + '-error');
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
            if (!field.value.trim()) {
                showError(fieldName + '-error', 'Phone number is required');
            } else if (!phoneRegex.test(field.value)) {
                showError(fieldName + '-error', 'Please enter a valid phone number');
            } else {
                clearError(fieldName + '-error');
            }
            break;
            
        case 'message':
            if (!field.value.trim()) {
                showError(fieldName + '-error', 'Message is required');
            } else if (field.value.trim().length < 10) {
                showError(fieldName + '-error', 'Message must be at least 10 characters');
            } else {
                clearError(fieldName + '-error');
            }
            break;
    }
}

function submitContactForm() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('form-success');
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Reset button
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// Payment Form Functions
function initPaymentForm() {
    const paymentForm = document.getElementById('payment-form');
    const serviceSelect = document.getElementById('service-type');
    const amountInput = document.getElementById('amount');
    
    if (paymentForm) {
        // Service pricing mapping
        const servicePricing = {
            'tax-consultation': 2000,
            'financial-planning': 5000,
            'business-advisory': 10000,
            'compliance-services': 15000,
            'accounting': 8000,
            'legal-services': 12000,
            'custom': 0
        };
        
        // Update amount when service is selected
        if (serviceSelect && amountInput) {
            serviceSelect.addEventListener('change', function() {
                const selectedService = this.value;
                if (selectedService && selectedService !== 'custom') {
                    amountInput.value = servicePricing[selectedService];
                    updatePaymentSummary();
                } else if (selectedService === 'custom') {
                    amountInput.value = '';
                    amountInput.focus();
                }
            });
            
            // Update summary when amount changes
            amountInput.addEventListener('input', updatePaymentSummary);
        }
        
        // Handle form submission
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validatePaymentForm()) {
                initializeRazorpay();
            }
        });
    }
}

function updatePaymentSummary() {
    const amountInput = document.getElementById('amount');
    const serviceAmountElement = document.getElementById('service-amount');
    const gstAmountElement = document.getElementById('gst-amount');
    const totalAmountElement = document.getElementById('total-amount');
    
    if (!amountInput || !serviceAmountElement || !gstAmountElement || !totalAmountElement) return;
    
    const serviceAmount = parseFloat(amountInput.value) || 0;
    const gstAmount = serviceAmount * 0.18; // 18% GST
    const totalAmount = serviceAmount + gstAmount;
    
    serviceAmountElement.textContent = `₹${serviceAmount.toLocaleString('en-IN')}`;
    gstAmountElement.textContent = `₹${gstAmount.toLocaleString('en-IN')}`;
    totalAmountElement.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;
}

function validatePaymentForm() {
    const form = document.getElementById('payment-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    });
    
    // Validate amount
    const amount = document.getElementById('amount');
    if (amount && (parseFloat(amount.value) <= 0 || isNaN(parseFloat(amount.value)))) {
        amount.style.borderColor = '#e74c3c';
        alert('Please enter a valid amount');
        isValid = false;
    }
    
    return isValid;
}

function initializeRazorpay() {
    const form = document.getElementById('payment-form');
    const formData = new FormData(form);
    
    const amount = parseFloat(formData.get('amount'));
    const gstAmount = amount * 0.18;
    const totalAmount = (amount + gstAmount) * 100; // Convert to paise
    
    const options = {
        "key": "rzp_test_demo", // Replace with your Razorpay key ID
        "amount": totalAmount,
        "currency": "INR",
        "name": "Fingard Partners",
        "description": `Payment for ${formData.get('service-type') || 'Services'}`,
        "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzAwMjE0NyIvPgo8dGV4dCB4PSIyMCIgeT0iMjciIGZvbnQtZmFtaWx5PSJQb3BwaW5zLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjE2IiBmaWxsPSIjQzE5QTZCIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GUDwvdGV4dD4KPC9zdmc+",
        "order_id": "", // This should be generated from your backend
        "handler": function (response) {
            handlePaymentSuccess(response);
        },
        "prefill": {
            "name": formData.get('client-name'),
            "email": formData.get('client-email'),
            "contact": formData.get('client-phone')
        },
        "notes": {
            "service_type": formData.get('service-type'),
            "description": formData.get('description')
        },
        "theme": {
            "color": "#002147"
        },
        "modal": {
            "ondismiss": function() {
                console.log('Payment modal closed');
            }
        }
    };
    
    const rzp = new Razorpay(options);
    
    rzp.on('payment.failed', function (response) {
        handlePaymentFailure(response);
    });
    
    rzp.open();
}

function handlePaymentSuccess(response) {
    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
    
    // Here you would typically send the payment details to your server
    console.log('Payment successful:', response);
    
    // Reset form
    document.getElementById('payment-form').reset();
    updatePaymentSummary();
    
    // Redirect or show success page
    // window.location.href = 'payment-success.html';
}

function handlePaymentFailure(response) {
    alert(`Payment failed: ${response.error.description}`);
    console.log('Payment failed:', response);
}

// Animation Functions
function initAnimations() {
    // Add animation classes to elements as they become visible
    const animatedElements = document.querySelectorAll('.service-card, .value-card, .feature-item');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Utility Functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Initialize page-specific functionality
function initPageSpecific() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'contact.html':
            // Contact page specific initialization
            break;
        case 'payment.html':
            // Payment page specific initialization
            updatePaymentSummary();
            break;
        case 'services.html':
            // Services page specific initialization
            break;
        default:
            // Home page or other pages
            break;
    }
}

// Call page-specific initialization
document.addEventListener('DOMContentLoaded', initPageSpecific);

// Handle window resize for responsive features
window.addEventListener('resize', function() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) {
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    }
});

// Performance optimization - Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
document.addEventListener('DOMContentLoaded', initLazyLoading);
