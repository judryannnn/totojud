"use strict";

/* =========================================================
   CONTENT — edit only this object.
   Any field left as "" or "[___]" (or an empty array) is
   hidden automatically. No placeholder text is ever shown.
   ========================================================= */
const CONTENT = {
  name: "Jud Ryan A. Payo",
  initials: "JR",
  role: "System Analyst",
  program: "BSIS 4B",
  badge: "Available for internship opportunities",
  eyebrow: "Information Systems Student · Silay City",
  hero_lines: ["Analyzing Systems,", "Designing Better", "Workflows."],   // 3rd line shows in gray
  hero_intro: "I'm Jud, a BS Information Systems student focused on understanding complex processes and shaping practical, people-centered digital solutions.",
  photo: "assets/profile.jpg",
  email: "jrpayo.chmsu@gmail.com",
  location: "Silay City, Negros Occidental, Philippines",
  age: "21",

  about_title: "Bridging People, Processes & Information Systems.",
  about_text: "I translate observations into structured ideas—looking at how information moves, where friction exists, and how systems can support better work.",
  principles: [
    { title: "Listen first", text: "Understand users and context before proposing a solution." },
    { title: "Map the process", text: "Make complex workflows visible, clear, and discussable." },
    { title: "Design with purpose", text: "Prioritize useful outcomes over unnecessary complexity." },
    { title: "Improve together", text: "Collaborate, test assumptions, and learn continuously." }
  ],

  project: {
    name: "TCDPEMS",
    title: "Preparedness, organized.",
    text: "TCDPEMS is a capstone project concept intended to help organize disaster preparedness and evacuation information for the Talisay City DRRMO.",
    overview_title: "One operational view for coordinated response.",
    overview_text: "This presentation demonstrates a proposed information architecture only. Live functionality, deployment, and verified agency endorsement are not claimed.",
    facts: [
      { label: "Context", value: "Academic capstone" },
      { label: "Focus", value: "Systems analysis" },
      { label: "Status", value: "" }               // unreadable in the PDF — fill in or leave blank to hide
    ],
    modules: [
      { title: "Real-time Alerts", text: "Centralized event notices and resource updates." },
      { title: "Evacuation Center Mgmt", text: "Track centers, capacity, and current occupancy." },
      { title: "Evacuee Registration", text: "Organize essential household and evacuee records." },
      { title: "Hazard & Location Map", text: "View location context for planning and coordination." },
      { title: "Resource Inventory", text: "Monitor the status and availability of resources." },
      { title: "Reports & Analytics", text: "Prepare structured summaries for decision support." }
    ],
    role_label: "Role & contribution",
    role_title: "Systems analysis and project documentation.",
    role_text: "Contributed to requirements thinking, process mapping, information organization, interface planning, and team coordination within an academic context.",
    resume_text: "Academic capstone concept for disaster preparedness and evacuation management for the Talisay City DRRMO. Responsibilities included analysis, documentation, interface planning, and team coordination.",
    tools: []                                      // e.g. ["Django", "Python", "MySQL", "Figma"] — [] hides the card
  },

  skills_title: "Capabilities built through practice.",
  skills_intro: "A practical mix of productivity, analysis, and collaboration skills. Proficiency labels are self-assessed.",
  skills: [
    { name: "Microsoft Word", level: "Proficient", percent: 88 },
    { name: "Microsoft PowerPoint", level: "Proficient", percent: 86 },
    { name: "Time Management", level: "Advanced", percent: 84 },
    { name: "Analysis & Problem Solving", level: "Advanced", percent: 90 },
    { name: "Communication & Teamwork", level: "Proficient", percent: 87 }
  ],

  education_title: "A foundation in systems thinking.",
  education_text: "My academic path has strengthened my analytical mindset, communication, and interest in technology-enabled public service.",
  education: [                                     // newest first
    { years: "2023 — Present", school: "Carlos Hilado Memorial State University", level: "BS Information Systems" },
    { years: "2021 — 2023", school: "Silay Institute", level: "Senior High School" },
    { years: "2017 — 2021", school: "Brgy. E. Lopez National High School", level: "Junior High School" },
    { years: "2011 — 2017", school: "Dominador Oking Jison Memorial Elementary School", level: "Elementary School" }
  ],

  certificates_title: "Learning, documented.",
  certificates_intro: "Online certificates completed through Coursera and Simplilearn SkillUp. Select a card to view the full certificate.",
  certificates: [                                  // [] hides the section
    { title: "Google UX Design", issuer: "Google · Coursera", date: "Oct 28, 2025", image: "assets/cert-ux-design.jpg" },
    { title: "Google IT Support", issuer: "Google · Coursera", date: "Oct 28, 2025", image: "assets/cert-it-support.jpg" },
    { title: "Google Data-Driven Decision Making", issuer: "Google · Coursera", date: "Oct 26, 2025", image: "assets/cert-data-driven.jpg" },
    { title: "Modernize Infrastructure and Applications with Google Cloud", issuer: "Simplilearn SkillUp", date: "Oct 28, 2025", image: "assets/cert-gc-modernize.jpg" },
    { title: "Trust and Security with Google Cloud", issuer: "Simplilearn SkillUp", date: "Oct 28, 2025", image: "assets/cert-gc-trust-security.jpg" }
  ],

  resume_profile: "BS Information Systems student interested in systems analysis, workflow design, and practical digital solutions that connect people, process, and information.",
  contact_title: "Let's make a better system.",
  contact_text: "Have an internship opportunity or a project worth discussing? I'd be glad to hear about it."
};

