const toggle = document.getElementById('darkModeToggle');

if (toggle) {
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });
}

// Navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Function to update active navigation link
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Set initial active state
    updateActiveNavLink();

    // Certificate Lightbox
    const certElements = document.querySelectorAll('.achievement-card, .work-cert-wrapper');
    const lightbox = document.getElementById('certLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    if (lightbox && certElements.length > 0) {
        certElements.forEach(element => {
            element.addEventListener('click', () => {
                const certSrc = element.getAttribute('data-cert');
                const certTitle = element.getAttribute('data-title');
                
                if (certSrc) {
                    lightboxImg.src = certSrc;
                    lightboxCaption.textContent = certTitle;
                    lightbox.classList.add('active');
                    lightbox.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Clear src after fade-out transition to prevent flashing
            setTimeout(() => {
                if (!lightbox.classList.contains('active')) {
                    lightboxImg.src = '';
                }
            }, 300);
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});


