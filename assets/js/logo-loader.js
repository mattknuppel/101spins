(function () {
  const PLACEHOLDER_SRC =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  function applyPlaceholder(img) {
    if (!img.hasAttribute('src') || img.getAttribute('src') === '') {
      img.src = PLACEHOLDER_SRC;
    }
    img.dataset.logoLoaded = 'false';
    img.classList.add('is-loading');
  }

  function setLogoFromMap(img, map) {
    const key = img.dataset.logoKey;
    if (!key) {
      return;
    }

    const uri = map[key];
    if (!uri) {
      img.dataset.logoMissing = 'true';
      img.classList.remove('is-loading');
      return;
    }

    const image = new Image();
    image.onload = function () {
      img.src = uri;
      img.dataset.logoLoaded = 'true';
      img.classList.remove('is-loading');
    };
    image.onerror = function () {
      img.dataset.logoMissing = 'true';
      img.classList.remove('is-loading');
    };
    image.src = uri;
  }

  function enhanceLogos() {
    const logoElements = document.querySelectorAll('img[data-logo-key]');
    if (!logoElements.length) {
      return;
    }

    logoElements.forEach(applyPlaceholder);

    const map = window.__LOGO_DATA__;
    if (!map) {
      console.error('Casino logo data is missing.');
      return;
    }

    logoElements.forEach(function (img) {
      setLogoFromMap(img, map);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceLogos);
  } else {
    enhanceLogos();
  }
})();
