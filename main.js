/* hamburger menu */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');

        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}


/* highlighted current page in nav */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');

    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
    }
});


/* filter classes */
const filterBtns = document.querySelectorAll('.filter-btn');
const classCards = document.querySelectorAll('.class-card');

if (filterBtns.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {

            // reset buttons first
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });

            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            const filter = this.dataset.filter;

            // show/hide cards
            classCards.forEach(card => {
                const show = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('hidden', !show);
            });

            // screen reader count update
            const visibleCount = document.querySelectorAll('.class-card:not(.hidden)').length;
            announceToScreenReader(
                `Showing ${visibleCount} class${visibleCount !== 1 ? 'es' : ''}`
            );
        });
    });
}


/* contact form check */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        let valid = true;

        // remove old errors
        document.querySelectorAll('.field-error').forEach(el => el.remove());

        document.querySelectorAll('.form-group input, .form-group textarea, .form-group select')
            .forEach(el => el.removeAttribute('aria-invalid'));

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.value.trim()) {
            showError(name, 'Name is required');
            valid = false;
        }

        if (!email.value.trim()) {
            showError(email, 'Email is required');
            valid = false;
        } else if (!emailCheck.test(email.value.trim())) {
            showError(email, 'Invalid email');
            valid = false;
        }

        if (!message.value.trim()) {
            showError(message, 'Message is required');
            valid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message too short');
            valid = false;
        }

        if (valid) {
            const success = document.getElementById('formSuccess');

            if (success) {
                success.style.display = 'block';
                success.focus();
            }

            contactForm.reset();
        }
    });
}


/* membership form check */
const memberForm = document.getElementById('memberForm');

if (memberForm) {
    memberForm.addEventListener('submit', e => {
        e.preventDefault();

        let valid = true;

        document.querySelectorAll('.field-error').forEach(el => el.remove());

        const mName = document.getElementById('mName');
        const mEmail = document.getElementById('mEmail');
        const mPlan = document.getElementById('mPlan');

        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!mName.value.trim()) {
            showError(mName, 'Name is required');
            valid = false;
        }

        if (!mEmail.value.trim() || !emailCheck.test(mEmail.value.trim())) {
            showError(mEmail, 'Invalid email');
            valid = false;
        }

        if (!mPlan.value) {
            showError(mPlan, 'Pick a plan');
            valid = false;
        }

        if (valid) {
            const success = document.getElementById('memberFormSuccess');

            if (success) {
                success.style.display = 'block';
                success.focus();
            }

            memberForm.reset();
        }
    });
}


/* error message */
function showError(input, message) {
    input.setAttribute('aria-invalid', 'true');

    const error = document.createElement('p');
    error.className = 'field-error';
    error.textContent = message;

    error.style.cssText =
        'color:#DC2626;font-size:0.85rem;margin-top:5px;font-weight:600;';

    error.setAttribute('role', 'alert');

    input.parentNode.appendChild(error);

    input.focus();
}


/* screen reader message */
function announceToScreenReader(message) {
    let announcer = document.getElementById('sr-announcer');

    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'sr-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.style.position = 'absolute';
        announcer.style.left = '-9999px';

        document.body.appendChild(announcer);
    }

    announcer.textContent = '';

    setTimeout(() => {
        announcer.textContent = message;
    }, 50);
}


/* smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', () => {
        const target = document.querySelector(anchor.getAttribute('href'));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});