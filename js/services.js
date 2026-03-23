/**
 * AB Carriers — Services Section
 */

async function initServices() {
  await window.dataReady;
  const D = window.AB;
  if (!D?.services) return;

  const S = D.services;

  // Section headings
  setText('svcLabel', S.section_label);
  setText('svcTitle', S.section_title);
  setText('svcSub',   S.section_sub);

  // Cards
  const grid = document.getElementById('svcGrid');
  if (!grid) return;
  grid.innerHTML = S.items.map(s => `
    <div class="svc-card">
      <div class="svc-num">${s.number}</div>
      <div class="svc-name">${s.name}</div>
      <p class="svc-desc">${s.description}</p>
      <div class="svc-detail">
        ${s.details.map(d => `
          <div class="sd-row">
            <span class="sd-k">${d.key}</span>
            <span class="sd-v">${d.value}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Also populate the form's service select
  const sel = document.getElementById('svcSelect');
  if (sel) {
    sel.innerHTML = `<option value="">Select service</option>` +
      S.items.map(s => `<option value="${s.slug}">${s.name}</option>`).join('');
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

initServices();
