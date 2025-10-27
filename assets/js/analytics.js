(function () {
  const scriptTag = document.currentScript || document.querySelector('script[data-measurement-id]');
  const measurementId = scriptTag && scriptTag.dataset ? scriptTag.dataset.measurementId : '';

  if (!measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId)) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('Google Analytics measurement ID is missing or invalid.');
    }
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(gaScript);

  gtag('js', new Date());
  gtag('config', measurementId);
})();
