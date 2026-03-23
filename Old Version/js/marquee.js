/**
 * AB Carriers — Marquee
 * Duplicates items for infinite scroll effect
 */

async function initMarquee() {
  await window.dataReady;
  const D = window.AB;
  if (!D?.marquee) return;

  const track = document.getElementById('mq');
  if (!track) return;

  // Render twice for seamless loop
  let html = '';
  for (let pass = 0; pass < 2; pass++) {
    D.marquee.forEach(item => {
      html += `<div class="mq-item"><span class="mq-dot"></span>${item}</div>`;
    });
  }
  track.innerHTML = html;
}

initMarquee();
