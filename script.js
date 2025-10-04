// Simple hash router + content rendering (no frameworks)
const app = document.getElementById("app");
const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

// Work Experience items
const WORK_ITEMS = [
  {
    slug: "harbinger-product",
    title: "Harbinger Motors — Product Engineering Intern",
    img: "assets/p5.jpg",
    summary: "Supported product development and validation of electric powertrain subassemblies.",
    details: `
      • Assisted in design, FEA, and GD&T documentation of inverter and gearbox subassemblies.<br>
      • Created tolerance stack-ups and engineering drawings per company standards.<br>
      • Collaborated with suppliers for DFM feedback and integrated changes into CAD models.<br>
      • Supported product testing by installing instrumentation and analyzing mechanical endurance data.
    `,
    links: [
      { label: "Company Website", href: "https://www.harbingermotors.com" }
    ]
  },
  {
    slug: "harbinger-powertrain",
    title: "Harbinger Motors — Powertrain Engineering Intern",
    img: "assets/p1.jpg",
    summary: "Developed and validated electric drive unit components for next-generation medium-duty EVs.",
    details: `
      • Performed non-linear static FEA in HyperMesh to optimize powertrain structures for weight and cost.<br>
      • Supported thermal and mechanical testing of drive units, using instrumentation to capture endurance data.<br>
      • Collaborated cross-functionally with suppliers to review manufacturing feasibility and tolerance analysis.<br>
      • Simulation results directly influenced production-intent design decisions.
    `,
    links: [
      { label: "Company Website", href: "https://www.harbingermotors.com" }
    ]
  },
  {
    slug: "raytheon",
    title: "Raytheon Technologies — Mechanical Design Co-op",
    img: "assets/p2.jpg",
    summary: "Supported mechanical design and FEA validation of defense-grade thermal and structural systems.",
    details: `
      • Modeled and analyzed complex assemblies for thermal endurance and vibration performance.<br>
      • Used GD&T to ensure compliance with aerospace manufacturing standards.<br>
      • Assisted in prototype testing and documentation under AS9100 procedures.<br>
      • Presented mechanical design improvements to senior engineering management.
    `,
    links: [
      { label: "Company Website", href: "https://www.rtx.com" }
    ]
  },
  {
    slug: "bmw",
    title: "BMW Group — Product Engineering Intern",
    img: "assets/p3.jpg",
    summary: "Implemented additive manufacturing tools into the vehicle assembly line process.",
    details: `
      • Designed and validated 3D printed assembly tools to improve ergonomics and reduce build time.<br>
      • Performed FEA and tolerance stack-up analysis to verify production durability.<br>
      • Coordinated supplier feedback sessions and integrated feedback into design revisions.<br>
      • Project resulted in measurable time savings per cycle on the assembly line.
    `,
    links: [
      { label: "Company Website", href: "https://www.bmwgroup.com" }
    ]
  },
  {
    slug: "swap",
    title: "Swap Robotics — Mechanical Engineering Intern",
    img: "assets/p4.jpg",
    summary: "Contributed to mechanical design and testing for autonomous electric mowers and snow-removal robots.",
    details: `
      • Designed drivetrain and steering subassemblies for modular robotic platforms.<br>
      • Conducted FEA for load-bearing components subjected to outdoor duty cycles.<br>
      • Performed tolerance stack-ups and GD&T drawings for machined parts.<br>
      • Supported system-level integration and functional testing.
    `,
    links: [
      { label: "Company Website", href: "https://www.swaprobotics.com" }
    ]
  }
];

