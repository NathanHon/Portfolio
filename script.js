// Simple path router + content rendering (no frameworks)
const app = document.getElementById("app");
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
function asset(p) {
  if (!p) return "";
  return p.startsWith("/") ? p : "/" + p.replace(/^\/+/, "");
}

// ----------------------- DATA -----------------------

const WORK_ITEMS = [
  {
    slug: "harbinger-product",
    title: "Harbinger Motors — Product Engineering Intern",
    img: "assets/harbinger1.jpg",
    summary: "Supported product development and validation of electric powertrain subassemblies.",
    details: `
      During my second internship at Harbinger Motors, I contributed to the development and optimization of electric powertrain components through a combination of simulation, mechanical design, and failure analysis. Using HyperMesh, I conducted structural simulations to optimize component geometry, achieving a 25% reduction in weight while also driving down manufacturing costs. I independently led the redesign of the forging and machining process for the park lock hardware, simplifying production steps and improving overall manufacturability without compromising performance. In parallel, I investigated a stator creep–induced rotor rub failure mode, performing root-cause analysis and implementing interim containment measures for existing drive units while designing mechanical countermeasures to prevent recurrence in future builds. This experience strengthened my ability to merge simulation-driven design with practical manufacturing and validation insights in an EV powertrain environment.
    `,
    links: [{ label: "Company Website", href: "https://www.harbingermotors.com" }]
  },
  {
    slug: "harbinger-powertrain",
    title: "Harbinger Motors — Powertrain Engineering Intern",
    img: "assets/harbinger2.jpg",
    summary: "Developed and validated electric drive unit components for next-generation medium-duty EVs.",
    details: `
      During my internship at Harbinger Motors, I focused on testing and validation of electric drive unit (EDU) and park lock systems to enhance durability, reliability, and NVH performance. I performed ratchet, cyclic, and high-load testing on EV park lock systems to identify mechanical failure modes under simulated grade-load conditions. To improve data accuracy and repeatability, I redesigned key test rig components in CATIA, optimizing fixturing and load paths. This redesign enabled more consistent results that revealed fracture-prone geometries, ultimately driving improvements in heat treatment processes, component weight, and dimensional tolerances of the park lock assembly. In parallel, I conducted a modal analysis of the EDU housing to pinpoint resonance frequencies and structural regions vulnerable to vibration-induced fatigue or noise amplification. Additionally, I performed 5 kV HiPot insulation resistance tests on stators within a thermal chamber to confirm electrical integrity exceeding 250 MΩ at 220 °C, validating the effectiveness of the varnish layering process and bolt preload strategy. Through this experience, I deepened my understanding of mechanical testing, structural dynamics, and insulation system design in high-voltage EV powertrain applications.
    `,
    links: [{ label: "Company Website", href: "https://www.harbingermotors.com" }]
  },
  {
    slug: "raytheon",
    title: "Raytheon Technologies — Mechanical Design Co-op",
    img: "assets/raytheon.jpg",
    summary: "Supported mechanical design and FEA validation of defense-grade thermal and structural systems.",
    details: `
      During my internship at Raytheon Technologies, I worked on advancing manufacturing process automation and thermal system optimization to improve production efficiency and reliability in aerospace component manufacturing. I conducted transient thermal simulations to optimize the heating and cooling profiles of a new vacuum lamination process, improving epoxy cure reliability and reducing production time by 65%. To enhance process traceability, I developed an Ignition-based dashboard for centralized monitoring of real-time oven data, giving technicians and operators immediate visibility into equipment performance and enabling faster defect tracking and higher equipment utilization. Additionally, I led the integration of an automated torque machine with built-in torque sensing and vision-based inspection into the assembly line, configuring torque parameters, defining pass/fail limits, and performing acceptance testing to verify compliance with engineering specifications. I also authored standard operating procedures (SOPs) and trained operators, achieving a 40% reduction in assembly cycle time through automation. This role strengthened my skills in thermal analysis, controls integration, and process automation, bridging simulation and manufacturing to deliver tangible production improvements.
    `,
    links: [{ label: "Company Website", href: "https://www.rtx.com" }]
  },
  {
    slug: "bmw",
    title: "BMW Group — Product Engineering Intern",
    img: "assets/bmw.jpg",
    summary: "Implemented additive manufacturing tools into the vehicle assembly line process.",
    details: `
      During my time at BMW Group, I led initiatives to integrate additive manufacturing and design automation into the vehicle assembly process, driving measurable cost and efficiency improvements. I designed and validated over 45 functional models and 3D printed more than 250 components used to address assembly line issues, reducing downtime and saving the plant hundreds of thousands of dollars annually. Recognizing the potential of rapid prototyping, I spearheaded the adoption of additive manufacturing solutions, preparing and presenting a business case to the Vice President of Assembly that successfully justified the formation of a new dedicated design department focused on 3D-printed tooling and fixtures. In parallel, I collaborated with cross-functional engineering and IT teams to pioneer a centralized CAD sharing program, establishing the digital infrastructure needed for seamless access and version control of design files across the plant. This experience strengthened my skills in design for manufacturability, additive engineering, and cross-departmental process integration, while deepening my understanding of large-scale automotive production systems.
    `,
    links: [{ label: "Company Website", href: "https://www.bmwgroup.com" }]
  },
  {
    slug: "swap",
    title: "Swap Robotics — Mechanical Engineering Intern",
    img: "assets/swapRobotics.jpg",
    summary: "Contributed to mechanical design and testing for autonomous electric mowers and snow-removal robots.",
    details: `
      At Swap Robotics, I contributed to the design, assembly, and validation of autonomous robotic systems, helping the company scale production and improve reliability across its growing fleet. I developed a detailed standard operating procedure (SOP) for robot assembly that significantly reduced onboarding and build times, enabling faster integration of new technicians and smoother production flow. Beyond documentation, I constructed and serviced robotic units, directly supporting efforts that doubled the number of operational robots in the field while maintaining uptime for existing systems. To enhance performance and durability, I designed and executed rigorous testing procedures that simulated real-world operating conditions, achieving a threefold increase in run times and improving system robustness. This experience deepened my practical understanding of robotic assembly, testing, and reliability engineering, while reinforcing the importance of scalable processes in fast-growing hardware startups.
    `,
    links: [{ label: "Company Website", href: "https://www.swaprobotics.com" }]
  }
];

