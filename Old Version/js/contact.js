/**
 * AB Carriers — Contact Section
 */

async function initContact() {
  await window.dataReady;
  const D = window.AB;
  if (!D?.contact) return;

  const C = D.contact;

  setText('contactLabel', C.section_label);
  setText('contactTitle', C.section_title);
  setText('contactIntro', C.intro);
  setText('formTitle',    C.form_title);
  setText('formSubmitBtn', C.form_submit);

  // Office blocks
  const list = document.getElementById('contactList');
  if (list) {
    list.innerHTML = C.offices.map(o => `
      <div class="cb">
        <div class="cb-icon">${o.icon}</div>
        <div>
          <div class="cb-lbl">${o.label}</div>
          <div class="cb-val">${o.value}</div>
        </div>
      </div>
    `).join('');
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

// Form submission handler — exposed globally for onclick
window.submitQuote = function(btn) {
  const successMsg = window.AB?.contact?.form_success || '✓ Request sent!';
  btn.textContent = successMsg;
  btn.style.background = '#2e9e5b';
  setTimeout(() => {
    btn.textContent = window.AB?.contact?.form_submit || 'Send Quote Request';
    btn.style.background = '';
  }, 4500);
};

initContact();
