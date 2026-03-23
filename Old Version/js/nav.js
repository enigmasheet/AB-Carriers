/**
 * AB Carriers — Navigation
 * Handles scroll highlight and mobile menu open/close
 */

function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Amber border on scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('lit', window.scrollY > 50);
  }, { passive: true });
}

function openMob()  { document.getElementById('mn')?.classList.add('open'); }
function closeM()   { document.getElementById('mn')?.classList.remove('open'); }

// Close mobile nav on any link click
document.querySelectorAll('.mob-nav a').forEach(a => {
  a.addEventListener('click', closeM);
});

// Expose globally for inline onclick attributes
window.openMob = openMob;
window.closeM  = closeM;

initNav();