/* =========================================================
   Helpers
   ========================================================= */
const C = CONTENT;
const P = C.project || {};

const isBlank = (v) =>
  v == null || (typeof v === "string" && (v.trim() === "" || /\[_+\]/.test(v)));
const has = (v) => !isBlank(v);

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const pad2 = (n) => String(n).padStart(2, "0");

/** Keep strings with content, or objects where at least one of `keys` has content. */
const keep = (arr, keys) =>
  (Array.isArray(arr) ? arr : []).filter((item) =>
    typeof item === "string" ? has(item) : item && keys.some((k) => has(item[k]))
  );

/** Render `html` only when `value` has content. */
const when = (value, html) => (has(value) ? html : "");

const validPercent = (p) => typeof p === "number" && isFinite(p) && p >= 0 && p <= 100;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const DATA = {
  heroLines: keep(C.hero_lines),
  principles: keep(C.principles, ["title", "text"]),
  facts: keep(P.facts, ["label", "value"]).filter((f) => has(f.label) && has(f.value)),
  modules: keep(P.modules, ["title", "text"]),
  tools: keep(P.tools),
  skills: keep(C.skills, ["name"]),
  education: keep(C.education, ["school"]),
  certificates: keep(C.certificates, ["title"])
};

function hideSection(id) {
  const section = document.getElementById(id);
  if (section) section.hidden = true;
  document.querySelectorAll(`[data-nav="${id}"]`).forEach((a) => {
    const li = a.closest("li");
    (li || a).hidden = true;
  });
}

const isVisible = (id) => {
  const el = document.getElementById(id);
  return !!el && !el.hidden;
};

/* =========================================================
   1. Header
   ========================================================= */
function renderHeader() {
  document.querySelectorAll("[data-initials]").forEach((el) => (el.textContent = C.initials || ""));
  document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = C.name || ""));
  document.querySelectorAll("[data-role]").forEach((el) => {
    el.textContent = C.role || "";
    el.hidden = !has(C.role);
  });
  if (has(C.name)) document.title = has(C.role) ? `${C.name} — ${C.role}` : C.name;
}

/* =========================================================
   2. Hero
   ========================================================= */
