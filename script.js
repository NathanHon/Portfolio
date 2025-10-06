// Simple hash router + content rendering (no frameworks)
const app = document.getElementById("app");
const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

// Work Experience items
const WORK_ITEMS = [
  {
    slug: "harbinger-product",
    title: "Harbinger Motors — Product Engineering Intern",
    img: "assets/harbinger1.jpg",
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
    img: "assets/harbinger2.jpg",
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
    img: "assets/raytheon.jpg",
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
    img: "assets/bmw.jpg",
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
    img: "assets/swapRobotics.jpg",
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

const PROJECTS = [
  {
    id: "carbon-composite-research",
    title: "Carbon Fiber Composite Research",
    img: "assets/Picture3.jpg",
    imgs: ["assets/Picture4.jpg","assets/Picture5.jpg"],
    tags: ["materials", "testing", "manufacturing"],
    summary: "Experimental study on carbon fiber layups, cure cycles, and failure modes.",
    details:
      "Characterized laminate stiffness and strength across layup schedules; prepared coupons and ran tensile/3-point bend tests; analyzed failure surfaces and optimized cure parameters for repeatability.",
    //links: ["#", "#"],
  },
  {
    id: "front-suspension-2024",
    title: "Front Suspension Design (2024)",
    img: "assets/Picture6.jpg",
    imgs: ["assets/Picture7.jpg","assets/Picture8.jpg"],
    tags: ["vehicle dynamics", "CAD", "FEA"],
    summary: "Double-wishbone geometry with KPI/Scrub/Roll center targets for a student racecar.",
    details:
      "Set kinematic targets, performed camber gain/roll center migration studies; packaged uprights and steering; verified control arms with FEA and generated GD&T drawings for fabrication.",
    //links: ["#", "#"],
  },
  {
    id: "composite-aerobody",
    title: "Composite Aerobody Manufacturing",
    img: "assets/p3.jpg",
    imgs: ["assets/p3.jpg","assets/p4.jpg"],
    tags: ["composites", "tooling", "process"],
    summary: "Designed molds and built a lightweight aerodynamic body using wet layup/vacuum bagging.",
    details:
      "Created split molds with draft and flanges; selected layup schedule for stiffness/weight; executed vacuum bagging, trim, and bonding; documented process for reproducibility.",
    //links: ["#", "#"],
  },
  {
    id: "powertrain-2023",
    title: "Powertrain Design (2023)",
    img: "assets/Picture9.jpg",
    imgs: ["assets/Picture11.jpg","assets/Picture12.jpg"],
    tags: ["drivetrain", "gearing", "analysis"],
    summary: "Concept-to-detail design of a compact drivetrain with simulation-driven gearing.",
    details:
      "Performed ratio/torque trade studies; modeled shafts, bearings, and housings; ran contact and bending checks; created tolerance stacks and manufacturing drawings.",
    //links: ["#", "#"],
  },
  {
    id: "autonomous-chess-bot",
    title: "Autonomous Chess Bot",
    img: "assets/Picture13.jpg",
    imgs: ["assets/Picture14.jpg","assets/Picture15.jpg"],
    tags: ["mechatronics", "vision", "controls"],
    summary: "Robot identifies the board and moves pieces with a Cartesian gantry and gripper.",
    details:
      "Implemented camera calibration and piece detection; planned legal moves; controlled stepper axes and end-effector; added homing and collision detection for robustness.",
    //links: ["#", "#"],
  },
  {
    id: "rolex-submariner-model",
    title: "Rolex Submariner Model",
    img: "assets/Picture17.jpg",
    imgs: ["assets/Picture16.jpg","assets/Picture18.jpg"],
    tags: ["surface modeling", "CAD", "render"],
    summary: "High-fidelity surface model with attention to curvature continuity and detailing.",
    details:
      "Used parametric and freeform features to match references; controlled G2 transitions; created exploded views and renders highlighting crown, bezel, and bracelet links.",
    //links: ["#", "#"],
  },
  {
    id: "hvac-design",
    title: "HVAC Design",
    img: "assets/Picture20.jpg",
    imgs: ["assets/Picture19.jpg","assets/Picture21.jpg"],
    tags: ["thermals", "ducting", "simulation"],
    summary: "Sized ducting and components for airflow, pressure drop, and acoustic targets.",
    details:
      "Calculated loads and flow rates; selected fan/filters; analyzed pressure losses and noise; produced layout drawings and BOM for build.",
    //links: ["#", "#"],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    img: "assets/Picture24.jpg",
    imgs: ["assets/Picture22.jpg","assets/Picture23.jpg"],
    tags: ["python", "classification", "cv"],
    summary: "Prototyped models to classify images and signals supporting engineering tests.",
    details:
      "Preprocessed datasets, trained baseline classifiers, evaluated ROC/PR metrics, and deployed lightweight inference scripts for lab use.",
    //links: ["#", "#"],
  },
  {
    id: "microfluid-cartridge-reader",
    title: "Microfluid Cartridge Reader",
    img: "assets/Picture27.jpg",
    imgs: ["assets/Picture28.jpg","assets/Picture26.jpg"],
    tags: ["biomed", "mechanisms", "electronics"],
    summary: "Compact reader for disposable microfluidic cartridges with optical sensing.",
    details:
      "Designed latching/registration features; integrated LED/photodiode sensing; developed firmware for acquisition; validated repeatability and ease of service.",
    //links: ["#", "#"],
  },
  {
    id: "bmw-air-intake",
    title: "BMW Air Intake",
    img: "assets/p4.jpg",
    imgs: ["assets/p4.jpg","assets/p5.jpg"],
    tags: ["manufacturing", "ergonomics", "additive"],
    summary: "Additively manufactured intake tooling and components for assembly improvements.",
    details:
      "Modeled intake geometry and fixtures; evaluated print orientation and materials; verified fit and durability; documented process changes for the line.",
    //links: ["#", "#"],
  },
  {
    id: "bulkhead-design",
    title: "Bulkhead Design & Layup",
    img: "assets/p5.jpg",
    imgs: ["assets/p5.jpg","assets/p6.jpg"],
    tags: ["structures", "composites", "FEA"],
    summary: "Structural bulkhead with composite layup tailored for stiffness and load paths.",
    details:
      "Ran panel/buckling checks; tuned ply orientations; designed cores and hardpoints; executed layup and cure; inspected and trimmed to spec.",
    //links: ["#", "#"],
  },
  {
    id: "wec",
    title: "Waterloo Engineering Competition",
    img: "assets/p6.jpg",
    imgs: ["assets/p6.jpg","assets/p1.jpg"],
    tags: ["design sprint", "prototype", "team"],
    summary: "Rapid ideation and prototyping under time constraints; delivered a working demo.",
    details:
      "Defined problem scope, sketched concepts, built a proof-of-concept prototype, and presented results with metrics and failure analysis.",
    //links: ["#", "#"],
  },
  {
    id: "foldable-skateboard",
    title: "Foldable Skateboard",
    img: "assets/p1.jpg",
    imgs: ["assets/p1.jpg","assets/p2.jpg"],
    tags: ["mechanisms", "linkages", "cad"],
    summary: "Portable deck with a locking hinge and quick-release trucks.",
    details:
      "Designed hinge/lock geometry, selected materials for stiffness vs weight, validated safety factors, and produced fabrication drawings.",
    //links: ["#", "#"],
  },
  {
    id: "gravity-car",
    title: "Gravity Car",
    img: "assets/p2.jpg",
    imgs: ["assets/p2.jpg","assets/p3.jpg"],
    tags: ["aero", "rolling resistance", "test"],
    summary: "Low-drag gravity racer optimized for mass distribution and wheel alignment.",
    details:
      "Conducted bearing and toe/ camber alignment tests; tuned CG placement; measured run-to-run variance and improved repeatability.",
    //links: ["#", "#"],
  },
  {
    id: "mouse-surface-modeling",
    title: "Computer Mouse Surface Modeling",
    img: "assets/p3.jpg",
    imgs: ["assets/p3.jpg","assets/p4.jpg"],
    tags: ["industrial design", "ergonomics", "surfacing"],
    summary: "Ergonomic mouse shell with continuous curvature and manufacturable splits.",
    details:
      "Captured hand dimensions, created surface patches with G2 continuity, split for tooling, and rendered CMF variants.",
    //links: ["#", "#"],
  },
  {
    id: "cessna-plane",
    title: "Cessna Plane",
    img: "assets/p4.jpg",
    imgs: ["assets/p4.jpg","assets/p5.jpg"],
    tags: ["aerospace", "cad", "structures"],
    summary: "Scaled airframe model for structural layout and weight estimation.",
    details:
      "Defined primary structure, estimated mass properties, created fuselage frames and spar/rib layout; documented assembly strategy.",
    //links: ["#", "#"],
  },
  {
    id: "lego-car",
    title: "Lego Car Design",
    img: "assets/p5.jpg",
    imgs: ["assets/p5.jpg","assets/p6.jpg"],
    tags: ["concept", "mechanisms", "fun"],
    summary: "Functional LEGO car with steering and gearing demonstrations.",
    details:
      "Explored gear ratios and Ackermann steering; built and tested modules; shared a small build guide for others.",
    //links: ["#", "#"],
  },
  {
    id: "pre-engineering",
    title: "Pre-Engineering",
    img: "assets/p6.jpg",
    imgs: ["assets/p6.jpg","assets/p1.jpg"],
    tags: ["foundations", "shop", "projects"],
    summary: "Early projects building fundamentals in CAD, fabrication, and testing.",
    details:
      "Completed small mechanisms and fixtures; learned safe machining; practiced drawing standards and tolerance basics.",
    //links: ["#", "#"],
  },
  {
    id: "nslc",
    title: "NSLC",
    img: "assets/p1.jpg",
    imgs: ["assets/p1.jpg","assets/p2.jpg"],
    tags: ["leadership", "team", "presentation"],
    summary: "Leadership and engineering challenges with cross-disciplinary teams.",
    details:
      "Led brainstorming, divided tasks, coordinated timelines, and presented solutions with data-backed tradeoffs.",
    //links: ["#", "#"],
  },
  {
    id: "java-game-arcade",
    title: "Java Game Arcade",
    img: "assets/p2.jpg",
    imgs: ["assets/p2.jpg","assets/p3.jpg"],
    tags: ["java", "oop", "ui"],
    summary: "Mini-games built in Java demonstrating OOP patterns and simple UIs.",
    details:
      "Implemented game loops, input handling, and scoring; organized code with classes/interfaces; added basic asset loading and menus.",
    //links: ["#", "#"],
  }
];

// Routing
const routes = {
  portfolio: renderPortfolio,
  work: renderWork,
  resume: renderResume,
  about: renderAbout,
};

function currentRoute() {
  // Path-based routing from the site root (user site)
  const path = location.pathname.replace(/^\/+|\/+$/g, ""); // trim leading/trailing slashes
  // With a user site, there's no repo subfolder to strip
  const clean = path; 
  return clean || "portfolio"; // default page at root "/"
}

function splitRoute() {
  // returns { base, parts } e.g. "work/bmw" -> { base:"work", parts:["work","bmw"] }
  const raw = currentRoute();
  const parts = raw.split("/").filter(Boolean);
  return { base: parts[0] || "portfolio", parts };
}

function setActiveNav() {
  const curr = currentRoute();
  document.querySelectorAll("[data-route]").forEach(a => {
    const target = a.getAttribute("href").replace(/^\/+|\/+$/g, "") || "portfolio";
    if (curr === target || curr.startsWith(target + "/")) a.classList.add("active");
    else a.classList.remove("active");
  });
}

function render() {
  setActiveNav();
  const { base, parts } = splitRoute();

  // Toggle full-width container for resume only
  if (base === "resume") app.classList.add("wide");
  else app.classList.remove("wide");

  // dynamic detail: #/work/<slug>
  if (base === "work" && parts.length === 2) {
    app.innerHTML = renderWorkDetail(parts[1]);
    window.scrollTo(0,0);
    bindProjectClicks();
    return;
  }

  const view = routes[base] || renderPortfolio;
  app.innerHTML = view();
  bindProjectClicks();
  window.scrollTo(0,0);
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;

  // Handle old hash links too (just in case any remain)
  if (a.getAttribute("href")?.startsWith("#/")) {
    e.preventDefault();
    const clean = a.getAttribute("href").replace(/^#\//, "/");
    history.pushState({}, "", clean);
    render();
    return;
  }

  // Handle root-relative links like /work, /work/slug, /about, etc.
  if (a.origin === location.origin && a.pathname.startsWith("/")) {
    const internal = /^\/(work(\/[^\/]+)?|about|resume|portfolio)?\/?$/.test(a.pathname);
    if (internal && !a.target) {
      e.preventDefault();
      history.pushState({}, "", a.pathname);
      render();
    }
  }
});

window.addEventListener("popstate", render); // back/forward navigation
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
      <a href="/work/${w.slug}">
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
      <p><a class="pill" href="/work">Back to Work Experience</a></p>
    `;
  }

  const links = (item.links || []).map(l => `
    <a class="pill" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>
  `).join("");
  
  return `
    ${pageTitle(item.title)}
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
    <div class="prose" style="padding:0 16px;">
      <p><a class="pill" href="assets/resume.pdf" target="_blank" rel="noopener">Open Resume (PDF)</a></p>
    </div>

    <div class="resume-card">
      <div class="resume-viewport">
        <object
          data="assets/resume.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
          style="display:block; width:100%;"
        >
          <p style="padding:16px">
            Your browser can't display embedded PDFs.
            <a href="assets/resume.pdf" target="_blank" rel="noopener">Click here to download.</a>
          </p>
        </object>
      </div>
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
        <p>I am a mechanical engineering student with proven experience in product development, powertrain engineering, and manufacturing optimization. Through internships at Harbinger Motors, Raytheon Technologies, and BMW Manufacturing, I have developed expertise in CAD design, FEA simulation, thermal analysis, and process improvement. I excel at identifying failure modes, implementing design solutions, and leading cross-functional teams to deliver measurable results including significant cost savings and cycle time reductions.</p>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:16px">
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

const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");
const modalDots = document.getElementById("modal-dots");

let modalGallery = { imgs: [], index: 0 };

function renderDots() {
  modalDots.innerHTML = "";
  modalGallery.imgs.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === modalGallery.index ? " active" : "");
    d.addEventListener("click", () => showSlide(i));
    modalDots.appendChild(d);
  });
}

