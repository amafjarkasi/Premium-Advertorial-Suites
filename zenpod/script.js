// ZenPod - Interactive Script

document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.querySelector('.main-header');
  const topBar = document.querySelector('.top-bar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
      if (topBar) topBar.style.transform = 'translateY(-100%)';
    } else {
      header.classList.remove('scrolled');
      if (topBar) topBar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });
  
  // Sticky CTA visibility
  const stickyCta = document.querySelector('.sticky-cta');
  const heroSection = document.querySelector('.hero');
  const pricingSection = document.querySelector('#pricing');
  
  if (stickyCta && heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          stickyCta.classList.add('visible');
        } else {
          stickyCta.classList.remove('visible');
        }
      });
    }, { threshold: 0 });
    
    observer.observe(heroSection);
  }
  
  // Smooth scroll for anchor links
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
  
  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 0.85) {
        el.classList.add('animate-fade-in-up');
        el.style.opacity = '1';
      }
    });
  };
  
  // Set initial opacity for animated elements
  document.querySelectorAll('[data-animate]').forEach(el => {
    el.style.opacity = '0';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
  
  // Counter animation for stats
  const animateCounter = (el, target, duration = 2000) => {
    const start = 0;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);
      
      el.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target.toLocaleString();
      }
    };
    
    requestAnimationFrame(updateCounter);
  };
  
  // Observe stats for counter animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        if (target && !el.dataset.animated) {
          el.dataset.animated = 'true';
          animateCounter(el, target);
        }
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('[data-count]').forEach(el => {
    statsObserver.observe(el);
  });
  
  // Live viewers simulation
  const liveViewers = document.getElementById('live-viewers');
  if (liveViewers) {
    let baseViewers = 847;
    
    setInterval(() => {
      const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
      baseViewers = Math.max(800, Math.min(950, baseViewers + change));
      liveViewers.textContent = baseViewers.toLocaleString();
    }, 3000);
  }
  
  // Stock countdown simulation
  const stockCount = document.getElementById('stock-count');
  if (stockCount) {
    let stock = 23;
    
    setInterval(() => {
      if (Math.random() > 0.7 && stock > 5) {
        stock--;
        stockCount.textContent = stock;
      }
    }, 8000);
  }
  
  // Countdown timer
  const timerElement = document.getElementById('countdown-timer');
  if (timerElement) {
    let hours = 2;
    let minutes = 59;
    let seconds = 59;
    
    const updateTimer = () => {
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      }
      
      timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    
    setInterval(updateTimer, 1000);
  }
  
  // Button click effects
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Add ripple animation style
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Parallax effect for hero product
  const heroProduct = document.querySelector('.hero-product');
  if (heroProduct) {
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 20;
      const yPercent = (clientY / innerHeight - 0.5) * 20;
      
      heroProduct.style.transform = `translate(${xPercent}px, ${yPercent}px)`;
    });
  }
  
  // Form validation for email capture (if present)
  const emailForm = document.querySelector('.email-form');
  if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      if (email && email.includes('@')) {
        // Show success message
        this.innerHTML = '<p style="color: var(--success); font-weight: 600;">Thank you! We\'ll be in touch soon.</p>';
      }
    });
  }
  
  // Toast notification system
  window.showToast = function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      <span class="toast-message">${message}</span>
    `;
    
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      padding: 16px 24px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 9999;
      animation: slideInRight 0.3s ease-out;
      box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };
  
  // Add toast animations
  const toastStyle = document.createElement('style');
  toastStyle.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(toastStyle);
  
  // Pricing card click handler
  document.querySelectorAll('.pricing-cta').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.pricing-card');
      const planName = card.querySelector('.pricing-name').textContent;
      window.showToast(`${planName} plan selected! Redirecting to checkout...`, 'success');
    });
  });
  
  console.log('ZenPod script loaded successfully');
});