const PROJECTS = [
  {
    id: "suspension-2025",
    title: "Suspension Design (2025)",
    img: "assets/Picture30.jpg",
    imgs: ["assets/Picture30.jpg","assets/Picture6.jpg","assets/Picture7.jpg","assets/Picture8.jpg"],
    tags: ["vehicle dynamics", "CAD", "FEA"],
    summary: "Double-wishbone geometry with KPI/Scrub/Roll center targets for a student racecar.",
    details:
      "Set kinematic targets, performed camber gain/roll center migration studies; packaged uprights and steering; verified control arms with FEA and generated GD&T drawings for fabrication.",
    //links: ["#", "#"],
  },
  {
    id: "carbon-composite-research",
    title: "Carbon Fiber Composite Research",
    img: "assets/Picture3.jpg",
    imgs: ["assets/Picture3.jpg","assets/Picture4.jpg","assets/Picture5.jpg","assets/Picture48.jpg"],
    tags: ["materials", "testing", "manufacturing"],
    summary: "Experimental study on carbon fiber layups, cure cycles, and failure modes.",
    details:
      "Characterized laminate stiffness and strength across layup schedules; prepared coupons and ran tensile/3-point bend tests; analyzed failure surfaces and optimized cure parameters for repeatability.",
    //links: ["#", "#"],
  },
  {
    id: "front-suspension-2024",
    title: "Front Suspension Design (2024)",
    img: "assets/Picture30.jpg",
    imgs: ["assets/Picture30.jpg","assets/Picture6.jpg","assets/Picture7.jpg","assets/Picture8.jpg"],
    tags: ["vehicle dynamics", "CAD", "FEA"],
    summary: "Double-wishbone geometry with KPI/Scrub/Roll center targets for a student racecar.",
    details:
      "Set kinematic targets, performed camber gain/roll center migration studies; packaged uprights and steering; verified control arms with FEA and generated GD&T drawings for fabrication.",
    //links: ["#", "#"],
  },
  {
    id: "composite-aerobody",
    title: "Composite Aerobody Manufacturing",
    img: "assets/Picture24.jpg",
    imgs: ["assets/Picture24.jpg","assets/Picture0.jpg","assets/Picture2.jpg","assets/Picture1.jpg","assets/Picture39.jpg"],
    tags: ["composites", "tooling", "process"],
    summary: "Designed molds and built a lightweight aerodynamic body using wet layup/vacuum bagging.",
    details:
      "Created split molds with draft and flanges; selected layup schedule for stiffness/weight; executed vacuum bagging, trim, and bonding; documented process for reproducibility.",
    //links: ["#", "#"],
  },
  {
    id: "powertrain-2023",
    title: "Powertrain Design (2023)",
    img: "assets/Picture31.jpg",
    imgs: ["assets/Picture31.jpg","assets/Picture40.jpg","assets/Picture9.jpg","assets/Picture11.jpg","assets/Picture12.jpg"],
    tags: ["drivetrain", "gearing", "analysis"],
    summary: "Concept-to-detail design of a compact drivetrain with simulation-driven gearing.",
    details:
      "Performed ratio/torque trade studies; modeled shafts, bearings, and housings; ran contact and bending checks; created tolerance stacks and manufacturing drawings.",
    //links: ["#", "#"],
  },
    {
    id: "midnightsun-susp",
    title: "Midnight Sun Mechanical Design",
    img: "assets/Picture29.jpg",
    imgs: ["assets/Picture29.jpg"],
    tags: ["composites", "tooling", "process"],
    summary: "Designed molds and built a lightweight aerodynamic body using wet layup/vacuum bagging.",
    details:
      "Created split molds with draft and flanges; selected layup schedule for stiffness/weight; executed vacuum bagging, trim, and bonding; documented process for reproducibility.",
    //links: ["#", "#"],
  },
  {
    id: "autonomous-chess-bot",
    title: "Autonomous Chess Bot",
    img: "assets/Picture13.jpg",
    imgs: ["assets/Picture13.jpg","assets/Picture14.jpg","assets/Picture15.jpg"],
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
    imgs: ["assets/Picture17.jpg","assets/Picture16.jpg","assets/Picture18.jpg"],
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
    imgs: ["assets/Picture20.jpg","assets/Picture19.jpg","assets/Picture21.jpg"],
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
    imgs: ["assets/Picture24.jpg","assets/Picture22.jpg","assets/Picture22.jpg","assets/Picture23.jpg","assets/Picture46.jpg"],
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
    imgs: ["assets/Picture27.jpg","assets/Picture28.jpg","assets/Picture26.jpg"],
    tags: ["biomed", "mechanisms", "electronics"],
    summary: "Compact reader for disposable microfluidic cartridges with optical sensing.",
    details:
      "Designed latching/registration features; integrated LED/photodiode sensing; developed firmware for acquisition; validated repeatability and ease of service.",
    //links: ["#", "#"],
  },
  {
    id: "bmw-air-intake",
    title: "BMW Air Intake",
    img: "assets/Picture34.jpg",
    imgs: ["assets/Picture34.jpg","assets/Picture32.jpg","assets/Picture33.jpg"],
    tags: ["manufacturing", "ergonomics", "additive"],
    summary: "Additively manufactured intake tooling and components for assembly improvements.",
    details:
      "Modeled intake geometry and fixtures; evaluated print orientation and materials; verified fit and durability; documented process changes for the line.",
    //links: ["#", "#"],
  },
  {
    id: "bulkhead-design",
    title: "Bulkhead Design & Layup",
    img: "assets/Picture43.jpg",
    imgs: ["assets/Picture43.jpg","assets/Picture37.jpg"],
    tags: ["structures", "composites", "FEA"],
    summary: "Structural bulkhead with composite layup tailored for stiffness and load paths.",
    details:
      "Ran panel/buckling checks; tuned ply orientations; designed cores and hardpoints; executed layup and cure; inspected and trimmed to spec.",
    //links: ["#", "#"],
  },
  {
    id: "foldable-skateboard",
    title: "Foldable Skateboard",
    img: "assets/Picture52.jpg",
    imgs: ["assets/Picture52.jpg"],
    tags: ["mechanisms", "linkages", "cad"],
    summary: "Portable deck with a locking hinge and quick-release trucks.",
    details:
      "Designed hinge/lock geometry, selected materials for stiffness vs weight, validated safety factors, and produced fabrication drawings.",
    //links: ["#", "#"],
  },
  {
    id: "mouse-surface-modeling",
    title: "Computer Mouse Surface Modeling",
    img: "assets/Picture49.jpg",
    imgs: ["assets/Picture49.jpg"],
    tags: ["industrial design", "ergonomics", "surfacing"],
    summary: "Ergonomic mouse shell with continuous curvature and manufacturable splits.",
    details:
      "Captured hand dimensions, created surface patches with G2 continuity, split for tooling, and rendered CMF variants.",
    //links: ["#", "#"],
  },
  {
    id: "cessna-plane",
    title: "Cessna 172 Plane",
    img: "assets/Picture50.jpg",
    imgs: ["assets/Picture50.jpg"],
    tags: ["aerospace", "cad", "structures"],
    summary: "Scaled airframe model for structural layout and weight estimation.",
    details:
      "Defined primary structure, estimated mass properties, created fuselage frames and spar/rib layout; documented assembly strategy.",
    //links: ["#", "#"],
  },
  {
    id: "lego-car",
    title: "Lego Car Design",
    img: "assets/Picture51.jpg",
    imgs: ["assets/Picture51.jpg"],
    tags: ["concept", "mechanisms", "fun"],
    summary: "Functional LEGO car with steering and gearing demonstrations.",
    details:
      "Explored gear ratios and Ackermann steering; built and tested modules; shared a small build guide for others.",
    //links: ["#", "#"],
  },
];

