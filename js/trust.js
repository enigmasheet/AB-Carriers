/**
 * AB Carriers — Trust / Why Us Section
 */

async function initTrust() {
  await window.dataReady;
  const D = window.AB;
  if (!D?.trust) return;

  const T = D.trust;

  setText('trustLabel', T.section_label);
  setText('trustTitle', T.section_title);

  const grid = document.getElementById('trustGrid');
  if (!grid) return;

  grid.innerHTML = T.items.map(t => `
    <div class="tc">
      <div class="tc-n">${t.number}</div>
      <div class="tc-title">${t.title}</div>
      <p class="tc-desc">${t.description}</p>
    </div>
  `).join('');
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

initTrust();
