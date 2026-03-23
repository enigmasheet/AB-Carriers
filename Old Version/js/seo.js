/**
 * AB Carriers — SEO
 * Reads data.json seo block and injects:
 *   - <title>
 *   - <meta> description, keywords, canonical
 *   - Open Graph tags
 *   - Twitter Card tags
 *   - JSON-LD LocalBusiness schema
 */

async function initSEO() {
  await window.dataReady;
  const D = window.AB;
  if (!D?.seo) return;

  const S  = D.seo;
  const Co = D.company;

  // ── Title ──
  setMeta('seoTitle',    null,         S.title,        'textContent');

  // ── Primary meta ──
  setMeta('seoDesc',     'content',    S.description);
  setMeta('seoKeywords', 'content',    S.keywords);
  setMeta('seoCanon',    'href',       S.canonical);

  // ── Open Graph ──
  setMeta('ogTitle',  'content', S.og_title);
  setMeta('ogDesc',   'content', S.og_description);
  setMeta('ogImage',  'content', S.og_image);
  setMeta('ogUrl',    'content', S.canonical);
  setMeta('ogLocale', 'content', S.locale);

  // ── Twitter Card ──
  setMeta('twTitle', 'content', S.og_title);
  setMeta('twDesc',  'content', S.og_description);
  setMeta('twImage', 'content', S.og_image);

  // ── JSON-LD LocalBusiness ──
  const schema = {
    '@context':   'https://schema.org',
    '@type':       S.schema_type,
    'name':        S.schema_name,
    'description': S.description,
    'url':         S.canonical,
    'telephone':   S.schema_telephone,
    'address': {
      '@type':           'PostalAddress',
      'streetAddress':    S.schema_address.streetAddress,
      'addressLocality':  S.schema_address.addressLocality,
      'addressRegion':    S.schema_address.addressRegion,
      'addressCountry':   S.schema_address.addressCountry
    },
    'geo': {
      '@type':     'GeoCoordinates',
      'latitude':   S.schema_geo.latitude,
      'longitude':  S.schema_geo.longitude
    },
    'openingHours': 'Mo-Su 05:00-21:00',
    'priceRange':   '$$',
    'foundingDate':  String(Co?.established || '2004'),
    'numberOfEmployees': { '@type': 'QuantitativeValue', 'value': Co?.fleet_count ? Co.fleet_count * 3 : 9 },
    'areaServed': [
      'Birgunj', 'Biratnagar', 'Hariyon', 'Lalbandi', 'Hetauda',
      'Narayanghat', 'Janakpur', 'Lahan', 'Rajbiraj', 'Itahari', 'Dharan'
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Freight Services',
      'itemListElement': (D.services?.items || []).map(s => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name':        s.name,
          'description': s.description
        }
      }))
    }
  };

  const ldEl = document.getElementById('schemaLD');
  if (ldEl) ldEl.textContent = JSON.stringify(schema, null, 2);
}

function setMeta(id, attr, value, method) {
  const el = document.getElementById(id);
  if (!el || value === undefined) return;
  if (method === 'textContent') {
    el.textContent = value;
  } else {
    el.setAttribute(attr, value);
  }
}

initSEO();