// ----------------------- ROUTER -----------------------

const routes = {
  portfolio: renderPortfolio,
  work: renderWork,
  resume: renderResume,
  about: renderAbout
};

function currentRoute() {
  // Path-based routing from the site root (user site)
  const path = location.pathname.replace(/^\/+|\/+$/g, ""); // trim slashes
  const clean = path;
  return clean || "portfolio"; // default page at root "/"
}

function splitRoute() {
  const raw = currentRoute();
  const parts = raw.split("/").filter(Boolean);
  return { base: parts[0] || "portfolio", parts };
}

function setActiveNav() {
  const curr = currentRoute();
  document.querySelectorAll("[data-route]").forEach((a) => {
    const target = a.getAttribute("href").replace(/^\/+|\/+$/g, "") || "portfolio";
    if (curr === target || curr.startsWith(target + "/")) a.classList.add("active");
    else a.classList.remove("active");
  });
}

function render() {
  setActiveNav();
  const { base, parts } = splitRoute();

  if (base === "resume") app.classList.add("wide");
  else app.classList.remove("wide");

  // dynamic detail: /work/<slug>
  if (base === "work" && parts.length === 2) {
    app.innerHTML = renderWork(parts[1]); // ← use unified function
    window.scrollTo(0,0);
    return;
  }
  if (base === "work") {
    app.innerHTML = renderWork();           // list
    window.scrollTo(0,0);
    return;
  }
  
  const view = routes[base] || renderPortfolio;
  app.innerHTML = view();
  window.scrollTo(0, 0);
}

