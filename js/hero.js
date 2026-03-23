/**
 * AB Carriers — Hero
 * Renders: twinkling stars, stats strip from data.json
 * The truck SVG is already inline in index.html (loaded via <img> from svgs/)
 */

async function initHero() {
  await window.dataReady;
  const D = window.AB;
  if (!D) return;

  // ── Stars ──
  const starsLayer = document.getElementById('stars');
  if (starsLayer) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 70; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const sz = (Math.random() * 1.8 + 0.5).toFixed(1);
      s.style.cssText = [
        `width:${sz}px`, `height:${sz}px`,
        `top:${(Math.random() * 68).toFixed(1)}%`,
        `left:${(Math.random() * 100).toFixed(1)}%`,
        `--d:${(Math.random() * 3 + 2).toFixed(1)}s`,
        `--del:${(Math.random() * 5).toFixed(1)}s`,
      ].join(';');
      frag.appendChild(s);
    }
    starsLayer.appendChild(frag);
  }

  // ── Stats strip ──
  const statsWrap = document.getElementById('heroStats');
  if (statsWrap && D.stats) {
    statsWrap.innerHTML = D.stats.map(s => `
      <div class="hs">
        <span class="hs-v">${s.value}</span>
        <span class="hs-l">${s.label}</span>
      </div>
    `).join('');
  }

  // ── Hero copy from data ──
  const h = D.hero;
  setText('heroEyebrow',  h.eyebrow);
  setText('heroLine1',    h.headline_line1);
  setText('heroLine2',    h.headline_line2);
  setText('heroLine3',    h.headline_line3);
  setText('heroBody',     h.body);
  setAttr('heroCta1', 'href', D.nav.cta_href);
  setAttr('heroCta2', 'href', '#routes');
  setText('heroCta1',     h.cta_primary);
  setText('heroCta2',     h.cta_secondary + ' →');
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}
function setAttr(id, attr, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.setAttribute(attr, val);
}

initHero();