// Fake data — replace with your real projects
const PROJECTS = [
  {
    id: "msa",
    title: "Maritime Surveillance Aircraft",
    img: "assets/p1.jpg",
    tags: ["concept", "systems", "cad"],
    summary:
      "Concept study and structural layout for a maritime surveillance platform.",
    details:
      "Defined mission requirements, performed initial weight estimation, and developed fuselage frames and payload bay hardpoints. Completed aero/propulsion trades and maintenance access considerations.",
    links: ["#", "#"],
  },
  {
    id: "breakerbot",
    title: "BreakerBot",
    img: "assets/p2.jpg",
    tags: ["robotics", "manufacturing"],
    summary:
      "Compact, serviceable combat robot focusing on drivetrain reliability and quick-change modules.",
    details:
      "Designed modular armor panels, integrated brushless drivetrain with overload protection, and validated gear train with FEA and benchtop torque testing.",
    links: ["#", "#"],
  },
  {
    id: "gearbox",
    title: "Planetary Gearbox",
    img: "assets/p3.jpg",
    tags: ["cad", "fea"],
    summary:
      "Compact planetary set optimized for mass and stiffness using simulation-driven design.",
    details:
      "Performed contact and bending stress checks vs. AGMA, ran modal analysis on carrier to prevent mesh-induced resonance, and validated with dye-penetrant inspection.",
    links: ["#", "#"],
  },
  {
    id: "truss",
    title: "Truss Analysis & Optimization",
    img: "assets/p4.jpg",
    tags: ["structures", "optimization"],
    summary:
      "Parametric truss optimizer with buckling and deflection constraints.",
    details:
      "Implemented penalty method to enforce Euler buckling margins, with sensitivity-based member sizing and manufacturing grouping constraints.",
    links: ["#", "#"],
  },
  {
    id: "pneumatic-brake",
    title: "Pneumatic Brake Module",
    img: "assets/p5.jpg",
    tags: ["mechatronics", "safety"],
    summary:
      "Fail-safe pneumatic brake module with diagnostic telemetry and overpressure protection.",
    details:
      "Sized valves and reservoir per duty cycle, implemented leak-down detection, and added redundant relief per ISO 4414 guidance.",
    links: ["#", "#"],
  },
  {
    id: "mode-converter",
    title: "Microbend Mode Converter",
    img: "assets/p6.jpg",
    tags: ["photonics", "test"],
    summary:
      "Fiber microbend mode converter for lab validation and low-cost manufacturing.",
    details:
      "Built adjustable microbend fixture with sub-50 µm repeatability, wrote Python scripts for mode purity quantification, and documented process for transfer to production.",
    links: ["#", "#"],
  },
];

// Routing
const routes = {
  portfolio: renderPortfolio,
  work: renderWork,
  resume: renderResume,
  about: renderAbout,
};

