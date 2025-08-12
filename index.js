
        // Tab functionality
        document.addEventListener('DOMContentLoaded', function() {
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const targetTab = this.getAttribute('data-tab');

                    // Remove active class from all buttons and contents
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => {
                        content.classList.remove('active');
                        content.style.opacity = '0';
                        content.style.transform = 'translateY(20px)';
                    });

                    // Add active class to clicked button and corresponding content
                    this.classList.add('active');
                    const activeTab = document.getElementById(targetTab);
                    activeTab.classList.add('active');
                    
                    // Trigger reflow to restart animation
                    void activeTab.offsetWidth;
                    
                    activeTab.style.opacity = '1';
                    activeTab.style.transform = 'translateY(0)';
                });
            });
        });

        // Scroll indicator
        window.addEventListener('scroll', function() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / scrollHeight) * 100;
            document.getElementById('scrollIndicator').style.width = scrolled + '%';
            
            // Show/hide scroll to top button
            if (scrollTop > 300) {
                document.getElementById('scrollTop').classList.add('active');
            } else {
                document.getElementById('scrollTop').classList.remove('active');
            }
        });

        // Scroll to top functionality
        document.getElementById('scrollTop').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Smooth scrolling for internal links
        document.addEventListener('DOMContentLoaded', function() {
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.getAttribute('href') !== '#') {
                        e.preventDefault();
                        const target = document.querySelector(this.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        });

        // Intersection Observer for scroll animations
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.edict-item, .cave-card, .gallery-item, .document-card, .bibliography-item, .stat-card, .highlight-box, .quote-block');
            
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.1), transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
                observer.observe(el);
            });
        };

        // Initialize animations when page loads
        document.addEventListener('DOMContentLoaded', function() {
            animateOnScroll();
            
            // Animate hero elements sequentially
            const heroElements = document.querySelectorAll('.hero h2, .hero p, .hero-btn');
            heroElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                el.style.transitionDelay = `${0.3 + (index * 0.1)}s`;
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100);
            });
        });

        // Document links simulation (in real implementation, these would link to actual documents)
        document.addEventListener('DOMContentLoaded', function() {
            const documentLinks = document.querySelectorAll('.document-link');
            documentLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    // In a real implementation, this would open the actual document
                    // For demo purposes, we'll just animate the clicked button
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-3px) scale(1)';
                    }, 300);
                });
            });
        });

        // Add hover effect to gallery items
        document.addEventListener('DOMContentLoaded', function() {
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                const image = item.querySelector('.gallery-image');
                
                item.addEventListener('mouseenter', () => {
                    image.style.transform = 'scale(1.05)';
                });
                
                item.addEventListener('mouseleave', () => {
                    image.style.transform = 'scale(1)';
                });
            });
        });
    



        // document download
        
        const buttons = document.querySelectorAll('.download-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const fileUrl = button.getAttribute('data-file');
      const fileName = fileUrl.split('/').pop(); // extract filename from path

      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });