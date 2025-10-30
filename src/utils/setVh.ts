// Utility to set a CSS variable '--vh' equal to 1% of the viewport height
// This helps make 100vh behave consistently across mobile browsers with dynamic UI chrome.
export function initVh() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  function setVar() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  setVar();
  window.addEventListener('resize', setVar, { passive: true });
  window.addEventListener('orientationchange', setVar, { passive: true });
}

export default initVh;