function renderHero() {
  const root = document.getElementById("hero-root");

  const lines = DATA.heroLines.length ? DATA.heroLines : [C.name, C.role].filter(has);
  const mutedIndex = DATA.heroLines.length ? 2 : 1;
  const title = lines
    .map((l, i) => `<span${i === mutedIndex ? ' class="is-muted"' : ""}>${esc(l)}</span>`)
    .join("");

  const projectsShown = isVisible("projects");

  root.innerHTML = `
    <div class="hero-text">
      ${when(C.badge, `<p class="badge"><span class="badge-dot" aria-hidden="true"></span>${esc(C.badge)}</p>`)}
      ${when(C.eyebrow, `<p class="eyebrow">${esc(C.eyebrow)}</p>`)}
      ${title ? `<h1 class="display">${title}</h1>` : ""}
      ${when(C.hero_intro, `<p class="hero-intro">${esc(C.hero_intro)}</p>`)}
      <div class="hero-actions">
        ${projectsShown ? `<a class="btn btn-primary" href="#projects">View my work</a>` : ""}
        <a class="btn ${projectsShown ? "btn-secondary" : "btn-primary"}" href="#contact">Let's talk</a>
        <a class="btn btn-secondary" href="#resume">View résumé</a>
      </div>
    </div>

    <div class="hero-visual">
      <div class="arch-outline" aria-hidden="true"></div>
      <div class="arch" id="hero-arch">
        <div class="arch-fallback" aria-hidden="true">
          <span class="arch-initials">${esc(C.initials || "")}</span>
          <span class="arch-caption">Profile photo</span>
        </div>
      </div>
      ${when(C.role, `
        <div class="focus-card">
          <p class="eyebrow">Current focus</p>
          <p class="focus-role">${esc(C.role)}</p>
          <p class="focus-tags">People · Process · Technology</p>
        </div>`)}
    </div>
  `;

  // The photo is only inserted after it loads, so a missing file never
  // shows a broken-image icon — the initials stay visible instead.
  if (has(C.photo)) {
    const arch = document.getElementById("hero-arch");
    const img = new Image();
    img.alt = has(C.name) ? `Portrait of ${C.name}` : "Portrait";
    img.decoding = "async";
    img.onload = () => {
      arch.prepend(img);
      arch.classList.add("has-photo");
    };
    img.src = C.photo;
  }
}

/* =========================================================
   3. About
   ========================================================= */
function renderAbout() {
  if (!has(C.about_title) && !has(C.about_text) && !DATA.principles.length) return hideSection("about");

  document.getElementById("about-root").innerHTML = `
    <p class="label">01 / About</p>
    ${when(C.about_title, `<h2 class="h2">${esc(C.about_title)}</h2>`)}
    ${when(C.about_text, `<p class="lead">${esc(C.about_text)}</p>`)}
    ${DATA.principles.length ? `
      <ul class="principles">
        ${DATA.principles.map((p, i) => `
          <li class="card principle">
            <span class="num">${pad2(i + 1)}</span>
            <div>
              ${when(p.title, `<h3 class="card-title">${esc(p.title)}</h3>`)}
              ${when(p.text, `<p class="card-text">${esc(p.text)}</p>`)}
            </div>
          </li>`).join("")}
      </ul>` : ""}
  `;
}

/* =========================================================
   4. Projects
   ========================================================= */
function mockupHTML() {
  const bars = [38, 62, 48, 80, 55, 70, 44, 90, 58, 66, 50, 74];
  return `
    <div class="mockup" role="img" aria-label="${esc(has(P.name) ? P.name : "Project")} dashboard illustration">
      <div class="mock-bar">
        <span class="mock-dots"><i></i><i></i><i></i></span>
        ${when(P.name, `<span class="mock-title">${esc(P.name)}</span>`)}
        <span class="mock-search"></span>
      </div>
      <div class="mock-body">
        <div class="mock-side"><b></b><b></b><b></b><b></b><b></b><b></b></div>
        <div class="mock-main">
          <div class="mock-stats"><b></b><b></b><b></b></div>
          <div class="mock-chart">${bars.map((h) => `<i style="height:${h}%"></i>`).join("")}</div>
          <div class="mock-rows"><b></b><b></b><b></b></div>
        </div>
      </div>
    </div>`;
}

