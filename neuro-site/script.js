/**
 * NeuroGenix - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', function () {
    initSmoothScrolling();
    initDateUpdate();
    initStockCountdown();
    initOrderNotifications();
    initStickyCTA();
});

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
 * Update the date to today
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
 * Stock countdown for scarcity
 */
function initStockCountdown() {
    const stockElements = document.querySelectorAll('#stock-count, #stock-count-2');
    if (stockElements.length === 0) return;

    let stock = 47;

    setInterval(() => {
        if (stock > 12) {
            const shouldDecrease = Math.random() > 0.7;
            if (shouldDecrease) {
                stock--;
                stockElements.forEach(el => el.textContent = stock);
            }
        }
    }, 25000);
}

/**
 * Order notification toasts
 */
function initOrderNotifications() {
    const notification = document.getElementById('order-notification');
    if (!notification) return;

    const locations = [
        'San Francisco, CA',
        'New York, NY',
        'Austin, TX',
        'Seattle, WA',
        'Boston, MA',
        'Chicago, IL',
        'Denver, CO',
        'Los Angeles, CA',
        'Miami, FL',
        'Portland, OR'
    ];

    const notifName = document.getElementById('notif-name');

    function showNotification() {
        const location = locations[Math.floor(Math.random() * locations.length)];
        notifName.innerHTML = `Someone in ${location}<br><span style="font-weight: normal; color: #8892a0;">just ordered NeuroGenix!</span>`;

        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // First notification after 20 seconds
    setTimeout(showNotification, 20000);

    // Then every 30-50 seconds
    setInterval(() => {
        const delay = Math.random() * 20000 + 30000;
        setTimeout(showNotification, delay);
    }, 50000);
}

/**
 * Sticky CTA bar
 */
function initStickyCTA() {
    const stickyCTA = document.getElementById('sticky-cta');
    if (!stickyCTA) return;

    const triggerPoint = 800;

    window.addEventListener('scroll', () => {
        if (window.scrollY > triggerPoint) {
            stickyCTA.classList.add('visible');
        } else {
            stickyCTA.classList.remove('visible');
        }
    });

    // Hide when near pricing section
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