function currentRoute() {
  const clean = (location.hash || "#/portfolio").replace(/^#\/?/, "");
  return clean || "portfolio";
}

function splitRoute() {
  // returns { base, parts } e.g. "work/bmw" -> { base:"work", parts:["work","bmw"] }
  const raw = currentRoute();
  const parts = raw.split("/").filter(Boolean);
  return { base: parts[0] || "portfolio", parts };
}

function setActiveNav() {
  const curr = currentRoute();
  document.querySelectorAll("[data-route]").forEach((a) => {
    const r = a.getAttribute("href").replace(/^#\/?/, "").toLowerCase();
    if (r === currentRoute()) a.classList.add("active");
    else a.classList.remove("active");
  });
}

function render() {
  setActiveNav();
  const { base, parts } = splitRoute();

  // dynamic detail: #/work/<slug>
  if (base === "work" && parts.length === 2) {
    app.innerHTML = renderWorkDetail(parts[1]); // parts[1] is the slug
    window.scrollTo(0,0);
    bindProjectClicks(); // safe no-op here
    return;
  }

  const view = routes[base] || renderPortfolio;
  app.innerHTML = view();
  bindProjectClicks();
  window.scrollTo(0,0);
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);

// Views
function pageTitle(title, subtitle="") {
  return `
    <div class="page-title">
      <h1>${title}</h1>
      ${subtitle ? `<p>${subtitle}</p>` : ""}
    </div>
  `;
}

function renderPortfolio() {
  const cards = PROJECTS.map(cardHTML).join("");
  return `
    ${pageTitle("Portfolio")}
    <div class="grid">${cards}</div>
  `;
}

function renderWork() {
  const cards = WORK_ITEMS.map(w => `
    <article class="card">
      <a href="#/work/${w.slug}">
        <div class="card-media"><img src="${w.img}" alt="${w.title}"></div>
        <div class="card-body">
          <h3>${w.title}</h3>
          <p>${w.summary}</p>
        </div>
      </a>
    </article>
  `).join("");

  return `
    ${pageTitle("Work Experience","Selected roles and projects")}
    <div class="grid" style="margin-top:4px">${cards}</div>
  `;
}

function renderWorkDetail(slug) {
  const item = WORK_ITEMS.find(w => w.slug === slug);
  if (!item) {
    return `
      ${pageTitle("Work Experience")}
      <p class="prose">Sorry, that work item was not found.</p>
      <p><a class="pill" href="#/work">Back to Work Experience</a></p>
    `;
  }

  const links = (item.links || []).map(l => `
    <a class="pill" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>
  `).join("");

  const crumb = `<p class="prose" style="margin:8px 0 0">
  <a href="#/work">Work</a> / ${item.title}
  </p>`;
  
  return `
    ${pageTitle(item.title)}
    ${crumb}
    <div class="grid" style="grid-template-columns: 1fr; gap:24px">
      <div class="card">
        <div class="card-media" style="aspect-ratio:16/9">
          <img src="${item.img}" alt="${item.title}">
        </div>
      </div>
      <div class="prose">
        <p>${item.details}</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:12px">
          ${links}
          <a class="pill" href="#/work">← Back to Work</a>
        </div>
      </div>
    </div>
  `;
}

function renderResume() {
  return `
    ${pageTitle("Resume","Download or view the PDF below")}
    <div class="prose">
      <p><a class="pill" href="assets/resume.pdf" target="_blank" rel="noopener">Open Resume (PDF)</a></p>
    </div>
    <div style="margin-top:16px; border:1px solid var(--line); border-radius:12px; overflow:hidden; background:#fff; width:100%; max-width:100%">
      <object data="assets/resume.pdf" type="application/pdf" width="100%" height="1120px" style="display:block; width:100%; max-width:100%;">
        <p style="padding:16px">Your browser can't display embedded PDFs.
          <a href="assets/resume.pdf" target="_blank" rel="noopener">Click here to download.</a>
        </p>
      </object>
    </div>
  `;
}

function renderAbout() {
  return `
    ${pageTitle("About")}
    <div class="grid" style="
      grid-template-columns: 1.5fr 2fr;
      align-items: start;
      gap: 32px;
    ">
      <div class="card" style="align-self: start;">
        <div class="card-media" style="aspect-ratio:1/1;">
          <img src="assets/portrait.jpg" alt="Portrait of Nathan">
        </div>
      </div>
      <div class="prose">
        <h2 style="margin-top:0">Hi, I’m Nathan.</h2>
        <p>I’m a Mechanical Engineering student who builds mechanical and mechatronic systems—vehicle dynamics, powertrain, test rigs, and simulation-driven design.</p>
        <p>Experience includes Baja SAE, implementing 3D printing on the assembly line at BMW, and powertrain engineering at Harbinger Motors. I enjoy minimal, serviceable designs and validating ideas quickly through bench testing, instrumentation, and FEA.</p>

        <div style="display:flex;gap:24px;flex-wrap:wrap;margin-top:16px">
          <a class="pill" href="assets/resume.pdf" target="_blank" rel="noopener">Resume (PDF)</a>
          <a class="pill" href="https://www.linkedin.com/in/nathanhon/" target="_blank" rel="noopener">LinkedIn</a>
          <a class="pill" href="mailto:nthon@uwaterloo.ca">Email me</a>
        </div>
      </div>
    </div>
  `;
}

function cardHTML(p) {
  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
  return `
    <article class="card" data-project-id="${p.id}">
      <div class="card-media"><img src="${p.img}" alt="${p.title}"></div>
      <div class="card-body">
        <div class="tags">${tags}</div>
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
      </div>
    </article>
  `;
}

// Modal controls
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalImg = document.getElementById("modal-img");
const modalText = document.getElementById("modal-text");
const modalLink1 = document.getElementById("modal-link-1");
const modalLink2 = document.getElementById("modal-link-2");

function bindProjectClicks() {
  document.querySelectorAll("[data-project-id]").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-project-id");
      const p = PROJECTS.find(x => x.id === id);
      if (!p) return;
      modalTitle.textContent = p.title;
      modalImg.src = p.img;
      modalText.textContent = p.details;
      modalLink1.href = p.links[0] || "#";
      modalLink2.href = p.links[1] || "#";
      modal.classList.remove("hidden");
      modal.setAttribute("aria-hidden", "false");
    });
  });
}

modal.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close") || e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
function closeModal(){
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}
