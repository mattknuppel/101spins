const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const yearEl = document.getElementById('current-year');

if (navToggle && navMenu) {
  const desktopMediaQuery = window.matchMedia('(min-width: 769px)');

  const setMenuExpanded = (expanded) => {
    navToggle.setAttribute('aria-expanded', String(expanded));

    if (expanded || desktopMediaQuery.matches) {
      navMenu.removeAttribute('hidden');
    } else {
      navMenu.setAttribute('hidden', '');
    }

    navMenu.classList.toggle('open', expanded);
  };

  const handleViewportChange = () => {
    if (desktopMediaQuery.matches) {
      setMenuExpanded(false);
    } else {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      setMenuExpanded(expanded);
    }
  };

  const addMediaQueryListener = (mediaQuery, handler) => {
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handler);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handler);
    }
  };

  addMediaQueryListener(desktopMediaQuery, handleViewportChange);
  handleViewportChange();

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    setMenuExpanded(!expanded);
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setMenuExpanded(false);
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