function renderProjects() {
  const hasOverview = has(P.overview_title) || has(P.overview_text) || DATA.facts.length;
  const anything =
    has(P.name) || has(P.title) || has(P.text) || hasOverview ||
    DATA.modules.length || has(P.role_title) || has(P.role_text) || DATA.tools.length;
  if (!anything) return hideSection("projects");

  const hasRole = has(P.role_title) || has(P.role_text);
  const hasTools = DATA.tools.length > 0;

  document.getElementById("projects-root").innerHTML = `
    <p class="label">02 / Featured Project</p>
    ${when(P.title, `<h2 class="h2">${esc(P.title)}</h2>`)}
    ${when(P.text, `<p class="intro-small">${esc(P.text)}</p>`)}

    <div class="project-row${hasOverview ? "" : " is-single"}">
      ${mockupHTML()}
      ${hasOverview ? `
        <article class="card overview">
          <p class="eyebrow">Project overview</p>
          ${when(P.overview_title, `<h3 class="overview-title">${esc(P.overview_title)}</h3>`)}
          ${when(P.overview_text, `<p class="overview-text">${esc(P.overview_text)}</p>`)}
          ${DATA.facts.length ? `
            <dl class="facts">
              ${DATA.facts.map((f) => `<div class="fact"><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join("")}
            </dl>` : ""}
        </article>` : ""}
    </div>

    ${DATA.modules.length ? `
      <ul class="modules">
        ${DATA.modules.map((m, i) => `
          <li class="card module">
            <div class="module-top"><span class="num">${pad2(i + 1)}</span><span class="module-arrow" aria-hidden="true">↗</span></div>
            ${when(m.title, `<h3 class="card-title">${esc(m.title)}</h3>`)}
            ${when(m.text, `<p class="card-text">${esc(m.text)}</p>`)}
          </li>`).join("")}
      </ul>` : ""}

    ${hasRole || hasTools ? `
      <div class="project-dark">
        ${hasRole ? `
          <article class="card-dark">
            ${when(P.role_label, `<p class="eyebrow">${esc(P.role_label)}</p>`)}
            ${when(P.role_title, `<h3 class="dark-title">${esc(P.role_title)}</h3>`)}
            ${when(P.role_text, `<p class="dark-text">${esc(P.role_text)}</p>`)}
          </article>` : ""}
        ${hasTools ? `
          <article class="card-dark">
            <p class="eyebrow">Technology stack</p>
            <ul class="chips">${DATA.tools.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}</ul>
          </article>` : ""}
      </div>` : ""}
  `;
}

/* =========================================================
   5. Skills
   ========================================================= */
function renderSkills() {
  if (!DATA.skills.length) return hideSection("skills");

  document.getElementById("skills-root").innerHTML = `
    <p class="label">03 / Skills</p>
    ${when(C.skills_title, `<h2 class="h2">${esc(C.skills_title)}</h2>`)}
    ${when(C.skills_intro, `<p class="intro-small">${esc(C.skills_intro)}</p>`)}
    <ul class="skills-list">
      ${DATA.skills.map((s, i) => {
        const pct = validPercent(s.percent) ? Math.round(s.percent) : null;
        return `
          <li class="skill-row">
            <span class="num">${pad2(i + 1)}</span>
            <div class="skill-name">
              <span>${esc(s.name)}</span>
              ${when(s.level, `<small>${esc(s.level)} · self-assessed</small>`)}
            </div>
            ${pct !== null ? `
              <div class="skill-bar" role="progressbar" aria-label="${esc(s.name)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}">
                <span class="skill-fill" data-percent="${pct}"></span>
              </div>
              <span class="skill-pct">${pct}%</span>` : ""}
          </li>`;
      }).join("")}
    </ul>
  `;
}

/* =========================================================
   6. Education
   ========================================================= */
function renderEducation() {
  if (!DATA.education.length && !has(C.education_title) && !has(C.education_text)) return hideSection("education");

  document.getElementById("education-root").innerHTML = `
    <div class="education-grid">
      <div>
        <p class="eyebrow">Education</p>
        ${when(C.education_title, `<h2 class="h2">${esc(C.education_title)}</h2>`)}
        ${when(C.education_text, `<p class="lead">${esc(C.education_text)}</p>`)}
      </div>
      ${DATA.education.length ? `
        <ol class="timeline">
          ${DATA.education.map((e) => `
            <li>
              <span class="tl-years">${has(e.years) ? esc(e.years) : ""}</span>
              <div class="tl-body">
                <p class="tl-school">${esc(e.school)}</p>
                ${when(e.level, `<p class="tl-level">${esc(e.level)}</p>`)}
              </div>
            </li>`).join("")}
        </ol>` : ""}
    </div>
  `;
}

/* =========================================================
   7. Certificates
   ========================================================= */
function renderCertificates() {
  if (!DATA.certificates.length) return hideSection("certificates");

  document.getElementById("certificates-root").innerHTML = `
    <p class="label">05 / Certificates</p>
    ${when(C.certificates_title, `<h2 class="h2">${esc(C.certificates_title)}</h2>`)}
    ${when(C.certificates_intro, `<p class="intro-small">${esc(C.certificates_intro)}</p>`)}
    <div class="certs">
      ${DATA.certificates.map((c, i) => {
        const meta = [c.issuer, c.date].filter(has).map(esc).join(" · ");
        return `
          <button class="card cert" type="button" data-cert="${i}" aria-haspopup="dialog">
            <span class="cert-frame"><span class="cert-img" data-src="${has(c.image) ? esc(c.image) : ""}"></span></span>
            ${meta ? `<span class="eyebrow">${meta}</span>` : ""}
            <span class="card-title">${esc(c.title)}</span>
            <span class="text-link">Inspect</span>
          </button>`;
      }).join("")}
    </div>
  `;

  // Load each image only if it exists; otherwise the gray frame stays clean.
  document.querySelectorAll(".cert-img[data-src]").forEach((box) => {
    const src = box.dataset.src;
    if (!src) return;
    const img = new Image();
    img.alt = "";
    img.onload = () => box.appendChild(img);
    img.src = src;
  });

  const modal = document.getElementById("cert-modal");
  const modalImg = modal.querySelector(".modal-img");
  const modalTitle = modal.querySelector(".modal-title");

  document.querySelectorAll("[data-cert]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const c = DATA.certificates[Number(btn.dataset.cert)];
      modalTitle.textContent = c.title;
      modalImg.hidden = true;
      modalImg.removeAttribute("src");
      if (has(c.image)) {
        modalImg.onload = () => (modalImg.hidden = false);
        modalImg.onerror = () => (modalImg.hidden = true);
        modalImg.alt = `${c.title} certificate`;
        modalImg.src = c.image;
      }
      if (typeof modal.showModal === "function") modal.showModal();
      else modal.setAttribute("open", "");
    });
  });

  const close = () => (typeof modal.close === "function" ? modal.close() : modal.removeAttribute("open"));
  modal.querySelector(".modal-close").addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); }); // backdrop click
  // Esc is handled natively by <dialog>.
}

/* =========================================================
   8. Résumé
   ========================================================= */
function renderResume() {
  const contact = [
    ["Email", C.email],
    ["Location", C.location],
    ["Age", C.age]
  ].filter(([, v]) => has(v));

  const projectText = [P.resume_text, P.text, P.overview_text].find(has);
  const hasProject = has(P.name) || has(projectText);
  const roleLine = [C.role, C.program].filter(has).map(esc).join(" · ");

  document.getElementById("resume-root").innerHTML = `
    <div class="resume-head">
      <div>
        <p class="label">06 / Résumé</p>
        <h2 class="h2">One page, at a glance.</h2>
      </div>
      <button class="btn btn-primary" type="button" id="print-btn">Print / Save PDF</button>
    </div>

    <article class="resume-card" aria-label="Résumé">
      <aside class="resume-side">
        <div class="resume-initials" aria-hidden="true">${esc(C.initials || "")}</div>
        <h3 class="resume-name">${esc(C.name || "")}</h3>
        ${roleLine ? `<p class="resume-role">${roleLine}</p>` : ""}

        ${contact.length ? `
          <p class="eyebrow">Contact</p>
          <ul>
            ${contact.map(([k, v]) => `<li><span class="r-label">${k}</span><span class="r-value">${esc(v)}</span></li>`).join("")}
          </ul>` : ""}

        ${DATA.skills.length ? `
          <p class="eyebrow">Skills</p>
          <ul>${DATA.skills.map((s) => `<li class="r-value">${esc(s.name)}</li>`).join("")}</ul>` : ""}
      </aside>

      <div class="resume-main">
        ${when(C.resume_profile, `
          <section class="resume-block">
            <p class="eyebrow">Profile</p>
            <p>${esc(C.resume_profile)}</p>
          </section>`)}

        ${DATA.education.length ? `
          <section class="resume-block">
            <p class="eyebrow">Education</p>
            <div>
              ${DATA.education.map((e) => `
                <div class="r-edu">
                  <span class="r-years">${has(e.years) ? esc(e.years) : ""}</span>
                  <div>
                    <p class="r-school">${esc(e.school)}</p>
                    ${when(e.level, `<p class="r-level">${esc(e.level)}</p>`)}
                  </div>
                </div>`).join("")}
            </div>
          </section>` : ""}

        ${hasProject ? `
          <section class="resume-block">
            <p class="eyebrow">Featured project</p>
            ${when(P.name, `<p class="r-project-name">${esc(P.name)}</p>`)}
            ${when(projectText, `<p class="r-project-text">${esc(projectText)}</p>`)}
          </section>` : ""}
      </div>
    </article>
  `;

  document.getElementById("print-btn").addEventListener("click", () => window.print());
}

/* =========================================================
   9. Contact
   ========================================================= */
function renderContact() {
  const mapsUrl = has(C.location)
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.location)}`
    : "";

  document.getElementById("contact-root").innerHTML = `
    <div>
      ${when(C.contact_title, `<h2 class="h2">${esc(C.contact_title)}</h2>`)}
      ${when(C.contact_text, `<p class="contact-text">${esc(C.contact_text)}</p>`)}
      ${has(C.email) || has(C.location) ? `
        <div class="info-card">
          ${when(C.email, `
            <div class="info-item">
              <p class="eyebrow">Email</p>
              <a class="info-value" href="mailto:${esc(C.email)}">${esc(C.email)}</a>
            </div>`)}
          ${when(C.location, `
            <div class="info-item">
              <p class="eyebrow">Location</p>
              <p class="info-value">${esc(C.location)}</p>
            </div>
            <a class="text-link" href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Open location in Maps<span class="sr-only"> (opens in a new tab)</span></a>`)}
        </div>` : ""}
    </div>

    <form class="form-card" id="contact-form" novalidate>
      <div class="field">
        <label for="f-name">Full Name *</label>
        <input id="f-name" name="name" type="text" autocomplete="name" placeholder="Your full name" required aria-describedby="e-name">
        <p class="field-error" id="e-name"></p>
      </div>
      <div class="field">
        <label for="f-email">Email *</label>
        <input id="f-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required aria-describedby="e-email">
        <p class="field-error" id="e-email"></p>
      </div>
      <div class="field">
        <label for="f-subject">Subject</label>
        <input id="f-subject" name="subject" type="text" placeholder="What would you like to discuss?">
      </div>
      <div class="field">
        <label for="f-message">Message *</label>
        <textarea id="f-message" name="message" placeholder="Write your message here..." required aria-describedby="e-message"></textarea>
        <p class="field-error" id="e-message"></p>
      </div>
      <button class="btn btn-primary btn-block" type="submit">Send message</button>
      <div class="form-success" id="form-success" role="status" aria-live="polite" hidden></div>
    </form>
  `;

  initForm();
}

