(() => {
  "use strict";

  /* =========================================================
     GOMEZ DIGITAL
     V6 STABLE + RESPONSIVE JAVASCRIPT
     
     Built specifically for the current index.html.
     Defensive DOM checks are used throughout so one missing
     element cannot break the rest of the website.
     ========================================================= */


  /* =========================================================
     01. SAFE DOM HELPERS
     ========================================================= */

  const $ = (selector, parent = document) => {
    try {
      return parent.querySelector(selector);
    } catch {
      return null;
    }
  };

  const $$ = (selector, parent = document) => {
    try {
      return Array.from(parent.querySelectorAll(selector));
    } catch {
      return [];
    }
  };

  const on = (element, event, handler, options) => {
    if (!element) return;

    try {
      element.addEventListener(event, handler, options);
    } catch {
      /* Ignore isolated listener errors */
    }
  };


  /* =========================================================
     02. LOADER
     
     IMPORTANT:
     Never allow JavaScript to trap the visitor on the loader.
     ========================================================= */

  const hideLoader = () => {
    const loader = $("#loader");

    if (!loader) return;

    loader.classList.add("hidden");

    try {
      loader.setAttribute("aria-hidden", "true");
    } catch {
      /* Safe fallback */
    }
  };


  /* Emergency fallback:
     Even if another JavaScript section fails,
     the website must still open. */

  window.setTimeout(hideLoader, 3500);


  /* =========================================================
     03. DOM READY
     ========================================================= */

  const init = () => {

    /* -------------------------------------------------------
       Core elements
       ------------------------------------------------------- */

    const loader = $("#loader");
    const siteHeader = $("#siteHeader");
    const menuToggle = $("#menuToggle");
    const mainNav = $("#mainNav");

    const toolModal = $("#toolModal");
    const toolModalClose = $("#toolModalClose");
    const toolModalBackdrop = $("#toolModalBackdrop");

    const toolTitle = $("#toolTitle");
    const toolDescription = $("#toolDescription");
    const toolInput = $("#toolInput");
    const toolGenerate = $("#toolGenerate");
    const toolResult = $("#toolResult");

    const heroVisual = $(".hero-visual");


    /* =======================================================
       04. LOADER INITIALIZATION
       ======================================================= */

    if (loader) {

      /*
       * If the page has already completely loaded,
       * close the loader shortly after initialization.
       */

      if (document.readyState === "complete") {

        window.setTimeout(() => {
          hideLoader();
        }, 250);

      } else {

        on(window, "load", () => {

          window.setTimeout(() => {
            hideLoader();
          }, 650);

        });

      }

      /*
       * Second safety fallback.
       */

      window.setTimeout(() => {
        hideLoader();
      }, 3000);
    }


    /* =======================================================
       05. HEADER SCROLL EFFECT
       ======================================================= */

    const updateHeader = () => {

      if (!siteHeader) return;

      const scrolled =
        window.scrollY > 30;

      siteHeader.classList.toggle(
        "scrolled",
        scrolled
      );
    };

    updateHeader();

    on(window, "scroll", updateHeader, {
      passive: true
    });


    /* =======================================================
       06. MOBILE MENU
       ======================================================= */

    const closeMenu = () => {

      if (!mainNav || !menuToggle) return;

      mainNav.classList.remove("open");
      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );
    };


    const openMenu = () => {

      if (!mainNav || !menuToggle) return;

      mainNav.classList.add("open");
      menuToggle.classList.add("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "true"
      );

      document.body.classList.add(
        "menu-open"
      );
    };


    const toggleMenu = () => {

      if (!mainNav) return;

      const isOpen =
        mainNav.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    };


    on(menuToggle, "click", toggleMenu);


    /*
     * Close menu after clicking a navigation link.
     */

    $$("#mainNav a").forEach((link) => {

      on(link, "click", () => {
        closeMenu();
      });

    });


    /*
     * Close mobile navigation when clicking outside it.
     */

    on(document, "click", (event) => {

      if (!mainNav || !menuToggle) return;

      if (
        !mainNav.classList.contains("open")
      ) {
        return;
      }

      const target = event.target;

      if (
        !mainNav.contains(target) &&
        !menuToggle.contains(target)
      ) {
        closeMenu();
      }

    });


    /*
     * Escape key closes mobile menu.
     */

    on(document, "keydown", (event) => {

      if (event.key !== "Escape") return;

      closeMenu();

    });


    /*
     * If the screen becomes desktop-sized,
     * make sure the mobile menu cannot remain open.
     */

    const handleResize = () => {

      if (
        window.innerWidth > 900
      ) {
        closeMenu();
      }

    };

    on(window, "resize", handleResize, {
      passive: true
    });


    /* =======================================================
       07. SCROLL REVEAL
       ======================================================= */

    const revealElements =
      $$(".reveal");


    if (
      revealElements.length &&
      "IntersectionObserver" in window
    ) {

      const revealObserver =
        new IntersectionObserver(
          (entries, observer) => {

            entries.forEach((entry) => {

              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            });

          },
          {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
          }
        );


      revealElements.forEach((element) => {

        revealObserver.observe(element);

      });

    } else {

      /*
       * Fallback for browsers without
       * IntersectionObserver.
       */

      revealElements.forEach((element) => {

        element.classList.add("visible");

      });

    }


    /* =======================================================
       08. SMOOTH ANCHOR NAVIGATION
       ======================================================= */

    const anchorLinks =
      $$('a[href^="#"]');


    anchorLinks.forEach((link) => {

      on(link, "click", (event) => {

        const href =
          link.getAttribute("href");

        if (
          !href ||
          href === "#" ||
          href.length < 2
        ) {
          return;
        }

        let target = null;

        try {
          target = document.querySelector(
            href
          );
        } catch {
          target = null;
        }

        if (!target) {
          return;
        }

        event.preventDefault();

        const headerHeight =
          siteHeader
            ? siteHeader.offsetHeight
            : 0;

        const targetTop =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          15;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "smooth"
        });

      });

    });


    /* =======================================================
       09. AI STUDIO DATA
       ======================================================= */

    const tools = {

      "business-name": {
        title: "Business Name Generator",
        description:
          "Generate modern, memorable business-name directions from a simple description.",
        placeholder:
          "Example: A premium clothing brand for ambitious young professionals.",
        button:
          "Generate Names"
      },

      "website-concept": {
        title: "Website Concept",
        description:
          "Turn a business idea into a clear website direction.",
        placeholder:
          "Example: A Botswana-based construction company targeting commercial clients.",
        button:
          "Create Concept"
      },

      "content-spark": {
        title: "Content Spark",
        description:
          "Generate content directions for your brand or business.",
        placeholder:
          "Example: A digital agency trying to attract international clients.",
        button:
          "Generate Ideas"
      },

      "ai-roadmap": {
        title: "AI Roadmap",
        description:
          "Create a practical starting roadmap for using AI in a business.",
        placeholder:
          "Example: A small restaurant wants to use AI to improve marketing and customer service.",
        button:
          "Build Roadmap"
      }

    };


    /* =======================================================
       10. AI GENERATORS
       ======================================================= */

    const cleanInput = (value) => {

      return String(value || "")
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 700);

    };


    const generateBusinessNames = (input) => {

      const topic =
        input || "your business";

      return `
        <strong>Business name directions</strong>

        <br><br>

        <b>01 — ${topic} Studio</b><br>
        A clean, modern name structure suitable for a premium brand.

        <br><br>

        <b>02 — ${topic} Labs</b><br>
        Works well for technology, innovation or AI-focused positioning.

        <br><br>

        <b>03 — ${topic} Collective</b><br>
        Useful for a creative, community or multi-service business.

        <br><br>

        <b>04 — ${topic} Works</b><br>
        A flexible professional naming direction for a service business.

        <br><br>

        <b>Tip:</b> Before using a name commercially, check domain,
        social-media and trademark availability.
      `;

    };


    const generateWebsiteConcept = (input) => {

      const topic =
        input || "your business";

      return `
        <strong>Website concept</strong>

        <br><br>

        <b>Hero:</b><br>
        Clearly explain what ${topic} does and who it helps.

        <br><br>

        <b>Trust section:</b><br>
        Show results, experience, testimonials, certifications or
        relevant proof.

        <br><br>

        <b>Services:</b><br>
        Present the main services using short explanations and
        clear outcomes.

        <br><br>

        <b>Process:</b><br>
        Explain how a customer moves from first contact to completion.

        <br><br>

        <b>CTA:</b><br>
        Give visitors one obvious next action such as
        "Get a Quote", "Book a Call" or "Start a Project".
      `;

    };


    const generateContentIdeas = (input) => {

      const topic =
        input || "your brand";

      return `
        <strong>Content ideas for ${topic}</strong>

        <br><br>

        <b>01.</b> The biggest mistake customers make before buying.

        <br><br>

        <b>02.</b> A simple before-and-after transformation.

        <br><br>

        <b>03.</b> Three things beginners should know.

        <br><br>

        <b>04.</b> Behind the scenes: how the business actually works.

        <br><br>

        <b>05.</b> A common industry myth — followed by the facts.

        <br><br>

        <b>06.</b> A short customer problem → solution story.

        <br><br>

        <b>07.</b> A quick educational carousel or short-form video.
      `;

    };


    const generateAIRoadmap = (input) => {

      const topic =
        input || "your business";

      return `
        <strong>Practical AI roadmap</strong>

        <br><br>

        <b>Step 1 — Identify repetitive work</b><br>
        List tasks such as writing, research, customer replies,
        reporting and administration.

        <br><br>

        <b>Step 2 — Start with low-risk automation</b><br>
        Use AI for drafting, summarising, brainstorming and
        information organisation.

        <br><br>

        <b>Step 3 — Create reusable workflows</b><br>
        Turn successful tasks into repeatable processes.

        <br><br>

        <b>Step 4 — Measure the result</b><br>
        Track time saved, quality, response speed and customer
        experience.

        <br><br>

        <b>Step 5 — Expand carefully</b><br>
        Only automate more important processes after testing
        the earlier workflow.

        <br><br>

        <b>Business context:</b> ${topic}
      `;

    };


    const generateToolResult = (
      toolKey,
      input
    ) => {

      switch (toolKey) {

        case "business-name":
          return generateBusinessNames(input);

        case "website-concept":
          return generateWebsiteConcept(input);

        case "content-spark":
          return generateContentIdeas(input);

        case "ai-roadmap":
          return generateAIRoadmap(input);

        default:
          return `
            <strong>Let's build something.</strong>
            <br><br>
            Enter a little more information and try again.
          `;

      }

    };


    /* =======================================================
       11. OPEN AI TOOL MODAL
       ======================================================= */

    let activeTool = null;


    const openTool = (toolKey) => {

      if (!toolModal) return;

      const tool =
        tools[toolKey];

      if (!tool) return;

      activeTool = toolKey;

      if (toolTitle) {
        toolTitle.textContent =
          tool.title;
      }

      if (toolDescription) {
        toolDescription.textContent =
          tool.description;
      }

      if (toolInput) {

        toolInput.value = "";

        toolInput.placeholder =
          tool.placeholder;

      }

      if (toolGenerate) {

        toolGenerate.textContent =
          tool.button;

      }

      if (toolResult) {

        toolResult.innerHTML = "";

        toolResult.classList.remove(
          "visible"
        );

      }

      toolModal.classList.add("open");

      toolModal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow =
        "hidden";

      window.setTimeout(() => {

        if (toolInput) {
          toolInput.focus();
        }

      }, 100);

    };


    /* =======================================================
       12. CLOSE AI TOOL MODAL
       ======================================================= */

    const closeTool = () => {

      if (!toolModal) return;

      toolModal.classList.remove(
        "open"
      );

      toolModal.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.style.overflow = "";

      activeTool = null;

    };


    /* =======================================================
       13. AI TOOL BUTTONS
       ======================================================= */

    $$(".tool-button").forEach((button) => {

      on(button, "click", () => {

        const toolKey =
          button.dataset.tool ||
          button.getAttribute(
            "data-tool"
          );

        if (!toolKey) return;

        openTool(toolKey);

      });

    });


    /* =======================================================
       14. AI TOOL GENERATE
       ======================================================= */

    on(toolGenerate, "click", () => {

      if (!activeTool) return;

      const input =
        cleanInput(
          toolInput
            ? toolInput.value
            : ""
        );

      const result =
        generateToolResult(
          activeTool,
          input
        );

      if (!toolResult) return;

      toolResult.innerHTML =
        result;

      toolResult.classList.add(
        "visible"
      );

      toolResult.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    });


    /* =======================================================
       15. ENTER KEY IN AI TOOL
       ======================================================= */

    on(toolInput, "keydown", (event) => {

      if (
        event.key === "Enter" &&
        (event.ctrlKey || event.metaKey)
      ) {

        event.preventDefault();

        if (toolGenerate) {
          toolGenerate.click();
        }

      }

    });


    /* =======================================================
       16. CLOSE MODAL
       ======================================================= */

    on(
      toolModalClose,
      "click",
      closeTool
    );

    on(
      toolModalBackdrop,
      "click",
      closeTool
    );


    on(document, "keydown", (event) => {

      if (
        event.key === "Escape" &&
        toolModal &&
        toolModal.classList.contains("open")
      ) {

        closeTool();

      }

    });


    /* =======================================================
       17. HERO VISUAL INTERACTION
       
       Desktop only.
       Disabled on touch devices to prevent mobile
       layout problems.
       ======================================================= */

    const supportsHover =
      window.matchMedia &&
      window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;


    if (
      heroVisual &&
      supportsHover
    ) {

      const visualFrame =
        $(".visual-frame", heroVisual);

      if (visualFrame) {

        const moveVisual = (event) => {

          const rect =
            heroVisual.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;

          const percentX =
            (x / rect.width) - 0.5;

          const percentY =
            (y / rect.height) - 0.5;

          const rotateY =
            percentX * 5;

          const rotateX =
            percentY * -4;

          visualFrame.style.transform =
            `perspective(1300px)
             rotateY(${rotateY}deg)
             rotateX(${rotateX}deg)`;

        };


        const resetVisual = () => {

          visualFrame.style.transform =
            "perspective(1300px) rotateY(-5deg) rotateX(2deg)";

        };


        on(
          heroVisual,
          "mousemove",
          moveVisual
        );

        on(
          heroVisual,
          "mouseleave",
          resetVisual
        );

      }

    }


    /* =======================================================
       18. FAQ
       
       Native <details>/<summary> is used by the HTML.
       We intentionally do NOT replace it with custom
       JavaScript because native behavior is safer.
       ======================================================= */

    const faqItems =
      $$(".faq-item");


    faqItems.forEach((item) => {

      on(item, "toggle", () => {

        if (!item.open) return;

        faqItems.forEach((other) => {

          if (
            other !== item &&
            other.open
          ) {
            other.open = false;
          }

        });

      });

    });


    /* =======================================================
       19. PHONE / TABLET SAFETY
       ======================================================= */

    const preventStaleMenuState = () => {

      if (
        window.innerWidth > 900
      ) {

        closeMenu();

      }

    };

    on(
      window,
      "orientationchange",
      preventStaleMenuState
    );


    /* =======================================================
       20. FINAL INITIALIZATION
       ======================================================= */

    updateHeader();

  };


  /* =========================================================
     21. START APPLICATION
     ========================================================= */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );

  } else {

    init();

  }


})();
