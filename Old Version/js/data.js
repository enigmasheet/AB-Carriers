/**
 * AB Carriers — Data Loader
 * Fetches data.json and caches it on window.AB
 * All other modules import from window.AB
 */

async function loadData() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    window.AB = await res.json();
  } catch (err) {
    console.error('[AB Carriers] Failed to load data.json:', err);
    window.AB = null;
  }
}

window.dataReady = loadData();