function initForm() {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name: (v) => (v ? "" : "Please enter your full name."),
    email: (v) => (!v ? "Please enter your email." : emailRe.test(v) ? "" : "Please enter a valid email address."),
    message: (v) => (v.length >= 10 ? "" : v ? "Message should be at least 10 characters." : "Please write a message.")
  };

  const check = (name) => {
    const input = form.elements[name];
    const msg = rules[name](input.value.trim());
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    document.getElementById(`e-${name}`).textContent = msg;
    return !msg;
  };

  Object.keys(rules).forEach((name) => {
    form.elements[name].addEventListener("blur", () => {
      if (form.elements[name].value.trim()) check(name);
    });
    form.elements[name].addEventListener("input", () => {
      if (form.elements[name].getAttribute("aria-invalid") === "true") check(name);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = Object.keys(rules).map(check);
    if (results.includes(false)) {
      success.hidden = true;
      const firstBad = Object.keys(rules).find((n) => form.elements[n].getAttribute("aria-invalid") === "true");
      form.elements[firstBad].focus();
      return;
    }

    const name = form.elements.name.value.trim();
    const subject = form.elements.subject.value.trim() || `Message from ${name}`;
    const body = `${form.elements.message.value.trim()}\n\n— ${name} (${form.elements.email.value.trim()})`;
    const first = name.split(/\s+/)[0];

    success.innerHTML = `
      <p>Thanks, ${esc(first)}! Your message is ready.</p>
      ${has(C.email) ? `<a class="text-link" href="mailto:${esc(C.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}">Send it with your email app</a>` : ""}
    `;
    success.hidden = false;
    form.reset();
    Object.keys(rules).forEach((n) => form.elements[n].removeAttribute("aria-invalid"));
  });
}

/* =========================================================
   10. Footer
   ========================================================= */
function renderFooter() {
  const links = [...document.querySelectorAll(".nav-links a")]
    .filter((a) => !a.closest("li").hidden)
    .map((a) => `<li><a href="${a.getAttribute("href")}">${esc(a.textContent)}</a></li>`)
    .join("");

  document.getElementById("footer-root").innerHTML = `
    <p>© ${new Date().getFullYear()} ${esc(C.name || "")}</p>
    <nav aria-label="Footer"><ul class="footer-links">${links}</ul></nav>
  `;
}

/* =========================================================
   Behaviour: mobile menu, active link, reveal, skill bars
   ========================================================= */
function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");

  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 960) setOpen(false); });
}

