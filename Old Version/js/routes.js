/**
 * AB Carriers — Routes Section
 */

async function initRoutes() {
  await window.dataReady;
  const D = window.AB;
  if (!D?.routes) return;

  const R = D.routes;

  // Section headings
  setText('routeLabel', R.section_label);
  setText('routeTitle', R.section_title);
  setText('routeSub',   R.section_sub);

  // ── Outbound stop timeline ──
  const tl = document.getElementById('tlOut');
  if (tl) {
    tl.innerHTML = R.outbound_stops.map(s => {
      const cls = s.type === 'terminal' ? 'term' : s.major ? 'major' : '';
      const noteTag = s.note
        ? `<span class="tl-note-tag">${s.note}</span>`
        : '';
      return `
        <div class="tl-row ${cls}">
          <div class="tl-node"></div>
          <span class="tl-name">${s.name}${noteTag}</span>
          <span class="tl-dis">${s.district}</span>
        </div>
      `;
    }).join('');
  }

  // Drop policy note
  setText('dropNote', R.drop_policy_note);

  // ── Destinations table ──
  const tbody = document.getElementById('dtbody');
  if (tbody) {
    tbody.innerHTML = R.destinations.map(d => {
      const tag = d.first_drop
        ? `<span class="first-drop-tag">First drop</span>`
        : '';
      return `
        <tr>
          <td><strong>${d.name}</strong>${tag}</td>
          <td class="t-km">${d.district}</td>
          <td class="t-km">${d.km}</td>
          <td><span class="t-hrs">${d.time}</span></td>
        </tr>
      `;
    }).join('');
  }

  // ── Schedule ──
  const sch = R.schedule;
  setText('schOutLabel', sch.outbound_label);
  setText('schOutNote',  sch.outbound_note);
  setText('schRetLabel', sch.return_label);
  setText('schRetNote',  sch.return_note);

  // Outbound times
  const outTimes = document.getElementById('schOutTimes');
  if (outTimes) {
    outTimes.innerHTML = sch.outbound_times.map(t =>
      `<div class="sch-time"><span class="sch-dot"></span>${t}</div>`
    ).join('');
  }

  // Return times
  const retTimes = document.getElementById('schRetTimes');
  if (retTimes) {
    retTimes.innerHTML = sch.return_times.map(t =>
      `<div class="sch-time"><span class="sch-dot"></span>${t}</div>`
    ).join('');
  }

  // ── Return card ──
  setText('returnBadge', R.return_badge);
  setText('returnBody',  R.return_body);
  setText('returnBody2', R.return_body2);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

initRoutes();
