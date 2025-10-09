
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Add scroll effect to header
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
    });

    // EmailJS Configuration - Replace these with your actual credentials
    const EMAILJS_PUBLIC_KEY = 'w8ibzBXOJUievyzgh'; // Get from https://www.emailjs.com/
    const EMAILJS_SERVICE_ID = 'service_jnxeyp1'; // Create a service (e.g., Gmail, Outlook)
    const EMAILJS_TEMPLATE_ID = 'template_dd4td8d'; // Create an email template

    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');

            // Show loading state
            const submitButton = contactForm.querySelector('.contact-submit');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = 'Sending... <span class="arrow">↗</span>';
            submitButton.disabled = true;

            // Prepare email parameters
            const emailParams = {
                from_name: name,
                from_email: email,
                phone: phone,
                message: message,
                to_email: 'incubatr.ae@gmail.com' // Your email address
            };

            // Send email using EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);

                    // Show success message
                    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');

                    // Reset form
                    contactForm.reset();

                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                })
                .catch(function(error) {
                    console.log('FAILED...', error);

                    // Show error message
                    showNotification('Failed to send message. Please try again or contact us directly.', 'error');

                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                });
        });
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: 10px;
        `;

        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Add to document
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add loading animation to pricing buttons
    document.querySelectorAll('.pricing-button').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                // Here you would typically redirect to a contact form or payment page
                alert('Redirecting to contact form...');
            }, 2000);
        });
    });
});