function showSlide(i) {
  if (!modalGallery.imgs.length) return;
  if (i < 0) i = modalGallery.imgs.length - 1;       // wrap
  if (i >= modalGallery.imgs.length) i = 0;
  modalGallery.index = i;
  modalImg.src = modalGallery.imgs[i];
  renderDots();
}

// Buttons + keyboard
modalPrev?.addEventListener("click", () => showSlide(modalGallery.index - 1));
modalNext?.addEventListener("click", () => showSlide(modalGallery.index + 1));
document.addEventListener("keydown", (e) => {
  if (modal.getAttribute("aria-hidden") === "true") return;
  if (e.key === "ArrowLeft")  showSlide(modalGallery.index - 1);
  if (e.key === "ArrowRight") showSlide(modalGallery.index + 1);
});


function bindProjectClicks() {
  document.querySelectorAll("[data-project-id]").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-project-id");
      const p = PROJECTS.find(x => x.id === id);
      if (!p) return;
      modalTitle.textContent = p.title;
      modalText.textContent = p.details;
      modalLink1.href = p.links[0] || "#";
      modalLink2.href = p.links[1] || "#";
      // Slideshow images (fallback to single cover)
      const imgs = (p.imgs && p.imgs.length ? p.imgs : [p.img]);
      modalGallery = { imgs, index: 0 };
      showSlide(0);
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
