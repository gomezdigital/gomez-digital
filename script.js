(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CORE SELECTORS
       ===================================================== */

    const $ = (selector, root = document) =>
      root.querySelector(selector);

    const $$ = (selector, root = document) =>
      Array.from(root.querySelectorAll(selector));


    const loader = $("#page-loader");
    const header = $(".site-header");

    const menuToggle = $(".menu-toggle");
    const siteNav = $("#site-nav");

    const modal = $("#modal");
    const modalTitle = $("#modal-title");
    const modalContent = $("#modal-content");
    const modalClose = $(".modal-close", modal);

    const toast = $("#toast");
    const year = $("#year");

    let loaderClosed = false;
    let toastTimer = null;


    /* =====================================================
       SECURITY / TEXT HELPER
       ===================================================== */

    const escapeHTML = (value) =>
      String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");


    const random = (items) =>
      items[Math.floor(Math.random() * items.length)];


    /* =====================================================
       LOADING SCREEN
       ===================================================== */

    function finishLoader() {

      if (loaderClosed || !loader) return;

      loaderClosed = true;

      loader.classList.add("is-hidden");

      loader.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.classList.remove(
        "loading"
      );

      window.setTimeout(() => {

        if (loader.isConnected) {
          loader.remove();
        }

      }, 700);

    }


    document.body.classList.add("loading");


    /*
      Normal loading:
      Wait until the page has finished loading.
    */

    window.addEventListener(
      "load",
      () => {

        window.setTimeout(
          finishLoader,
          350
        );

      },
      {
        once: true
      }
    );


    /*
      Emergency fallback:
      Even if something goes wrong,
      the loader CANNOT stay forever.
    */

    window.setTimeout(
      finishLoader,
      3500
    );


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    function updateHeader() {

      if (!header) return;

      header.classList.toggle(
        "scrolled",
        window.scrollY > 25
      );

    }


    updateHeader();


    window.addEventListener(
      "scroll",
      updateHeader,
      {
        passive: true
      }
    );


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function setMenu(open) {

      if (!siteNav || !menuToggle) return;

      siteNav.classList.toggle(
        "is-open",
        open
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      menuToggle.setAttribute(
        "aria-label",
        open
          ? "Close menu"
          : "Open menu"
      );

      document.body.classList.toggle(
        "menu-open",
        open
      );

    }


    menuToggle?.addEventListener(
      "click",
      () => {

        const currentlyOpen =
          siteNav.classList.contains(
            "is-open"
          );

        setMenu(!currentlyOpen);

      }
    );


    $$(".nav-link").forEach(link => {

      link.addEventListener(
        "click",
        () => setMenu(false)
      );

    });


    /* =====================================================
       KEYBOARD CONTROL
       ===================================================== */

    document.addEventListener(
      "keydown",
      event => {

        if (event.key === "Escape") {

          setMenu(false);

          closeModal();

        }

      }
    );


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    function smoothScroll(target) {

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }


    $$('a[href^="#"]').forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const href =
            link.getAttribute("href");

          if (
            !href ||
            href === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(href);

          if (!target) return;


          event.preventDefault();

          smoothScroll(target);


          /*
            Update URL without
            jumping instantly.
          */

          history.replaceState(
            null,
            "",
            href
          );

        }
      );

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
      $$("main section[id]");

    const navLinks =
      $$(".nav-link");


    if (
      "IntersectionObserver" in window
    ) {

      const sectionObserver =
        new IntersectionObserver(
          entries => {

            entries.forEach(entry => {

              if (!entry.isIntersecting) {
                return;
              }

              const id =
                entry.target.id;


              navLinks.forEach(link => {

                link.classList.toggle(
                  "active",
                  link.getAttribute("href") ===
                    `#${id}`
                );

              });

            });

          },
          {
            rootMargin:
              "-35% 0px -55% 0px",

            threshold: 0
          }
        );


      sections.forEach(section => {

        sectionObserver.observe(
          section
        );

      });

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
      $$(".reveal");


    if (
      "IntersectionObserver" in window
    ) {

      revealElements.forEach(
        element => {

          const observer =
            new IntersectionObserver(
              entries => {

                if (
                  !entries[0].isIntersecting
                ) {
                  return;
                }


                element.classList.add(
                  "visible"
                );


                observer.disconnect();

              },
              {
                threshold: 0.12
              }
            );


          observer.observe(element);

        }
      );

    } else {

      revealElements.forEach(
        element => {

          element.classList.add(
            "visible"
          );

        }
      );

    }


    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(
      message,
      type = "success"
    ) {

      if (!toast) return;


      toast.textContent =
        message;


      toast.classList.remove(
        "error"
      );


      if (type === "error") {

        toast.classList.add(
          "error"
        );

      }


      toast.classList.add(
        "show"
      );


      clearTimeout(
        toastTimer
      );


      toastTimer =
        window.setTimeout(
          () => {

            toast.classList.remove(
              "show"
            );

          },
          3200
        );

    }


    /* =====================================================
       COPY TO CLIPBOARD
       ===================================================== */

    async function copyText(text) {

      try {

        if (
          navigator.clipboard &&
          navigator.clipboard.writeText
        ) {

          await navigator.clipboard.writeText(
            text
          );

        } else {

          const area =
            document.createElement(
              "textarea"
            );

          area.value = text;

          area.setAttribute(
            "readonly",
            ""
          );

          area.style.position =
            "fixed";

          area.style.opacity =
            "0";

          document.body.appendChild(
            area
          );

          area.select();

          document.execCommand(
            "copy"
          );

          area.remove();

        }


        showToast(
          "Copied to clipboard."
        );


      } catch {

        showToast(
          "Copy failed. Please select the text manually.",
          "error"
        );

      }

    }


    /* =====================================================
       MODAL
       ===================================================== */

    function openModal(
      title,
      html
    ) {

      if (
        !modal ||
        !modalTitle ||
        !modalContent
      ) {
        return;
      }


      modalTitle.textContent =
        title;


      modalContent.innerHTML =
        html;


      modal.classList.add(
        "is-open"
      );


      modal.setAttribute(
        "aria-hidden",
        "false"
      );


      document.body.classList.add(
        "modal-open"
      );


      window.setTimeout(
        () => {

          modalClose?.focus();

        },
        50
      );

    }


    function closeModal() {

      if (!modal) return;


      modal.classList.remove(
        "is-open"
      );


      modal.setAttribute(
        "aria-hidden",
        "true"
      );


      document.body.classList.remove(
        "modal-open"
      );

    }


    modalClose?.addEventListener(
      "click",
      closeModal
    );


    modal?.addEventListener(
      "click",
      event => {

        if (
          event.target === modal
        ) {

          closeModal();

        }

      }
    );


    /* =====================================================
       GOMEZ AI STUDIO DATA
       ===================================================== */

    const namesA = [
      "Nova",
      "Apex",
      "Nexa",
      "Vanta",
      "Vertex",
      "Luma",
      "Prime",
      "Orbit",
      "Elevate",
      "Pulse"
    ];


    const namesB = [
      "Digital",
      "Labs",
      "Studio",
      "AI",
      "Works",
      "Systems",
      "Media",
      "Hub",
      "Creative",
      "Tech"
    ];


    const styles = [
      "Warm luxury",
      "Futuristic dark",
      "Clean premium",
      "Bold editorial",
      "Minimal modern",
      "Immersive glass"
    ];


    const features = [
      "AI assistant",
      "Lead capture",
      "Booking system",
      "Analytics dashboard",
      "Client portal",
      "WhatsApp integration",
      "Interactive portfolio",
      "Automated enquiry flow"
    ];


    const captions = [

      "Build quietly. Let the results make the noise.",

      "Your next level needs a digital home.",

      "Don't just have a vision. Build the system behind it.",

      "Better ideas deserve better digital experiences.",

      "Think bigger. Build smarter. Move differently.",

      "The future belongs to people who create."

    ];


    /* =====================================================
       GENERATORS
       ===================================================== */

    function businessName() {

      return `
        ${random(namesA)}
        ${random(namesB)}
      `.replace(/\s+/g, " ").trim();

    }


    function websiteConcept() {

      const selected =
        [
          random(features),
          random(features),
          random(features)
        ];


      return {

        name:
          businessName(),

        style:
          random(styles),

        features:
          [...new Set(selected)]

      };

    }


    /* =====================================================
       BUSINESS NAME TOOL
       ===================================================== */

    function businessHTML() {

      const name =
        businessName();


      return `

        <div class="generated-result">

          <span class="result-label">
            GENERATED BRAND NAME
          </span>

          <h3>
            ${escapeHTML(name)}
          </h3>

          <p>
            A clean starting identity for
            a modern digital brand.
          </p>

          <button
            class="btn btn-primary"
            type="button"
            data-copy="${escapeHTML(name)}"
          >
            Copy name
          </button>

          <button
            class="btn btn-ghost"
            type="button"
            data-regenerate="business"
          >
            Generate another
          </button>

        </div>

      `;

    }


    /* =====================================================
       WEBSITE TOOL
       ===================================================== */

    function websiteHTML() {

      const concept =
        websiteConcept();


      return `

        <div class="generated-result">

          <span class="result-label">
            WEBSITE CONCEPT
          </span>

          <h3>
            ${escapeHTML(
              concept.name
            )}
          </h3>

          <p>
            <strong>
              Direction:
            </strong>

            ${escapeHTML(
              concept.style
            )}
          </p>

          <p>
            <strong>
              Suggested features:
            </strong>
          </p>

          <ul>

            ${concept.features
              .map(
                item =>
                  `<li>
                    ${escapeHTML(item)}
                  </li>`
              )
              .join("")}

          </ul>

          <button
            class="btn btn-primary"
            type="button"
            data-regenerate="website"
          >
            Generate another
          </button>

        </div>

      `;

    }


    /* =====================================================
       CONTENT TOOL
       ===================================================== */

    function captionHTML() {

      const caption =
        random(captions);


      return `

        <div class="generated-result">

          <span class="result-label">
            CONTENT SPARK
          </span>

          <h3>
            ${escapeHTML(caption)}
          </h3>

          <button
            class="btn btn-primary"
            type="button"
            data-copy="${escapeHTML(caption)}"
          >
            Copy caption
          </button>

          <button
            class="btn btn-ghost"
            type="button"
            data-regenerate="caption"
          >
            Generate another
          </button>

        </div>

      `;

    }


    /* =====================================================
       AI ROADMAP
       ===================================================== */

    function aiHTML() {

      return `

        <div class="generated-result">

          <span class="result-label">
            AI ROADMAP
          </span>

          <h3>
            Idea → System → Growth
          </h3>

          <p>
            Start with the problem, design
            the experience, automate repetitive
            work, then measure what users actually do.
          </p>

          <ul>

            <li>
              Define the customer problem
            </li>

            <li>
              Build the simplest useful interface
            </li>

            <li>
              Add automation where it saves time
            </li>

            <li>
              Connect analytics and improve
              continuously
            </li>

          </ul>

        </div>

      `;

    }


    /* =====================================================
       BRAND TOOL
       ===================================================== */

    function brandHTML() {

      const name =
        businessName();


      return `

        <div class="generated-result">

          <span class="result-label">
            BRAND SPARK
          </span>

          <h3>
            ${escapeHTML(name)}
          </h3>

          <p>
            Position it as a modern,
            confident brand with a warm
            visual identity and a clear promise.
          </p>

          <button
            class="btn btn-primary"
            type="button"
            data-copy="${escapeHTML(name)}"
          >
            Copy idea
          </button>

        </div>

      `;

    }


    /* =====================================================
       OPEN TOOL
       ===================================================== */

    function openTool(tool) {

      switch (
        String(tool).toLowerCase()
      ) {

        case "business":

          openModal(
            "Business Name Generator",
            businessHTML()
          );

          break;


        case "website":

          openModal(
            "Website Concept Generator",
            websiteHTML()
          );

          break;


        case "caption":

          openModal(
            "Content Spark",
            captionHTML()
          );

          break;


        case "ai":

          openModal(
            "AI Roadmap",
            aiHTML()
          );

          break;


        case "brand":

          openModal(
            "Brand Spark",
            brandHTML()
          );

          break;


        default:

          openModal(
            "Gomez Digital",
            `
              <div class="generated-result">

                <h3>
                  More tools are coming.
                </h3>

                <p>
                  This studio is designed
                  to grow.
                </p>

              </div>
            `
          );

      }

    }


    /* =====================================================
       AI TOOL BUTTONS
       ===================================================== */

    $$("[data-tool]").forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            openTool(
              button.dataset.tool
            );

          }
        );

      }
    );


    /* =====================================================
       MODAL ACTIONS
       ===================================================== */

    document.addEventListener(
      "click",
      event => {

        const copyButton =
          event.target.closest(
            "[data-copy]"
          );


        if (copyButton) {

          copyText(
            copyButton.dataset.copy ||
            ""
          );

          return;

        }


        const regenerate =
          event.target.closest(
            "[data-regenerate]"
          );


        if (!regenerate) return;


        const type =
          regenerate.dataset.regenerate;


        if (type === "business") {

          modalContent.innerHTML =
            businessHTML();

        }


        if (type === "website") {

          modalContent.innerHTML =
            websiteHTML();

        }


        if (type === "caption") {

          modalContent.innerHTML =
            captionHTML();

        }

      }
    );


    /* =====================================================
       PROJECT FORM
       ===================================================== */

    const projectForm =
      $("#project-form");


    projectForm?.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const formData =
          new FormData(projectForm);


        const project = {

          name:
            String(
              formData.get("name") ||
              ""
            ).trim(),

          email:
            String(
              formData.get("email") ||
              ""
            ).trim(),

          service:
            String(
              formData.get("service") ||
              ""
            ).trim(),

          budget:
            String(
              formData.get("budget") ||
              ""
            ).trim(),

          message:
            String(
              formData.get("message") ||
              ""
            ).trim(),

          createdAt:
            new Date().toISOString()

        };


        if (
          !project.name ||
          !project.email ||
          !project.message
        ) {

          showToast(
            "Please complete the required fields.",
            "error"
          );

          return;

        }


        const brief = [

          "GOMEZ DIGITAL — PROJECT BRIEF",

          "",

          `Name: ${project.name}`,

          `Email: ${project.email}`,

          `Service: ${project.service}`,

          `Budget: ${project.budget}`,

          "",

          "PROJECT:",

          project.message

        ].join("\n");


        /*
          Save the latest projects locally.
          This is temporary until we connect
          a real backend/form service.
        */

        try {

          const saved =
            JSON.parse(
              localStorage.getItem(
                "gomezDigitalProjects"
              ) || "[]"
            );


          saved.push(project);


          localStorage.setItem(
            "gomezDigitalProjects",
            JSON.stringify(
              saved.slice(-20)
            )
          );

        } catch {

          /*
            The form still works if
            browser storage is unavailable.
          */

        }


        projectForm.reset();


        copyText(brief);


        openModal(
          "Project brief ready",

          `

            <div class="generated-result">

              <span class="result-label">
                NEXT STEP
              </span>

              <h3>
                Your brief is ready.
              </h3>

              <p>
                The project details were
                prepared and copied to your
                clipboard.
              </p>

              <button
                class="btn btn-primary"
                type="button"
                data-copy="${escapeHTML(brief)}"
              >
                Copy brief again
              </button>

            </div>

          `
        );

      }
    );


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    if (year) {

      year.textContent =
        String(
          new Date().getFullYear()
        );

    }


    /* =====================================================
       SUBTLE CARD TILT
       ===================================================== */

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    if (
      !reducedMotion &&
      window.innerWidth > 700
    ) {

      $(
        ".service-card, .tool-card"
      ).forEach(card => {

        card.addEventListener(
          "pointermove",
          event => {

            const rect =
              card.getBoundingClientRect();


            const x =
              (
                (event.clientX -
                  rect.left) /
                  rect.width -
                0.5
              ) * 4;


            const y =
              (
                (event.clientY -
                  rect.top) /
                  rect.height -
                0.5
              ) * -4;


            card.style.transform =
              `
                translateY(-5px)
                rotateX(${y}deg)
                rotateY(${x}deg)
              `;

          }
        );


        card.addEventListener(
          "pointerleave",
          () => {

            card.style.transform =
              "";

          }
        );

      });

    }


    /* =====================================================
       PUBLIC GOMEZ DIGITAL API
       ===================================================== */

    window.GomezDigital =
      Object.freeze({

        openTool,

        openModal,

        closeModal

      });


    /* =====================================================
       SYSTEM READY
       ===================================================== */

    document.documentElement
      .classList
      .add("js-ready");


    console.log(
      "%c GOMEZ DIGITAL V4 ",
      "font-size:18px;font-weight:900;color:#ff9b42;"
    );

    console.log(
      "%c System initialized successfully.",
      "font-size:12px;color:#ffc45c;"
    );

  });

})();
