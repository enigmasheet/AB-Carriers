/* ============================================================
   AB Carriers — main.js
   Renders all sections from data.json
   ============================================================ */

(async function () {
  "use strict";

  /* ── 1. Load data ──────────────────────────────────────────── */
  let data;
  try {
    const res = await fetch("data.json");
    data = await res.json();
  } catch (e) {
    console.error("Could not load data.json", e);
    return;
  }

  /* ── 2. Helpers ────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  };

  /* SVG icons */
  const icons = {
    truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    map:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
    mail:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    pin:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    dot:   `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>`,
    flag:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  };

  /* ── 3. Navbar ─────────────────────────────────────────────── */
  function buildNav() {
    const { nav, company } = data;
    const navbar = $("#navbar");
    const inner = navbar.querySelector(".nav-inner");

    // Logo
    const logo = el("a", "nav-logo");
    logo.href = "#hero";
    logo.innerHTML = `
      <span class="nav-logo-main">A<span>.</span>B Carriers</span>
      <span class="nav-logo-sub">Est. ${company.established} · Nepal</span>`;
    inner.appendChild(logo);

    // Desktop links
    const ul = el("nav", "nav-links");
    nav.links.forEach(link => {
      const a = el("a", "", link.label);
      a.href = link.href;
      ul.appendChild(a);
    });
    const ctaA = el("a", "nav-cta", nav.cta_label);
    ctaA.href = nav.cta_href;
    ul.appendChild(ctaA);
    inner.appendChild(ul);

    // Hamburger
    const ham = el("button", "nav-hamburger");
    ham.setAttribute("aria-label", "Toggle menu");
    ham.innerHTML = `<span></span><span></span><span></span>`;
    inner.appendChild(ham);

    // Mobile menu
    const mobile = el("nav", "nav-mobile");
    nav.links.forEach(link => {
      const a = el("a", "", link.label);
      a.href = link.href;
      mobile.appendChild(a);
    });
    const mobCta = el("a", "nav-cta", nav.cta_label);
    mobCta.href = nav.cta_href;
    mobile.appendChild(mobCta);
    navbar.after(mobile);

    // toggle
    ham.addEventListener("click", () => {
      ham.classList.toggle("open");
      mobile.classList.toggle("open");
    });
    mobile.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        ham.classList.remove("open");
        mobile.classList.remove("open");
      });
    });

    // scroll sticky
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  /* ── 4. Hero ───────────────────────────────────────────────── */
  function buildHero() {
    const { hero } = data;
    const section = $("#hero");
    section.innerHTML = `
      <div class="hero-scene" aria-hidden="true" id="hero-scene"></div>
      <div class="hero-bg-number">2004</div>
      <div class="container hero-content">
        <p class="hero-eyebrow">${hero.eyebrow}</p>
        <h1 class="hero-headline">
          <span class="line-1">${hero.headline_line1}</span>
          <span class="line-2">${hero.headline_line2}</span>
          <span class="line-3">${hero.headline_line3}</span>
        </h1>
        <p class="hero-body">${hero.body}</p>
        <div class="hero-actions">
          <a href="#contact" class="btn-primary">${hero.cta_primary} ${icons.arrow}</a>
          <a href="#routes"  class="btn-secondary">${hero.cta_secondary} ${icons.map}</a>
        </div>
      </div>
      <div class="hero-scroll-hint">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </div>`;

    initTruckScene();

    // staggered entrance
    requestAnimationFrame(() => {
      const eyebrow = section.querySelector(".hero-eyebrow");
      const h1 = section.querySelector(".hero-headline");
      const body = section.querySelector(".hero-body");
      const actions = section.querySelector(".hero-actions");
      [eyebrow, h1, body, actions].forEach((e, i) => {
        e.style.opacity = "0";
        e.style.transform = "translateY(24px)";
        e.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
        setTimeout(() => {
          e.style.opacity = "1";
          e.style.transform = "none";
        }, 100 + i * 120);
      });
    });
  }

  /* ── Truck Scene ─────────────────────────────────────────────── */
  function initTruckScene() {
    const scene = $("#hero-scene");
    if (!scene) return;

    scene.innerHTML = `
      <div class="hs-stars" id="hs-stars"></div>
      <div class="hs-horizon-glow"></div>
      <div class="hs-road">
        <div class="hs-road-edge"></div>
        <div class="hs-road-line"></div>
      </div>
      <div class="hs-warehouse">
        <div class="hs-wh-roof"></div>
        <div class="hs-wh-body">
          <div class="hs-wh-window"></div>
          <div class="hs-wh-window"></div>
          <div class="hs-wh-label">Depot</div>
          <div class="hs-wh-door">
            <div class="hs-wh-ds"></div><div class="hs-wh-ds"></div>
            <div class="hs-wh-ds"></div><div class="hs-wh-ds"></div>
            <div class="hs-wh-ds"></div>
          </div>
        </div>
      </div>
      <div class="hs-dock-boxes" id="hs-dock-boxes">
        <div class="hs-box hs-box-tall" id="hb1"></div>
        <div class="hs-box" id="hb2"></div>
        <div class="hs-box hs-box-tall" id="hb3"></div>
        <div class="hs-box" id="hb4"></div>
      </div>
      <div class="hs-arm-wrap" id="hs-arm">
        <div class="hs-arm"></div>
      </div>
      <div class="hs-moving-box" id="hs-mbox"></div>
      <div class="hs-truck-wrap" id="hs-truck">
        <div class="hs-truck">
          <div class="hs-bed"></div>
          <div class="hs-bed-side"></div>
          <div class="hs-cabin">
            <div class="hs-exhaust">
              <div class="hs-puff hs-p1"></div>
              <div class="hs-puff hs-p2"></div>
              <div class="hs-puff hs-p3"></div>
            </div>
            <div class="hs-cabin-roof"></div>
            <div class="hs-cabin-body">
              <div class="hs-windshield"></div>
              <div class="hs-cabin-door"></div>
              <div class="hs-headlight" id="hs-headlight"></div>
            </div>
          </div>
          <div class="hs-wheels">
            <div class="hs-wheel hs-w1"></div>
            <div class="hs-wheel hs-w2"></div>
            <div class="hs-wheel hs-w3"></div>
            <div class="hs-wheel hs-w4"></div>
          </div>
        </div>
      </div>
      <div class="hs-cargo-items" id="hs-cargo">
        <div class="hs-ci hs-ci-tall"></div>
        <div class="hs-ci"></div>
        <div class="hs-ci hs-ci-tall"></div>
      </div>
      <div class="hs-speed-lines" id="hs-speed">
        <div class="hs-sl hs-sl1"></div><div class="hs-sl hs-sl2"></div>
        <div class="hs-sl hs-sl3"></div><div class="hs-sl hs-sl4"></div>
        <div class="hs-sl hs-sl5"></div>
      </div>`;

    // Stars
    const starsEl = $("#hs-stars");
    for (let i = 0; i < 55; i++) {
      const s = document.createElement("div");
      s.className = "hs-star";
      s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*65}%;opacity:${(Math.random()*0.4+0.1).toFixed(2)};width:${Math.random()<0.2?3:2}px;height:${Math.random()<0.2?3:2}px`;
      starsEl.appendChild(s);
    }

    const truck    = $("#hs-truck");
    const cargo    = $("#hs-cargo");
    const speed    = $("#hs-speed");
    const light    = $("#hs-headlight");
    const arm      = $("#hs-arm");
    const mbox     = $("#hs-mbox");
    const wheels   = $$(".hs-wheel");
    const vw       = scene.offsetWidth || window.innerWidth;

    const startX   = Math.max(vw * 0.38, 260);
    const loadX    = Math.max(vw * 0.26, 210);
    const endX     = vw + 320;

    const spinWheels = (on) => wheels.forEach(w => w.classList.toggle("hs-spinning", on));

    const setTruck = (x, animate) => {
      truck.style.transition = animate ? truck.style.transition : "none";
      truck.style.left = x + "px";
    };
    const setCargo = (x, animate) => {
      cargo.style.transition = animate ? cargo.style.transition : "none";
      cargo.style.left = (x + 14) + "px";
    };

    setTruck(startX, false);
    setCargo(startX, false);

    const boxes = ["hb1","hb2","hb3"].map(id => document.getElementById(id));

    function runSequence() {
      // drive to dock
      setTimeout(() => {
        truck.style.transition = "left 1.4s cubic-bezier(0.3,0,0.2,1)";
        cargo.style.transition = "left 1.4s cubic-bezier(0.3,0,0.2,1)";
        setTruck(loadX, true);
        setCargo(loadX, true);
        spinWheels(true);
      }, 500);

      // stop, arm tips
      setTimeout(() => {
        spinWheels(false);
        arm.style.transform = "rotate(-30deg)";
      }, 2100);

      // load 3 boxes
      [0,1,2].forEach((i) => {
        const delay = 2600 + i * 800;
        setTimeout(() => {
          mbox.style.transition = "none";
          mbox.style.cssText += `left:${loadX+24+i*8}px;bottom:88px;opacity:1;transition:none`;
          setTimeout(() => {
            mbox.style.transition = "all 0.5s cubic-bezier(0.4,0,0.2,1)";
            mbox.style.left = (loadX + 50 + i * 12) + "px";
            mbox.style.bottom = "134px";
          }, 40);
          if (boxes[i]) boxes[i].classList.add("hs-gone");
        }, delay);
        setTimeout(() => { mbox.style.opacity = "0"; }, delay + 560);
      });

      // arm retracts, cargo visible, lights on
      setTimeout(() => {
        arm.style.transform = "rotate(0deg)";
        cargo.style.transition = "none";
        setCargo(loadX, false);
        cargo.classList.add("hs-loaded");
        light.classList.add("hs-on");
      }, 5100);

      // drive away
      setTimeout(() => {
        truck.style.transition = "left 2.2s cubic-bezier(0.4,0,1,1)";
        cargo.style.transition = "left 2.2s cubic-bezier(0.4,0,1,1), opacity 0.5s";
        setTruck(endX, true);
        setCargo(endX, true);
        spinWheels(true);
        speed.classList.add("hs-show");
      }, 5900);

      // reset
      setTimeout(() => {
        truck.style.transition = "none";
        cargo.style.transition = "none";
        cargo.classList.remove("hs-loaded");
        light.classList.remove("hs-on");
        spinWheels(false);
        speed.classList.remove("hs-show");
        boxes.forEach(b => { if(b) b.classList.remove("hs-gone"); });
        arm.style.transform = "rotate(0deg)";
        setTruck(startX, false);
        setCargo(startX, false);
        setTimeout(runSequence, 700);
      }, 8500);
    }

    runSequence();
  }

  /* ── 5. Stats ──────────────────────────────────────────────── */
  function buildStats() {
    const { stats } = data;
    const section = $("#stats");
    const grid = section.querySelector(".stats-grid");
    stats.forEach((s, i) => {
      const item = el("div", `stat-item reveal reveal-delay-${i + 1}`);
      item.innerHTML = `
        <div class="stat-value" data-target="${s.value}">${s.value}</div>
        <div class="stat-label">${s.label}</div>`;
      grid.appendChild(item);
    });
  }

  /* ── 6. Marquee ────────────────────────────────────────────── */
  function buildMarquee() {
    const track = $(".marquee-track");
    if (!track) return;
    const items = Array.isArray(data.marquee) ? data.marquee : [
      "Full Truckload", "Partial Load", "Express Cargo",
      "Birgunj → Biratnagar", "Daily Departures",
      "20+ Years Experience", "3 Six-Wheel Trucks", "Terai Corridor Specialists"
    ];
    const doubled = [...items, ...items];
    doubled.forEach(text => {
      const span = el("span", "", text);
      track.appendChild(span);
    });
  }

  /* ── 7. Services ───────────────────────────────────────────── */
  function buildServices() {
    const { services } = data;
    const section = $("#services");
    section.innerHTML = `
      <div class="container">
        <div class="services-header reveal">
          <span class="section-label">${services.section_label}</span>
          <span class="gold-line"></span>
          <h2 class="section-title">${services.section_title}</h2>
          <p class="section-sub">${services.section_sub}</p>
        </div>
        <div class="services-grid" id="services-grid"></div>
      </div>`;

    const grid = $("#services-grid");
    services.items.forEach((svc, i) => {
      const card = el("div", `service-card reveal reveal-delay-${i + 1}`);
      card.innerHTML = `
        <div class="service-bar"></div>
        <div class="service-number">${svc.number}</div>
        <h3 class="service-name">${svc.name}</h3>
        <p class="service-desc">${svc.description}</p>
        <div class="service-details">
          ${svc.details.map(d => `
            <div class="service-detail-row">
              <span class="detail-key">${d.key}</span>
              <span class="detail-val">${d.value}</span>
            </div>`).join("")}
        </div>`;
      grid.appendChild(card);
    });
  }

  /* ── 8. Routes ─────────────────────────────────────────────── */
  function buildRoutes() {
    const { routes } = data;
    const section = $("#routes");

    const destMap = {};
    routes.destinations.forEach(d => { destMap[d.name] = d; });

    section.innerHTML = `
      <div class="container">
        <div class="routes-header reveal">
          <span class="section-label">${routes.section_label}</span>
          <span class="gold-line"></span>
          <h2 class="section-title">${routes.section_title}</h2>
          <p class="section-sub">${routes.section_sub}</p>
        </div>
        <div class="route-layout">
          <div class="route-timeline reveal" id="route-timeline">
            <div class="route-line"></div>
          </div>
          <div class="route-sidebar reveal reveal-delay-2" id="route-sidebar"></div>
        </div>
      </div>`;

    // Timeline
    const timeline = $("#route-timeline");
    routes.outbound_stops.forEach(stop => {
      const isTerminal = stop.type === "terminal";
      const stopEl = el("div", `route-stop${isTerminal ? " terminal" : ""}${stop.first_drop ? " first-drop" : ""}`);
      const dest = destMap[stop.name];
      stopEl.innerHTML = `
        <div class="stop-dot">${isTerminal ? icons.flag : icons.dot}</div>
        <div class="stop-info">
          <div class="stop-name">${stop.name}</div>
          <div class="stop-district">${stop.district} District</div>
          ${stop.first_drop ? `<div class="stop-note">First Drop Point</div>` : ""}
          ${stop.note && !stop.first_drop ? `<div class="stop-note">${stop.note}</div>` : ""}
          ${dest ? `<div class="stop-meta">
            <span class="stop-km"><span>${dest.km}</span></span>
            <span class="stop-time"><span>${dest.time}</span></span>
          </div>` : ""}
        </div>`;
      timeline.appendChild(stopEl);
    });

    // Policy note
    const policy = el("div", "policy-note");
    policy.style.marginTop = "20px";
    policy.innerHTML = `<p><strong style="color:var(--gold-pale)">Drop Policy:</strong> ${routes.drop_policy_note}</p>`;
    timeline.appendChild(policy);

    // Sidebar
    const sidebar = $("#route-sidebar");

    // Outbound schedule
    const outCard = el("div", "schedule-card");
    outCard.innerHTML = `
      <div class="schedule-card-title">${icons.clock} ${routes.schedule.outbound_label}</div>
      <div class="schedule-times">
        ${routes.schedule.outbound_times.map(t => `<div class="schedule-time">${t}</div>`).join("")}
      </div>
      <div class="schedule-note">${routes.schedule.outbound_note}</div>`;
    sidebar.appendChild(outCard);

    // Return schedule
    const retCard = el("div", "schedule-card");
    retCard.innerHTML = `
      <div class="schedule-card-title">${icons.clock} ${routes.schedule.return_label}</div>
      <div class="schedule-times">
        ${routes.schedule.return_times.map(t => `<div class="schedule-time">${t}</div>`).join("")}
      </div>
      <div class="schedule-note">${routes.schedule.return_note}</div>`;
    sidebar.appendChild(retCard);

    // Return note
    const retNote = el("div", "return-note-card");
    retNote.innerHTML = `
      <div class="return-badge">Full Load Only</div>
      <p class="return-note-text">${routes.return_note}</p>`;
    sidebar.appendChild(retNote);
  }

  /* ── 9. Trust ──────────────────────────────────────────────── */
  function buildTrust() {
    const { trust } = data;
    const section = $("#trust");
    section.innerHTML = `
      <div class="container">
        <div class="trust-header reveal">
          <span class="section-label">${trust.section_label}</span>
          <span class="gold-line"></span>
          <h2 class="section-title">${trust.section_title}</h2>
        </div>
        <div class="trust-grid" id="trust-grid"></div>
      </div>`;

    const grid = $("#trust-grid");
    trust.items.forEach((item, i) => {
      const card = el("div", `trust-card reveal reveal-delay-${(i % 2) + 1}`);
      card.innerHTML = `
        <div class="trust-number">${item.number}</div>
        <h3 class="trust-title">${item.title}</h3>
        <p class="trust-desc">${item.description}</p>
        <div class="trust-card-accent">${item.number}</div>`;
      grid.appendChild(card);
    });
  }

  /* ── 10. Contact ───────────────────────────────────────────── */
  function buildContact() {
    const { contact } = data;
    const section = $("#contact");
    section.innerHTML = `
      <div class="container">
        <div class="contact-header reveal">
          <span class="section-label">${contact.section_label}</span>
          <span class="gold-line"></span>
          <h2 class="section-title">${contact.section_title}</h2>
          <p class="contact-intro">${contact.intro}</p>
        </div>
        <div class="contact-layout">
          <div class="offices-list reveal" id="offices-list"></div>
          <div class="reveal reveal-delay-2">
            <form class="quote-form" id="quote-form" novalidate>
              <div class="form-title">${contact.form_title}</div>
              <div class="form-row">
                <div class="form-group">
                  <label for="f-name">Full Name *</label>
                  <input type="text" id="f-name" name="name" placeholder="Your name" required>
                </div>
                <div class="form-group">
                  <label for="f-phone">Phone *</label>
                  <input type="tel" id="f-phone" name="phone" placeholder="+977-" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="f-from">From</label>
                  <input type="text" id="f-from" name="from" value="Birgunj" readonly style="opacity:0.6;cursor:not-allowed">
                </div>
                <div class="form-group">
                  <label for="f-to">To</label>
                  <select id="f-to" name="to">
                    ${data.routes.destinations.map(d =>
                      `<option value="${d.name}">${d.name} (${d.km})</option>`
                    ).join("")}
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="f-service">Service Type *</label>
                  <select id="f-service" name="service" required>
                    <option value="">Select service</option>
                    ${data.services.items.map(s => `<option value="${s.name}">${s.name}</option>`).join("")}
                  </select>
                </div>
                <div class="form-group">
                  <label for="f-weight">Approx. Weight</label>
                  <input type="text" id="f-weight" name="weight" placeholder="e.g. 500 kg / 3 tonne">
                </div>
              </div>
              <div class="form-group">
                <label for="f-message">Additional Details</label>
                <textarea id="f-message" name="message" placeholder="Cargo type, preferred date, special requirements..."></textarea>
              </div>
              <button type="submit" class="form-submit" id="form-btn">${contact.form_submit}</button>
              <div class="form-success" id="form-success">✓ ${contact.form_success}</div>
              <div class="form-error" id="form-error">Something went wrong. Please call us directly.</div>
            </form>
          </div>
        </div>
      </div>`;

    // Offices
    const officesList = $("#offices-list");
    contact.offices.forEach(office => {
      const item = el("div", "office-item");
      const iconSvg = icons[office.icon] || icons.pin;
      const inner = `
        <div class="office-icon">${iconSvg}</div>
        <div>
          <div class="office-label">${office.label}</div>
          <div class="office-value">${office.value}</div>
        </div>`;
      if (office.href) {
        const a = el("a", "office-item");
        a.href = office.href;
        a.innerHTML = inner;
        officesList.appendChild(a);
      } else {
        item.innerHTML = inner;
        officesList.appendChild(item);
      }
    });

    // Form submission
    const form = $("#quote-form");
    const btn  = $("#form-btn");
    const successMsg = $("#form-success");
    const errorMsg   = $("#form-error");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name    = form.querySelector("#f-name").value.trim();
      const phone   = form.querySelector("#f-phone").value.trim();
      const service = form.querySelector("#f-service").value;
      if (!name || !phone || !service) {
        errorMsg.textContent = "Please fill in Name, Phone, and Service Type.";
        errorMsg.classList.add("visible");
        return;
      }
      errorMsg.classList.remove("visible");
      btn.disabled = true;
      btn.textContent = "Sending…";

      try {
        const fd = new FormData(form);
        const resp = await fetch(contact.formspree_url, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" }
        });
        if (resp.ok) {
          form.reset();
          successMsg.classList.add("visible");
          btn.textContent = "Sent ✓";
        } else {
          throw new Error("Non-OK response");
        }
      } catch {
        errorMsg.textContent = "Something went wrong. Please call us directly at +977-51-520-881.";
        errorMsg.classList.add("visible");
        btn.disabled = false;
        btn.textContent = contact.form_submit;
      }
    });
  }

  /* ── 11. Footer ────────────────────────────────────────────── */
  function buildFooter() {
    const { footer, nav, company, contact } = data;
    const footerEl = $("#footer");
    footerEl.innerHTML = `
      <div class="container">
        <div class="footer-top">
          <div>
            <div class="footer-brand-name">A<span>.</span>B Carriers</div>
            <div style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;">${company.legal_name}</div>
            <p class="footer-tagline">${footer.tagline}</p>
            <div class="footer-districts">${footer.districts}</div>
          </div>
          <div>
            <div class="footer-col-title">Services</div>
            <nav class="footer-links">
              ${data.services.items.map(s => `<a href="#services">${s.name}</a>`).join("")}
            </nav>
          </div>
          <div>
            <div class="footer-col-title">Company</div>
            <nav class="footer-links">
              ${nav.links.map(l => `<a href="${l.href}">${l.label}</a>`).join("")}
              <a href="#contact">Get a Quote</a>
            </nav>
          </div>
        </div>
        <div class="footer-bottom">
          <span class="footer-copy">${footer.copyright}</span>
          <a href="mailto:${footer.email}" class="footer-email">${footer.email}</a>
        </div>
      </div>`;
  }

  /* ── 12. Scroll Reveal ─────────────────────────────────────── */
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    // observe all .reveal elements (called after render)
    $$(".reveal").forEach(el => observer.observe(el));
  }

  /* ── 13. Active Nav Link Highlighting ──────────────────────── */
  function initActiveNav() {
    const sections = $$("section[id]");
    const navLinks = $$(".nav-links a:not(.nav-cta)");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      navLinks.forEach(a => {
        a.style.color = a.getAttribute("href") === `#${current}` ? "var(--gold)" : "";
      });
    }, { passive: true });
  }

  /* ── 14. Build & Init ──────────────────────────────────────── */
  buildNav();
  buildHero();
  buildStats();
  buildMarquee();
  buildServices();
  buildRoutes();
  buildTrust();
  buildContact();
  buildFooter();

  // After render — wire up observers
  requestAnimationFrame(() => {
    initReveal();
    initActiveNav();
  });

  // Re-observe dynamically added reveals
  setTimeout(initReveal, 200);

})();