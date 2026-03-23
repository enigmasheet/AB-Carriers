/**
 * AB Carriers — Footer
 */

async function initFooter() {
  await window.dataReady;
  const D = window.AB;
  if (!D?.footer) return;

  const F  = D.footer;
  const Co = D.company;

  setText('ftTagline',   F.tagline);
  setText('ftDistricts', F.districts);
  setText('ftCopyright', F.copyright);
  setText('ftLocation',  F.location_line);
  setText('ftEmail',     F.email);

  const ftEmailLink = document.getElementById('ftEmailLink');
  if (ftEmailLink) {
    ftEmailLink.textContent = F.email;
    ftEmailLink.setAttribute('href', `mailto:${F.email}`);
  }

  // Company name + established
  setText('ftCompanyName', Co?.legal_name || Co?.name || '');
  setText('ftEstablished', Co ? `Established ${Co.established}` : '');

  // Services nav col
  const svcNav = document.getElementById('ftSvcNav');
  if (svcNav && F.nav?.services) {
    svcNav.innerHTML = F.nav.services.map(label => `
      <li><a href="#services">${label}</a></li>
    `).join('');
  }

  // Company nav col
  const coNav = document.getElementById('ftCoNav');
  const hrefs = { 'Our Route': '#routes', 'Our Fleet': '#fleet', 'Contact Us': '#contact', 'Get a Quote': '#contact' };
  if (coNav && F.nav?.company) {
    coNav.innerHTML = F.nav.company.map(label => `
      <li><a href="${hrefs[label] || '#'}">${label}</a></li>
    `).join('');
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

initFooter();
