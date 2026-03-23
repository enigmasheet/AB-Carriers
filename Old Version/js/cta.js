/**
 * AB Carriers — CTA Band
 */

async function initCta() {
  await window.dataReady;
  const D = window.AB;
  if (!D?.cta) return;

  const C = D.cta;

  setText('ctaLine1',    C.headline_line1);
  setText('ctaLine2',    C.headline_line2);
  setText('ctaSub',      C.subline);
  setText('ctaBtnQuote', C.btn_quote);
  setText('ctaBtnPhone', C.btn_phone_label);

  const phoneBtn = document.getElementById('ctaBtnPhone');
  if (phoneBtn) phoneBtn.setAttribute('href', C.btn_phone_href);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

initCta();
