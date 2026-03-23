/**
 * AB Carriers — Scroll Reveal
 * Watches .rev, .rev-l, and .stg elements
 * Adds .in class when they enter the viewport
 */

function initReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          // Unobserve after first reveal to save resources
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.rev, .rev-l, .stg').forEach(el => {
    observer.observe(el);
  });
}

// Run after all section modules have rendered their content
// Small delay ensures dynamically-inserted elements are in the DOM
window.dataReady.then(() => {
  setTimeout(initReveal, 80);
});