window.addEventListener("popstate", render);
window.addEventListener("load", render);

// Intercept internal links so navigation uses History API (no reload)
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;

  // Convert any leftover hash links like "#/work/slug"
  if (a.getAttribute("href")?.startsWith("#/")) {
    e.preventDefault();
    const clean = a.getAttribute("href").replace(/^#\//, "/");
    history.pushState({}, "", clean);
    render();
    return;
  }

  // Root-relative internal links: /, /work, /work/slug, /about, /resume
  if (a.origin === location.origin && a.pathname.startsWith("/")) {
    const internal = /^\/(work(\/[^\/]+)?|about|resume|portfolio)?\/?$/.test(a.pathname);
    if (internal && !a.target) {
      e.preventDefault();
      history.pushState({}, "", a.pathname);
      render();
    }
  }
});

// ----------------------- VIEWS -----------------------

function pageTitle(title, subtitle = "") {
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

function renderWork(slug) {
  // DETAIL VIEW
  if (slug) {
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
        <div class="card" style="max-width:100%; margin-bottom: 4px;">
          <div class="card-media" style="aspect-ratio:16/9; background:#fff; display:flex; align-items:center; justify-content:center;">
            <img src="${asset(item.img)}" alt="${item.title}" style="width:100%; height:100%; object-fit:contain; background:#fff;">
          </div>
        </div>
        <div class="prose">
          <p>${item.details}</p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:12px">
            ${links}
            <a class="pill" href="/work">← Back to Work</a>
          </div>
        </div>
      </div>
    `;
  }

  // LIST VIEW
  const cards = WORK_ITEMS.map(w => `
    <article class="card">
      <a href="/work/${w.slug}">
        <div class="card-media">
          <img src="${asset(w.img)}" alt="${w.title}">
        </div>
        <div class="card-body">
          <h3>${w.title}</h3>
          <p>${w.summary}</p>
        </div>
      </a>
    </article>
  `).join("");

  return `
    ${pageTitle("Work Experience","Previous roles and projects")}
    <div class="grid work-list" style="margin-top:4px">${cards}</div>
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
  const tags = (p.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");
  return `
    <article class="card" data-project-id="${p.id}">
     <div class="card-media"><img src="${asset(p.img)}" alt="${p.title}"></div>
      <div class="card-body">
        <div class="tags">${tags}</div>
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
      </div>
    </article>
  `;
}

// ----------------------- MODAL (robust) -----------------------

const modal       = document.getElementById("modal");
const modalTitle  = document.getElementById("modal-title");
const modalImg    = document.getElementById("modal-img");
const modalText   = document.getElementById("modal-text");
const modalLink1  = document.getElementById("modal-link-1");
const modalLink2  = document.getElementById("modal-link-2");
const modalPrev   = document.getElementById("modal-prev");
const modalNext   = document.getElementById("modal-next");
const modalDots   = document.getElementById("modal-dots");

let modalGallery = { imgs: [], index: 0 };

function safeHref(x) {
  return (typeof x === "string" && x.trim() !== "") ? x : "#";
}

function renderDots() {
  if (!modalDots) return;
  modalDots.innerHTML = "";
  modalGallery.imgs.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === modalGallery.index ? " active" : "");
    d.addEventListener("click", () => showSlide(i));
    modalDots.appendChild(d);
  });
}

