/* 
   South Himalaya Energy Consultants
   Interactive Script (Slider, Mobile Menu, Form Handlers)
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Highlight Active Nav Page
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.endsWith(href)) {
            item.classList.add('active');
        } else if (href === 'index.html' && (currentPath.endsWith('/') || currentPath === '')) {
            item.classList.add('active');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            mobileToggle.innerHTML = isActive ? '&#x2715;' : '&#x2630;'; // X or Hamburger
        });

        // Close menu when nav items are clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '&#x2630;';
            });
        });
    }

    // 3. Homepage Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (n) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Handle loop bounds
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
        };

        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };

        const prevSlide = () => {
            showSlide(currentSlide - 1);
        };

        // Start Auto Play
        const startSlider = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const stopSlider = () => {
            clearInterval(slideInterval);
        };

        // Set up event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopSlider();
                nextSlide();
                startSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopSlider();
                prevSlide();
                startSlider();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlider();
                showSlide(index);
                startSlider();
            });
        });

        // Initialize slider
        showSlide(0);
        startSlider();
    }

    // 4. Portfolio Likes Toggle
    const likeButtons = document.querySelectorAll('.portfolio-likes');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('liked');
            const countSpan = this.querySelector('.like-count');
            let currentLikes = parseInt(countSpan.textContent, 10);
            
            if (this.classList.contains('liked')) {
                currentLikes += 1;
                this.querySelector('svg').style.transform = 'scale(1.3)';
                setTimeout(() => {
                    this.querySelector('svg').style.transform = 'scale(1)';
                }, 200);
            } else {
                currentLikes -= 1;
            }
            
            countSpan.textContent = currentLikes;
        });
    });

    // 5. Contact Form Submission Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !phone || !subject || !message) {
                alert('Please fill out all the fields in the form.');
                return;
            }
            
            // Simple Email Regex check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Beautiful success message
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show a nice success card or alert
                alert(`Thank you, ${name}! Your message has been sent successfully. We will get back to you soon.`);
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});
