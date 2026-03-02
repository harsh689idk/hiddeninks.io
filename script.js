// ========== CUSTOM CURSOR ==========
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        setTimeout(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }, 50);
    });

    const hoverElements = document.querySelectorAll('a, button, .btn, .card, .portfolio-card, .close');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover-link');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover-link');
        });
    });

    // Click effect on cursor
    const clickableElements = document.querySelectorAll('a, button, .btn, .close');
    clickableElements.forEach(el => {
        el.addEventListener('mousedown', () => {
            cursorOutline.classList.add('click-effect');
        });
        el.addEventListener('mouseup', () => {
            setTimeout(() => {
                cursorOutline.classList.remove('click-effect');
            }, 100);
        });
    });

    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
}

// ========== PARALLAX EFFECT ==========
const parallaxBg = document.getElementById('parallaxBg');
window.addEventListener('scroll', () => {
    if (parallaxBg) {
        const scrollY = window.scrollY;
        parallaxBg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealThreshold = 100;

    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - revealThreshold) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('resize', checkReveal);
checkReveal();

// ========== MODAL HANDLING ==========
const workModal = document.getElementById('workModal');
const partnerModal = document.getElementById('partnerModal');
const workBtns = document.querySelectorAll('.work-btn');
const partnerBtns = document.querySelectorAll('.partner-btn');
const closeBtns = document.querySelectorAll('.close');

// Open work modal
workBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        workModal.style.display = 'flex';
    });
});

// Open partner modal
partnerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        partnerModal.style.display = 'flex';
    });
});

// Close modals with close button
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        workModal.style.display = 'none';
        partnerModal.style.display = 'none';
    });
});

// Close when clicking outside modal
window.addEventListener('click', (e) => {
    if (e.target === workModal) {
        workModal.style.display = 'none';
    }
    if (e.target === partnerModal) {
        partnerModal.style.display = 'none';
    }
});

// Form submissions (demo)
const workForm = document.getElementById('workForm');
if (workForm) {
    workForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your application! We’ll review and be in touch. (Demo)');
        workModal.style.display = 'none';
        workForm.reset();
    });
}

const partnerForm = document.getElementById('partnerForm');
if (partnerForm) {
    partnerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks for your partnership inquiry! We’ll get back to you soon. (Demo)');
        partnerModal.style.display = 'none';
        partnerForm.reset();
    });
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