function initScrollSpy() {
  const links = [...document.querySelectorAll(".nav-links a[data-nav]")].filter((a) => !a.closest("li").hidden);
  const sections = links.map((a) => document.getElementById(a.dataset.nav)).filter(Boolean);

  const setActive = (id) => {
    links.forEach((a) => {
      const on = a.dataset.nav === id;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };

  // Pick the last section whose top has passed ~40% of the viewport.
  const update = () => {
    const line = window.innerHeight * 0.4;
    let current = sections[0] ? sections[0].id : "";
    sections.forEach((s) => { if (s.getBoundingClientRect().top <= line) current = s.id; });
    // At the very bottom of the page, the last section wins.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 && sections.length) {
      current = sections[sections.length - 1].id;
    }
    setActive(current);
  };

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function initReveal() {
  const targets = document.querySelectorAll(
    ".hero-text, .hero-visual, main .section:not([hidden]) .container > *, .contact-grid > *"
  );
  const fills = document.querySelectorAll(".skill-fill");
  const showFill = (el) => (el.style.width = `${el.dataset.percent}%`);

  if (reduceMotion || !("IntersectionObserver" in window)) {
    fills.forEach(showFill);
    return; // content stays fully visible, no animation
  }

  targets.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      entry.target.querySelectorAll(".skill-fill").forEach(showFill);
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  targets.forEach((el) => io.observe(el));

  // Make sure everything is visible before printing.
  window.addEventListener("beforeprint", () => {
    targets.forEach((el) => el.classList.add("in"));
    fills.forEach(showFill);
  });
}

/* =========================================================
   Boot
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  // Sections that may hide themselves run first, so the hero
  // and footer know which links/buttons to show.
  renderAbout();
  renderProjects();
  renderSkills();
  renderEducation();
  renderCertificates();
  renderHero();
  renderResume();
  renderContact();
  renderFooter();

  initMenu();
  initScrollSpy();
  initReveal();
});
