/* =========================================================
   GOMEZ DIGITAL V6
   script.js
   Stable + Responsive Interaction Build
   ========================================================= */

/*
 * =========================================================
 * EMERGENCY LOADER SAFETY
 * =========================================================
 *
 * This runs immediately, before the rest of the application.
 * If another JavaScript problem occurs, the website will still
 * become usable instead of remaining permanently on the loader.
 */

(function () {

  const emergencyHideLoader = function () {

    const loader = document.getElementById("loader");

    if (!loader) return;

    loader.classList.add("hidden");

    document.body.style.overflow = "";

  };

  /*
   * Absolute emergency fallback.
   * This timer exists outside DOMContentLoaded so that a
   * JavaScript error later in the application cannot prevent it.
   */

  window.setTimeout(emergencyHideLoader, 3500);

})();


/* =========================================================
   MAIN APPLICATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const loader =
    document.getElementById("loader");

  const siteHeader =
    document.getElementById("siteHeader");

  const menuToggle =
    document.getElementById("menuToggle");

  const mainNav =
    document.getElementById("mainNav");

  const currentYear =
    document.getElementById("currentYear");

  const revealElements =
    document.querySelectorAll(".reveal");

  const toolModal =
    document.getElementById("toolModal");

  const toolModalBackdrop =
    document.getElementById("toolModalBackdrop");

  const toolModalClose =
    document.getElementById("toolModalClose");

  const toolModalIcon =
    document.getElementById("toolModalIcon");

  const toolModalEyebrow =
    document.getElementById("toolModalEyebrow");

  const toolModalTitle =
    document.getElementById("toolModalTitle");

  const toolModalDescription =
    document.getElementById("toolModalDescription");

  const toolInputLabel =
    document.getElementById("toolInputLabel");

  const toolInput =
    document.getElementById("toolInput");

  const toolGenerate =
    document.getElementById("toolGenerate");

  const toolResult =
    document.getElementById("toolResult");

  const toolButtons =
    document.querySelectorAll(".tool-button");


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     LOADER
     ======================================================= */

  const hideLoader = function () {

    if (!loader) return;

    loader.classList.add("hidden");

    document.body.style.overflow = "";

  };


  /*
   * Prevent scrolling while the loader is visible.
   */

  document.body.style.overflow = "hidden";


  /*
   * Normal loader removal.
   */

  if (document.readyState === "complete") {

    window.setTimeout(hideLoader, 700);

  } else {

    window.addEventListener(
      "load",
      function () {

        window.setTimeout(
          hideLoader,
          700
        );

      },
      {
        once: true
      }
    );

  }


  /*
   * Secondary safety fallback.
   */

  window.setTimeout(
    hideLoader,
    3000
  );


  /* =======================================================
     HEADER SCROLL EFFECT
     ======================================================= */

  const updateHeader = function () {

    if (!siteHeader) return;

    if (window.scrollY > 35) {

      siteHeader.classList.add(
        "scrolled"
      );

    } else {

      siteHeader.classList.remove(
        "scrolled"
      );

    }

  };


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  if (menuToggle && mainNav) {

    menuToggle.addEventListener(
      "click",
      function () {

        const isOpen =
          mainNav.classList.toggle("open");

        menuToggle.classList.toggle(
          "active",
          isOpen
        );

        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    /*
     * Close menu after clicking a navigation link.
     */

    const navLinks =
      mainNav.querySelectorAll("a");

    navLinks.forEach(
      function (link) {

        link.addEventListener(
          "click",
          function () {

            mainNav.classList.remove(
              "open"
            );

            menuToggle.classList.remove(
              "active"
            );

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      }
    );


    /*
     * Close menu when clicking outside it.
     */

    document.addEventListener(
      "click",
      function (event) {

        const clickedInsideMenu =
          mainNav.contains(event.target);

        const clickedToggle =
          menuToggle.contains(event.target);

        if (
          !clickedInsideMenu &&
          !clickedToggle &&
          mainNav.classList.contains("open")
        ) {

          mainNav.classList.remove(
            "open"
          );

          menuToggle.classList.remove(
            "active"
          );

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );

  }


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  if (
    "IntersectionObserver" in window &&
    revealElements.length > 0
  ) {

    const revealObserver =
      new IntersectionObserver(
        function (entries, observer) {

          entries.forEach(
            function (entry) {

              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(
      function (element) {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    /*
     * Browser fallback.
     */

    revealElements.forEach(
      function (element) {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =======================================================
     SMOOTH ANCHOR NAVIGATION
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(
      function (link) {

        link.addEventListener(
          "click",
          function (event) {

            const targetId =
              link.getAttribute("href");

            if (
              !targetId ||
              targetId === "#"
            ) {

              return;

            }

            let target = null;

            try {

              target =
                document.querySelector(
                  targetId
                );

            } catch (error) {

              return;

            }

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }
        );

      }
    );


  /* =======================================================
     AI STUDIO CONFIGURATION
     ======================================================= */

  const toolData = {

    "business-name": {

      icon: "✦",

      eyebrow:
        "AI BUSINESS TOOL",

      title:
        "Business Name Generator",

      description:
        "Give us a short description of your business and generate name directions you can explore.",

      label:
        "What does your business do?",

      placeholder:
        "Example: A premium streetwear brand for young entrepreneurs."

    },


    "website-concept": {

      icon: "◇",

      eyebrow:
        "AI WEBSITE TOOL",

      title:
        "Website Concept Generator",

      description:
        "Describe your business and we'll create a starting direction for your website.",

      label:
        "Describe your business or idea",

      placeholder:
        "Example: A Botswana-based construction company serving commercial clients."

    },


    "content-spark": {

      icon: "✎",

      eyebrow:
        "AI CONTENT TOOL",

      title:
        "Content Spark",

      description:
        "Get content directions you can use to start building your digital presence.",

      label:
        "What is your brand about?",

      placeholder:
        "Example: A fitness coach helping busy students get stronger."

    },


    "ai-roadmap": {

      icon: "↗",

      eyebrow:
        "AI STRATEGY TOOL",

      title:
        "AI Roadmap",

      description:
        "Identify practical ways AI could support your business, workflow or customer experience.",

      label:
        "What does your business currently do?",

      placeholder:
        "Example: I run a small online clothing store and manage orders manually."

    }

  };


  let activeTool = null;


  /* =======================================================
     OPEN AI TOOL
     ======================================================= */

  const openTool = function (toolKey) {

    if (!toolModal) return;

    const data =
      toolData[toolKey];

    if (!data) return;

    activeTool = toolKey;


    if (toolModalIcon) {

      toolModalIcon.textContent =
        data.icon;

    }


    if (toolModalEyebrow) {

      toolModalEyebrow.textContent =
        data.eyebrow;

    }


    if (toolModalTitle) {

      toolModalTitle.textContent =
        data.title;

    }


    if (toolModalDescription) {

      toolModalDescription.textContent =
        data.description;

    }


    if (toolInputLabel) {

      toolInputLabel.textContent =
        data.label;

    }


    if (toolInput) {

      toolInput.value = "";

      toolInput.placeholder =
        data.placeholder;

    }


    if (toolResult) {

      toolResult.classList.remove(
        "show"
      );

      toolResult.innerHTML = "";

    }


    if (toolGenerate) {

      toolGenerate.disabled = false;

      toolGenerate.innerHTML =
        'Generate <span>✦</span>';

    }


    toolModal.classList.add(
      "active"
    );

    toolModal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );


    window.setTimeout(
      function () {

        if (toolInput) {

          toolInput.focus();

        }

      },
      250
    );

  };


  /* =======================================================
     CLOSE AI TOOL
     ======================================================= */

  const closeTool = function () {

    if (!toolModal) return;

    toolModal.classList.remove(
      "active"
    );

    toolModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

    activeTool = null;

  };


  /* =======================================================
     TOOL BUTTON EVENTS
     ======================================================= */

  toolButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const tool =
            button.getAttribute(
              "data-tool"
            );

          if (!tool) return;

          openTool(tool);

        }
      );

    }
  );


  if (toolModalClose) {

    toolModalClose.addEventListener(
      "click",
      closeTool
    );

  }


  if (toolModalBackdrop) {

    toolModalBackdrop.addEventListener(
      "click",
      closeTool
    );

  }


  /* =======================================================
     ESCAPE KEY
     ======================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        toolModal &&
        toolModal.classList.contains(
          "active"
        )
      ) {

        closeTool();

      }

    }
  );


  /* =======================================================
     INPUT HELPERS
     ======================================================= */

  const cleanInput = function (value) {

    return value
      .trim()
      .replace(/\s+/g, " ");

  };


  const capitalizeWords = function (text) {

    return text
      .split(" ")
      .map(
        function (word) {

          if (!word) return "";

          return (
            word.charAt(0).toUpperCase() +
            word.slice(1)
          );

        }
      )
      .join(" ");

  };


  /* =======================================================
     BUSINESS NAME GENERATOR
     ======================================================= */

  const generateBusinessNames =
    function (input) {

      const words =
        input
          .replace(/[^\w\s]/g, "")
          .split(" ")
          .filter(Boolean);

      const first =
        words[0]
          ? capitalizeWords(words[0])
          : "Nova";

      const second =
        words[1]
          ? capitalizeWords(words[1])
          : "Labs";


      return `
        <strong>Possible directions</strong>

        <ul>
          <li>${first} Digital</li>
          <li>${first} ${second}</li>
          <li>${first} Labs</li>
          <li>${second} Studio</li>
          <li>${first} Collective</li>
        </ul>

        <small>
          These are creative starting points — check
          trademark, domain and social availability
          before choosing a final name.
        </small>
      `;

    };


  /* =======================================================
     WEBSITE CONCEPT GENERATOR
     ======================================================= */

  const generateWebsiteConcept =
    function (input) {

      return `
        <strong>
          Suggested website direction
        </strong>

        <p>
          <b>Positioning:</b>
          Present ${input} as a modern, trustworthy
          solution with a clear value proposition.
        </p>

        <p>
          <b>Hero:</b>
          A strong headline explaining the main customer
          benefit, followed by one primary call-to-action.
        </p>

        <p>
          <b>Core sections:</b>
          Services, benefits, how it works, proof/results,
          FAQ and a clear contact or enquiry section.
        </p>

        <p>
          <b>Conversion goal:</b>
          Make it immediately obvious what the visitor
          should do next.
        </p>
      `;

    };


  /* =======================================================
     CONTENT SPARK
     ======================================================= */

  const generateContentSpark =
    function (input) {

      return `
        <strong>
          Content ideas for your brand
        </strong>

        <ol>

          <li>
            <b>The Problem:</b>
            Explain the biggest problem your audience faces.
          </li>

          <li>
            <b>Behind the Scenes:</b>
            Show how your product or service actually works.
          </li>

          <li>
            <b>Quick Win:</b>
            Give your audience one useful tip they can
            implement immediately.
          </li>

          <li>
            <b>Myth vs Reality:</b>
            Challenge a common misconception in your industry.
          </li>

          <li>
            <b>Customer Story:</b>
            Show a real transformation, result or experience.
          </li>

        </ol>

        <small>
          Brand context:
          ${input}
        </small>
      `;

    };


  /* =======================================================
     AI ROADMAP
     ======================================================= */

  const generateAIRoadmap =
    function (input) {

      return `
        <strong>
          Potential AI opportunities
        </strong>

        <ol>

          <li>
            <b>Automate repetitive tasks</b>
            such as data entry, follow-ups or routine communication.
          </li>

          <li>
            <b>Improve customer support</b>
            with an AI-assisted FAQ or knowledge system.
          </li>

          <li>
            <b>Speed up content creation</b>
            using structured AI workflows.
          </li>

          <li>
            <b>Organize information</b>
            so important business data can be found faster.
          </li>

          <li>
            <b>Build a simple dashboard</b>
            for tracking useful business metrics.
          </li>

        </ol>

        <small>
          Business context:
          ${input}
        </small>
      `;

    };


  /* =======================================================
     GENERATE TOOL RESULT
     ======================================================= */

  const generateToolResult =
    function () {

      if (!activeTool) return;

      const input =
        toolInput
          ? cleanInput(toolInput.value)
          : "";


      if (!input) {

        if (toolResult) {

          toolResult.innerHTML = `
            <strong>
              Give us a little more information.
            </strong>

            <p>
              Enter a short description above so the tool
              can generate a useful starting point.
            </p>
          `;

          toolResult.classList.add(
            "show"
          );

        }

        return;

      }


      if (toolGenerate) {

        toolGenerate.disabled = true;

        toolGenerate.innerHTML =
          "Generating...";

      }


      if (toolResult) {

        toolResult.classList.remove(
          "show"
        );

        toolResult.innerHTML = "";

      }


      window.setTimeout(
        function () {

          let result = "";


          switch (activeTool) {

            case "business-name":

              result =
                generateBusinessNames(
                  input
                );

              break;


            case "website-concept":

              result =
                generateWebsiteConcept(
                  input
                );

              break;


            case "content-spark":

              result =
                generateContentSpark(
                  input
                );

              break;


            case "ai-roadmap":

              result =
                generateAIRoadmap(
                  input
                );

              break;


            default:

              result = `
                <strong>
                  Something went wrong.
                </strong>

                <p>
                  Please try again.
                </p>
              `;

          }


          if (toolResult) {

            toolResult.innerHTML =
              result;

            toolResult.classList.add(
              "show"
            );

          }


          if (toolGenerate) {

            toolGenerate.disabled = false;

            toolGenerate.innerHTML =
              'Generate <span>✦</span>';

          }

        },
        650
      );

    };


  if (toolGenerate) {

    toolGenerate.addEventListener(
      "click",
      generateToolResult
    );

  }


  /* =======================================================
     ENTER / CTRL + ENTER
     ======================================================= */

  if (toolInput) {

    toolInput.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Enter" &&
          (event.ctrlKey || event.metaKey)
        ) {

          event.preventDefault();

          generateToolResult();

        }

      }
    );

  }


  /* =======================================================
     FAQ
     ======================================================= */

  const faqItems =
    document.querySelectorAll(
      ".faq-item"
    );


  faqItems.forEach(
    function (item) {

      item.addEventListener(
        "toggle",
        function () {

          if (!item.open) return;

          faqItems.forEach(
            function (otherItem) {

              if (
                otherItem !== item &&
                otherItem.open
              ) {

                otherItem.open = false;

              }

            }
          );

        }
      );

    }
  );


  /* =======================================================
     HERO VISUAL EFFECT
     ======================================================= */

  const heroVisual =
    document.querySelector(
      ".hero-visual"
    );


  if (
    heroVisual &&
    window.matchMedia &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    const frame =
      heroVisual.querySelector(
        ".visual-frame"
      );


    if (frame) {

      heroVisual.addEventListener(
        "mousemove",
        function (event) {

          const rect =
            heroVisual.getBoundingClientRect();

          if (
            !rect.width ||
            !rect.height
          ) {

            return;

          }


          const x =
            (event.clientX - rect.left) /
            rect.width;

          const y =
            (event.clientY - rect.top) /
            rect.height;


          const rotateY =
            (x - 0.5) * 5;

          const rotateX =
            (0.5 - y) * 4;


          frame.style.transform =
            `
            perspective(1300px)
            rotateY(${rotateY - 2}deg)
            rotateX(${rotateX}deg)
            translateY(-3px)
            `;

        }
      );


      heroVisual.addEventListener(
        "mouseleave",
        function () {

          frame.style.transform =
            `
            perspective(1300px)
            rotateY(-5deg)
            rotateX(2deg)
            `;

        }
      );

    }

  }


  /* =======================================================
     RESIZE SAFETY
     ======================================================= */

  /*
   * If the user rotates a phone, resizes a browser,
   * or changes between responsive layouts, close the
   * mobile navigation when the viewport becomes wider.
   */

  window.addEventListener(
    "resize",
    function () {

      if (
        window.innerWidth > 900 &&
        mainNav &&
        menuToggle
      ) {

        mainNav.classList.remove(
          "open"
        );

        menuToggle.classList.remove(
          "active"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    },
    {
      passive: true
    }
  );


  /* =======================================================
     FINAL INITIALIZATION
     ======================================================= */

  updateHeader();

});
