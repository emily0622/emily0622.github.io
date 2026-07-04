/* ============================================================
   Emily Traynor — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Nav scrolled state + progress bar ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("scrollProgress");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("is-scrolled", y > 40);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  function closeMenu() {
    if (!links) return;
    links.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Project filtering ---------- */
  var filters = document.getElementById("workFilters");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".card"));
  if (filters) {
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter");
      if (!btn) return;
      filters.querySelectorAll(".filter").forEach(function (f) {
        f.classList.remove("is-active"); f.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active"); btn.setAttribute("aria-selected", "true");
      var cat = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        var cats = card.getAttribute("data-cat") || "";
        card.classList.toggle("is-hidden", !(cat === "all" || cats.indexOf(cat) !== -1));
      });
    });
  }

  /* ---------- Animated counters ---------- */
  var counted = false;
  function animateCounters() {
    if (counted) return; counted = true;
    document.querySelectorAll(".stats__num").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = 1400, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var statsSection = document.getElementById("stats");
  if (statsSection && "IntersectionObserver" in window) {
    var statObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { animateCounters(); statObs.disconnect(); } });
    }, { threshold: 0.4 });
    statObs.observe(statsSection);
  } else { animateCounters(); }

  /* ---------- Case study modal ---------- */
  var PROJECTS = {
    "compute-engine": {
      thumb: "oss", tags: ["Open Source", "TypeScript", "457★"],
      title: "compute-engine — Summations & Products",
      meta: "Merged PR #137 · cortex-js/compute-engine · Dec 2023",
      link: "https://github.com/cortex-js/compute-engine/pull/137",
      linkText: "View the merged PR ↗",
      body:
        "<p>compute-engine is the symbolic-manipulation engine behind <strong>MathLive</strong> (2,000+★) — it parses, simplifies, and numerically evaluates math expressed as MathJSON.</p>" +
        "<p>I contributed a <strong>600+ line</strong> enhancement (merged) that significantly extended summation and product handling.</p>" +
        "<h4>What it added</h4><ul>" +
        "<li>Support for <strong>multiple indices</strong> (previously only a single <code>var=num</code> subscript)</li>" +
        "<li>Parsing of boxed expressions such as <code>Element</code> and <code>Unequal</code></li>" +
        "<li>Solving numeric equations inside summations</li>" +
        "<li>A suite of new parsing &amp; evaluation test cases</li>" +
        "</ul><p>Resolved the issues raised in cortex-js/compute-engine#133. I've also contributed a docs fix to <strong>DioxusLabs/docsite</strong> (the Rust UI framework).</p>"
    },
    "video-platform": {
      thumb: "cloud", tags: ["Pulumi", "AWS", "FastAPI"],
      title: "Video Management Platform",
      meta: "Warner Music Group · Software Engineer II",
      body:
        "<p>A greenfield platform for video claiming and management — one of the first projects at the company to adopt Pulumi, establishing the infrastructure pattern other teams now follow.</p>" +
        "<h4>What I built</h4><ul>" +
        "<li>Foundational cloud infrastructure with <strong>Pulumi + AWS</strong> (RDS, ECS, Load Balancers)</li>" +
        "<li><strong>20+ REST API endpoints</strong> in FastAPI, integrated with YouTube and internal microservices</li>" +
        "<li>Reliability work: JWT caching, DB connection-pool pre-warming, query indexing, TTL log-retention cron</li>" +
        "<li>Browser monitoring, dashboards, and alerting via New Relic + GitHub Actions</li>" +
        "</ul><p>Drove the video-claiming expansion to wholly-owned labels as a two-person squad, then took full ownership of the live production app through a team transition.</p>"
    },
    "nlp-thesis": {
      thumb: "ml", tags: ["NLP", "BERT", "Research"],
      title: "NLP for Decentralized Content Moderation",
      meta: "Undergraduate Thesis · University of Toronto · 2022–2023",
      body:
        "<p>A decentralized content-moderation system for social-media platforms, built for my Engineering Science thesis under Prof. Ishtiaque Ahmed (CS Dept.).</p>" +
        "<h4>Approach</h4><ul>" +
        "<li>Fine-tuned <strong>BERT</strong> classifiers for the moderation tasks</li>" +
        "<li>Applied <strong>Naive Bayes</strong> and topic modeling for sentiment, stigma, and topic classification</li>" +
        "<li>Designed the system to moderate without a single central authority</li>" +
        "</ul><p>Grounded in my Machine Intelligence coursework — the foundation I now build agentic AI on.</p>"
    },
    "agentic": {
      thumb: "ai", tags: ["MCP", "Agents", "LLMs"],
      title: "Agentic AI & MCP Tooling",
      meta: "Current focus",
      body:
        "<p>Where I'm investing my time now: turning large language models into <strong>reliable, tool-using systems</strong>.</p>" +
        "<h4>What that looks like</h4><ul>" +
        "<li>Building with the <strong>Model Context Protocol (MCP)</strong> — connecting models to real tools and data</li>" +
        "<li><strong>Multi-agent orchestration</strong> — fan-out, verification, and synthesis across specialized agents</li>" +
        "<li>LLM application design with the production mindset I bring from backend engineering</li>" +
        "</ul><p>The throughline of my work: pairing the reliability of solid systems engineering with the leverage of modern AI.</p>"
    }
  };

  var modal = document.getElementById("modal");
  var modalMedia = document.getElementById("modalMedia");
  var modalTags = document.getElementById("modalTags");
  var modalTitle = document.getElementById("modalTitle");
  var modalMeta = document.getElementById("modalMeta");
  var modalBody = document.getElementById("modalBody");
  var lastFocused = null;

  var THUMB_BG = {
    oss:   "linear-gradient(140deg, #2f3d6e, #5566a6)",
    cloud: "linear-gradient(140deg, #1f4a44, #3f8a76)",
    ml:    "linear-gradient(140deg, #4a3a6e, #8a6cb0)",
    ai:    "linear-gradient(140deg, #8a4a2c, #c4623d)"
  };

  function openModal(key) {
    var p = PROJECTS[key];
    if (!p || !modal) return;
    lastFocused = document.activeElement;
    modalMedia.style.background = THUMB_BG[p.thumb] || "var(--sage)";
    modalMedia.innerHTML = "";
    modalTags.innerHTML = p.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("");
    modalTitle.textContent = p.title;
    modalMeta.textContent = p.meta;
    var html = p.body;
    if (p.link) {
      html += '<a class="modal__link btn btn--primary" href="' + p.link + '" target="_blank" rel="noopener">' +
        (p.linkText || "View ↗") + "</a>";
    }
    modalBody.innerHTML = html;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal__close").focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  cards.forEach(function (card) {
    var key = card.getAttribute("data-project");
    card.addEventListener("click", function () { openModal(key); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(key); }
    });
  });
  if (modal) {
    modal.querySelectorAll("[data-close]").forEach(function (el) { el.addEventListener("click", closeModal); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  /* ---------- Contact form (mailto fallback) ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("contactStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim(), email = form.email.value.trim(), msg = form.message.value.trim();
      if (!name || !email || !msg) {
        status.style.color = "var(--clay)"; status.textContent = "Please fill in every field."; return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.style.color = "var(--clay)"; status.textContent = "That email doesn't look right."; return;
      }
      var subject = encodeURIComponent("Portfolio enquiry from " + name);
      var bodyText = encodeURIComponent(msg + "\n\n— " + name + " (" + email + ")");
      status.style.color = "var(--sage)";
      status.textContent = "Thanks, " + name.split(" ")[0] + "! Opening your email app…";
      window.location.href = "mailto:EJTraynor2001@gmail.com?subject=" + subject + "&body=" + bodyText;
      form.reset();
    });
  }
})();
