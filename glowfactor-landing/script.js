/**
 * GlowFactor Advertorial - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimations();
    initSmoothScrolling();
    initDateUpdate();
    initLiveViewerCount();
    initOrderNotifications();
    initStockCountdown();
    initStickyCTA();
    initCountdownTimer();
});

/**
 * Scroll-based fade-in animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const targetSections = document.querySelectorAll(
        '.story-section, .science-section, .who-section, .how-to-section, ' +
        '.highlight-box, .ingredient-card, .price-card, .faq-item, .guarantee-section'
    );

    targetSections.forEach(section => {
        section.classList.add('animate-in');
        observer.observe(section);
    });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.main-header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Update the "Last Updated" date to today
 */
function initDateUpdate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        dateElement.textContent = 'Updated: ' + now.toLocaleDateString('en-US', options);
    }
}

/**
 * Simulate live viewer count that fluctuates
 */
function initLiveViewerCount() {
    const viewerElement = document.getElementById('live-viewers');
    if (!viewerElement) return;

    let baseCount = 1247;

    setInterval(() => {
        const change = Math.floor(Math.random() * 30) - 15; // Random -15 to +15
        baseCount = Math.max(1100, Math.min(1400, baseCount + change));
        viewerElement.textContent = baseCount.toLocaleString();
    }, 5000);
}

/**
 * Live order notification toast that pops up periodically
 */
function initOrderNotifications() {
    const notification = document.getElementById('order-notification');
    if (!notification) return;

    const names = [
        { name: 'Sarah', city: 'Austin, TX', package: '6-bottle' },
        { name: 'Jennifer', city: 'Denver, CO', package: '3-bottle' },
        { name: 'Maria', city: 'San Diego, CA', package: '6-bottle' },
        { name: 'Linda', city: 'Miami, FL', package: '1-bottle' },
        { name: 'Karen', city: 'Seattle, WA', package: '3-bottle' },
        { name: 'Patricia', city: 'Chicago, IL', package: '6-bottle' },
        { name: 'Elizabeth', city: 'Phoenix, AZ', package: '3-bottle' },
        { name: 'Barbara', city: 'Nashville, TN', package: '6-bottle' },
        { name: 'Susan', city: 'Portland, OR', package: '1-bottle' },
        { name: 'Margaret', city: 'Boston, MA', package: '3-bottle' },
        { name: 'Dorothy', city: 'Atlanta, GA', package: '6-bottle' },
        { name: 'Lisa', city: 'Dallas, TX', package: '3-bottle' }
    ];

    const notifName = document.getElementById('notif-name');

    function showNotification() {
        const person = names[Math.floor(Math.random() * names.length)];
        notifName.innerHTML = `${person.name} from ${person.city}<br><span style="font-weight: normal;">just ordered the ${person.package} package!</span>`;

        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // First notification after 15 seconds
    setTimeout(showNotification, 15000);

    // Then every 25-45 seconds
    setInterval(() => {
        const delay = Math.random() * 20000 + 25000;
        setTimeout(showNotification, delay);
    }, 45000);
}

/**
 * Slowly decrease stock count to create urgency
 */
function initStockCountdown() {
    const stockElement = document.getElementById('stock-count');
    if (!stockElement) return;

    let stock = 14;

    setInterval(() => {
        if (stock > 3) {
            const shouldDecrease = Math.random() > 0.7;
            if (shouldDecrease) {
                stock--;
                stockElement.textContent = stock;
            }
        }
    }, 30000); // Check every 30 seconds
}

/**
 * Pricing Card Hover Enhancement
 */
const pricingCards = document.querySelectorAll('.price-card');
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('featured')) {
            card.style.borderColor = 'var(--primary)';
        }
    });

    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.borderColor = 'var(--accent)';
        }
    });
});

/**
 * Sticky CTA Bar - appears after scrolling past hero
 */
function initStickyCTA() {
    const stickyCTA = document.getElementById('sticky-cta');
    if (!stickyCTA) return;

    const triggerPoint = 600; // Show after scrolling 600px

    window.addEventListener('scroll', () => {
        if (window.scrollY > triggerPoint) {
            stickyCTA.classList.add('visible');
        } else {
            stickyCTA.classList.remove('visible');
        }
    });

    // Hide sticky bar when near the pricing section
    const pricingSection = document.getElementById('order');
    if (pricingSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyCTA.style.opacity = '0';
                    stickyCTA.style.pointerEvents = 'none';
                } else {
                    stickyCTA.style.opacity = '1';
                    stickyCTA.style.pointerEvents = 'auto';
                }
            });
        }, { threshold: 0.3 });
        observer.observe(pricingSection);
    }
}

/**
 * Countdown Timer - 4 hour urgency timer
 */
function initCountdownTimer() {
    const timerElement = document.getElementById('sticky-timer');
    if (!timerElement) return;

    // Check if we have a stored end time, otherwise create one
    let endTime = localStorage.getItem('glowfactor_timer_end');

    if (!endTime || parseInt(endTime) < Date.now()) {
        // Set timer for 4 hours from now
        endTime = Date.now() + (4 * 60 * 60 * 1000);
        localStorage.setItem('glowfactor_timer_end', endTime.toString());
    } else {
        endTime = parseInt(endTime);
    }

    function updateTimer() {
        const now = Date.now();
        const remaining = endTime - now;

        if (remaining <= 0) {
            timerElement.textContent = '00:00:00';
            // Reset timer for next 4 hours
            endTime = Date.now() + (4 * 60 * 60 * 1000);
            localStorage.setItem('glowfactor_timer_end', endTime.toString());
            return;
        }

        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        timerElement.textContent =
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}