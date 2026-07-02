function syncMegaMenuPanel() {
  document.querySelectorAll('.product-mega-overlay .mega-category-title').forEach((node) => node.remove());
  document.querySelectorAll('.product-mega-overlay .mega-list a').forEach((link) => {
    const isActive = new URL(link.href, location.origin).pathname === location.pathname;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

const observer = new MutationObserver(syncMegaMenuPanel);
observer.observe(document.body, { childList: true, subtree: true });
window.addEventListener('popstate', syncMegaMenuPanel);
document.addEventListener('click', () => requestAnimationFrame(syncMegaMenuPanel), true);
requestAnimationFrame(syncMegaMenuPanel);
