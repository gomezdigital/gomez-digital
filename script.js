/* =========================================================
   GOMEZ DIGITAL V4 — MAIN JAVASCRIPT ENGINE
   No external libraries required.
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     CONFIGURATION
     ========================================================= */

  const CONFIG = {
    studioName: "Gomez Digital",
    storageKey: "gomezDigitalProjects",
    themeKey: "gomezDigitalTheme"
  };


  /* =========================================================
     HELPERS
     ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const safeText = (value) =>
    String(value ?? "").trim();

  const escapeHTML = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");


  /* =========================================================
     PAGE LOADER
     ========================================================= */

  const loader = $(".page-loader");

  window.addEventListener("load", () => {
    if (!loader) return;

    setTimeout(() => {
      loader.classList.add("hidden");

      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 500);
  });


  /* =========================================================
     HEADER / SCROLL EFFECT
     ========================================================= */

  const header = $(".site-header");

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 30);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  const menuButton = $(".mobile-menu-button");
  const mobileMenu = $(".mobile-menu");

  const closeMobileMenu = () => {
    if (!mobileMenu) return;

    mobileMenu.classList.remove("open");

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
    }

    document.body.classList.remove("menu-open");
  };

  const openMobileMenu = () => {
    if (!mobileMenu) return;

    mobileMenu.classList.add("open");

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "true");
    }

    document.body.classList.add("menu-open");
  };

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobileMenu?.classList.contains("open");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  $$(".mobile-menu a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });


  /* =========================================================
     ESCAPE KEY
     ========================================================= */

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMobileMenu();
      closeModal();
    }
  });


  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  $$('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetID = link.getAttribute("href");

      if (!targetID || targetID === "#") return;

      const target = document.querySelector(targetID);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */

  const sections = $$("section[id]");
  const navLinks = $$(
    '.desktop-nav a[href^="#"], .mobile-menu a[href^="#"]'
  );

  if ("IntersectionObserver" in window && sections.length) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const id = entry.target.id;

          navLinks.forEach(link => {

            const matches =
              link.getAttribute("href") === `#${id}`;

            link.classList.toggle("active", matches);

          });

        });

      },
      {
        threshold: 0.35
      }
    );

    sections.forEach(section =>
      sectionObserver.observe(section)
    );
  }


  /* =========================================================
     REVEAL ANIMATIONS
     ========================================================= */

  const revealElements = $$(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element =>
      revealObserver.observe(element)
    );

  } else {

    revealElements.forEach(element =>
      element.classList.add("visible")
    );

  }


  /* =========================================================
     MODAL SYSTEM
     ========================================================= */

  const modal = $(".modal");

  let modalTitle = $(".modal-title", modal);
  let modalBody = $(".modal-body", modal);

  const closeModalButton =
    $(".modal-close", modal) ||
    $("[data-modal-close]");

  function openModal(title, content) {

    if (!modal) return;

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalBody) {
      modalBody.innerHTML = content;
    }

    modal.classList.add("open");
    document.body.classList.add("modal-open");

    setTimeout(() => {
      const focusable = modal.querySelector(
        "button, input, textarea, select, a"
      );

      if (focusable) focusable.focus();
    }, 100);
  }

  function closeModal() {

    if (!modal) return;

    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }

  window.closeModal = closeModal;

  if (closeModalButton) {
    closeModalButton.addEventListener(
      "click",
      closeModal
    );
  }

  if (modal) {

    modal.addEventListener("click", event => {

      if (
        event.target === modal ||
        event.target.matches("[data-modal-overlay]")
      ) {
        closeModal();
      }

    });

  }


  /* =========================================================
     TOAST NOTIFICATION
     ========================================================= */

  let toast = $(".toast");

  function showToast(message, type = "success") {

    if (!toast) {

      toast = document.createElement("div");

      toast.className = "toast";

      document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.dataset.type = type;

    toast.classList.add("show");

    clearTimeout(showToast.timeout);

    showToast.timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }


  /* =========================================================
     CLIPBOARD
     ========================================================= */

  async function copyToClipboard(text) {

    try {

      if (navigator.clipboard) {

        await navigator.clipboard.writeText(text);

      } else {

        const textarea =
          document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.select();

        document.execCommand("copy");

        textarea.remove();
      }

      showToast("Copied to clipboard.");

    } catch (error) {

      showToast(
        "Could not copy automatically.",
        "error"
      );

    }
  }


  /* =========================================================
     GENERATORS
     ========================================================= */

  const randomItem = array =>
    array[Math.floor(Math.random() * array.length)];


  const businessPrefixes = [
    "Nova",
    "Apex",
    "Vertex",
    "Prime",
    "Pulse",
    "Nexa",
    "Vanta",
    "Lumina",
    "Elevate",
    "Infinite",
    "Alpha",
    "Quantum"
  ];

  const businessSuffixes = [
    "Labs",
    "Digital",
    "Tech",
    "Hub",
    "Studio",
    "Works",
    "Solutions",
    "AI",
    "Systems",
    "Media"
  ];


  function generateBusinessName() {

    return `${randomItem(businessPrefixes)} ${randomItem(
      businessSuffixes
    )}`;

  }


  const websiteStyles = [
    "Modern dark",
    "Luxury minimal",
    "Futuristic AI",
    "Clean corporate",
    "Bold startup",
    "Creative glassmorphism"
  ];

  const websiteFeatures = [
    "AI-powered tools",
    "Interactive dashboard",
    "Lead capture form",
    "WhatsApp integration",
    "Booking system",
    "Client portal",
    "Analytics dashboard",
    "Responsive mobile design"
  ];


  function generateWebsiteConcept() {

    const name = generateBusinessName();

    const style = randomItem(websiteStyles);

    const features = [
      randomItem(websiteFeatures),
      randomItem(websiteFeatures),
      randomItem(websiteFeatures)
    ];

    return {
      name,
      style,
      features: [...new Set(features)]
    };

  }


  const captions = [
    "Your next level starts with the decision you make today.",
    "Build quietly. Execute loudly.",
    "Your vision deserves a digital presence.",
    "Stop waiting for opportunity. Build it.",
    "Small steps. Serious results.",
    "Think bigger. Build smarter.",
    "The future belongs to people who create."
  ];


  function generateCaption() {
    return randomItem(captions);
  }


  /* =========================================================
     AI STUDIO
     ========================================================= */

  function renderBusinessGenerator() {

    const result = generateBusinessName();

    return `
      <div class="generated-result">
        <span class="result-label">GENERATED BRAND NAME</span>

        <h3>${escapeHTML(result)}</h3>

        <button
          class="btn btn-secondary"
          data-copy="${escapeHTML(result)}"
        >
          Copy Name
        </button>
      </div>
    `;

  }


  function renderWebsiteGenerator() {

    const concept = generateWebsiteConcept();

    return `
      <div class="generated-result">

        <span class="result-label">
          WEBSITE CONCEPT
        </span>

        <h3>${escapeHTML(concept.name)}</h3>

        <p>
          <strong>Design:</strong>
          ${escapeHTML(concept.style)}
        </p>

        <p>
          <strong>Recommended features:</strong>
        </p>

        <ul>
          ${concept.features
            .map(feature =>
              `<li>${escapeHTML(feature)}</li>`
            )
            .join("")}
        </ul>

        <button
          class="btn btn-primary"
          data-action="generate-website"
        >
          Generate Another
        </button>

      </div>
    `;

  }


  function renderCaptionGenerator() {

    const caption = generateCaption();

    return `
      <div class="generated-result">

        <span class="result-label">
          AI CONTENT IDEA
        </span>

        <h3>${escapeHTML(caption)}</h3>

        <button
          class="btn btn-secondary"
          data-copy="${escapeHTML(caption)}"
        >
          Copy Caption
        </button>

      </div>
    `;

  }


  function openTool(toolName) {

    if (!toolName) return;

    let title = "Gomez AI Studio";
    let content = "";

    switch (toolName.toLowerCase()) {

      case "business":
      case "business-name":
      case "name-generator":

        title = "Business Name Generator";
        content = renderBusinessGenerator();
        break;


      case "website":
      case "website-generator":
      case "website-concept":

        title = "Website Concept Generator";
        content = renderWebsiteGenerator();
        break;


      case "caption":
      case "content":
      case "caption-generator":

        title = "Content Generator";
        content = renderCaptionGenerator();
        break;


      default:

        title = "Gomez AI Studio";

        content = `
          <div class="generated-result">

            <h3>AI tool coming soon.</h3>

            <p>
              This tool is part of the Gomez Digital
              Studio system and can be expanded with
              more AI functionality.
            </p>

          </div>
        `;

    }

    openModal(title, content);

  }


  /* =========================================================
     TOOL BUTTONS
     ========================================================= */

  $$("[data-tool]").forEach(button => {

    button.addEventListener("click", () => {

      const tool =
        button.dataset.tool;

      openTool(tool);

    });

  });


  /* =========================================================
     EVENT DELEGATION INSIDE MODALS
     ========================================================= */

  document.addEventListener("click", event => {

    const copyButton =
      event.target.closest("[data-copy]");

    if (copyButton) {

      const text =
        copyButton.dataset.copy;

      copyToClipboard(text);

      return;
    }


    const generateWebsite =
      event.target.closest(
        '[data-action="generate-website"]'
      );

    if (generateWebsite) {

      if (modalBody) {
        modalBody.innerHTML =
          renderWebsiteGenerator();
      }

      return;
    }


    const generateBusiness =
      event.target.closest(
        '[data-action="generate-business"]'
      );

    if (generateBusiness) {

      if (modalBody) {
        modalBody.innerHTML =
          renderBusinessGenerator();
      }

      return;
    }


    const generateCaption =
      event.target.closest(
        '[data-action="generate-caption"]'
      );

    if (generateCaption) {

      if (modalBody) {
        modalBody.innerHTML =
          renderCaptionGenerator();
      }

    }

  });


  /* =========================================================
     GENERIC DATA-MODAL BUTTONS
     ========================================================= */

  $$("[data-modal]").forEach(button => {

    button.addEventListener("click", () => {

      const title =
        button.dataset.modalTitle ||
        "Gomez Digital";

      const content =
        button.dataset.modalContent ||
        "<p>More information coming soon.</p>";

      openModal(title, content);

    });

  });


  /* =========================================================
     PROJECT FORM
     ========================================================= */

  const projectForm =
    $(".project-form");

  if (projectForm) {

    projectForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const formData =
          new FormData