function showSlide(i) {
  if (!modalGallery.imgs.length || !modalImg) return;
  if (i < 0) i = modalGallery.imgs.length - 1;
  if (i >= modalGallery.imgs.length) i = 0;
  modalGallery.index = i;
  modalImg.src = asset(modalGallery.imgs[i]);
  renderDots();
}

function openProjectModal(p) {
  if (!modal) return;

  // Title / text
  if (modalTitle) modalTitle.textContent = p?.title || "";
  if (modalText)  modalText.textContent  = p?.details || "";

  // Links (support array of strings OR array of {href})
  const l0 = Array.isArray(p?.links) ? p.links[0] : undefined;
  const l1 = Array.isArray(p?.links) ? p.links[1] : undefined;
  const href0 = typeof l0 === "string" ? l0 : (l0?.href || "#");
  const href1 = typeof l1 === "string" ? l1 : (l1?.href || "#");
  if (modalLink1) modalLink1.href = safeHref(href0);
  if (modalLink2) modalLink2.href = safeHref(href1);

  // Images (fallback to single cover)
  const imgs = (Array.isArray(p?.imgs) && p.imgs.length) ? p.imgs.map(asset)
             : (p?.img ? [asset(p.img)] : []);
  modalGallery = { imgs, index: 0 };
  showSlide(0);

  // Show modal
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(){
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

// Prev / Next buttons
modalPrev?.addEventListener("click", () => showSlide(modalGallery.index - 1));
modalNext?.addEventListener("click", () => showSlide(modalGallery.index + 1));

// Keyboard
document.addEventListener("keydown", (e) => {
  if (!modal || modal.getAttribute("aria-hidden") === "true") return;
  if (e.key === "ArrowLeft")  showSlide(modalGallery.index - 1);
  if (e.key === "ArrowRight") showSlide(modalGallery.index + 1);
  if (e.key === "Escape")     closeModal();
});

// Close when clicking backdrop or Close button
modal?.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close") || e.target === modal) closeModal();
});

// Open modal via event delegation (works after every render)
document.addEventListener("click", (e) => {
  const card = e.target.closest("[data-project-id]");
  if (card) {
    // Only open modal on portfolio cards (not work links)
    const id = card.getAttribute("data-project-id");
    const p  = PROJECTS.find((x) => x.id === id);
    if (p) openProjectModal(p);
  }
});

// ----------------------- END -----------------------
