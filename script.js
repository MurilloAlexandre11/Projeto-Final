document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('toggle-theme');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    
    // Theme toggle event
    themeToggle.addEventListener('change', function() {
        const theme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Timeline item animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineItems() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.75) {
                item.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkTimelineItems();
    
    // Check on scroll
    window.addEventListener('scroll', checkTimelineItems);
    
    // Skills chart
    const ctx = document.getElementById('skillsTimelineChart').getContext('2d');
    const skillsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Fevereiro', 'Março', 'Abril', 'Maio'],
            datasets: [
                {
                    label: 'Design (Figma, UI/UX)',
                    data: [10, 65, 70, 75],
                    borderColor: '#ff0000',
                    backgroundColor: 'rgba(218, 42, 42, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'HTML/CSS',
                    data: [5, 15, 85, 90],
                    borderColor: '#380505',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Layout (Flexbox, Grid)',
                    data: [0, 10, 75, 85],
                    borderColor: '#962828',
                    backgroundColor: 'rgba(239, 72, 72, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Versionamento',
                    data: [0, 5, 30, 65],
                    borderColor: '#630000',
                    backgroundColor: 'rgba(209, 17, 17, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            animation: {
                duration: 2000
            }
        }
    });
    
    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(30, 29, 34, 0.9)';
            navbar.style.boxShadow = '0 2px 10px rgb(32, 31, 36)';
        } else {
            navbar.style.background = 'var(--light-color)';
            navbar.style.boxShadow = 'var(--shadow)';
        }
    });
});