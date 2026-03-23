/**
 * AB Carriers — Fleet Section
 * Loads truck.svg once, then stamps it into each fleet card
 */

async function initFleet() {
  await window.dataReady;
  const D = window.AB;
  if (!D?.fleet) return;

  const F = D.fleet;

  // Section headings
  setText('fleetLabel', F.section_label);
  setText('fleetTitle', F.section_title);
  setText('fleetSub',   F.section_sub);

  // Load the shared truck SVG once
  let truckSVG = '';
  try {
    const res = await fetch('svgs/truck.svg');
    if (res.ok) truckSVG = await res.text();
  } catch (e) {
    console.warn('[AB Carriers] Could not load truck.svg:', e);
  }

  // Render cards
  const grid = document.getElementById('fleetGrid');
  if (!grid) return;

  grid.innerHTML = F.vehicles.map(v => `
    <div class="fc">
      <div class="fc-svg">${truckSVG}</div>
      <div class="fc-type">${v.type}</div>
      <div class="fc-cap">${v.capacity}</div>
      <p class="fc-desc">${v.description}</p>
      <div class="fc-specs">
        ${v.specs.map(s => `
          <div class="fc-spec">
            <span class="fsk">${s.key}</span>
            <span class="fsv">${s.value}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

initFleet();
