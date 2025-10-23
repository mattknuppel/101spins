const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const yearEl = document.getElementById('current-year');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
    }
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (!(emailInput instanceof HTMLInputElement)) {
      return;
    }

    const email = emailInput.value.trim();

    if (!email) {
      emailInput.setCustomValidity('Please enter a valid email address.');
      emailInput.reportValidity();
      return;
    }

    emailInput.setCustomValidity('');
    const submittedMessage = document.createElement('p');
    submittedMessage.className = 'small-text';
    submittedMessage.textContent = 'Thanks! Check your inbox for the latest 101Spins bonuses.';
    newsletterForm.replaceChildren(submittedMessage);
  });
}
