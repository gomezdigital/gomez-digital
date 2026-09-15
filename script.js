/* =========================================================
   GOMEZ DIGITAL V5
   Main JavaScript
   ========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    var loader = document.getElementById("page-loader");
    var header = document.getElementById("site-header");

    var menuToggle = document.getElementById("menu-toggle");
    var siteNav = document.getElementById("site-nav");

    var modal = document.getElementById("modal");
    var modalClose = document.getElementById("modal-close");
    var modalTitle = document.getElementById("modal-title");
    var modalContent = document.getElementById("modal-content");

    var toast = document.getElementById("toast");
    var toastMessage = document.getElementById("toast-message");

    var year = document.getElementById("year");
    var projectForm = document.getElementById("project-form");

    var currentTool = "";

    /* =====================================================
       YEAR
       ===================================================== */

    if (year) {
      year.textContent = new Date().getFullYear();
    }

    /* =====================================================
       LOADER
       ===================================================== */

    function removeLoader() {

      if (!loader) {
        return;
      }

      loader.classList.add("is-hidden");

      loader.setAttribute(
        "aria-hidden",
        "true"
      );

      window.setTimeout(function () {

        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }

      }, 800);
    }

    window.setTimeout(
      removeLoader,
      900
    );

    window.setTimeout(
      removeLoader,
      2500
    );

    /* =====================================================
       HEADER
       ===================================================== */

    function updateHeader() {

      if (!header) {
        return;
      }

      if (window.scrollY > 25) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    window.addEventListener(
      "scroll",
      updateHeader,
      { passive: true }
    );

    updateHeader();

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    function closeMenu() {

      if (!siteNav || !menuToggle) {
        return;
      }

      siteNav.classList.remove("open");
      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );
    }

    function openMenu() {

      if (!siteNav || !menuToggle) {
        return;
      }

      siteNav.classList.add("open");
      menuToggle.classList.add("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "true"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Close navigation"
      );
    }

    if (menuToggle) {

      menuToggle.addEventListener(
        "click",
        function () {

          if (
            siteNav &&
            siteNav.classList.contains("open")
          ) {
            closeMenu();
          } else {
            openMenu();
          }

        }
      );

    }

    if (siteNav) {

      siteNav
        .querySelectorAll("a")
        .forEach(function (link) {

          link.addEventListener(
            "click",
            closeMenu
          );

        });

    }

    window.addEventListener(
      "resize",
      function () {

        if (window.innerWidth > 850) {
          closeMenu();
        }

      }
    );

    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document
      .querySelectorAll('a[href^="#"]')
      .forEach(function (link) {

        link.addEventListener(
          "click",
          function (event) {

            var href = link.getAttribute("href");

            if (
              !href ||
              href === "#" ||
              href.length < 2
            ) {
              return;
            }

            var target = document.querySelector(href);

            if (!target) {
              return;
            }

            event.preventDefault();

            var headerHeight =
              header
                ? header.offsetHeight
                : 0;

            var targetPosition =
              target.getBoundingClientRect().top +
              window.pageYOffset -
              headerHeight -
              15;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });

          }
        );

      });

    /* =====================================================
       REVEAL ANIMATIONS
       ===================================================== */

    var revealElements =
      document.querySelectorAll(".reveal");

    if (
      "IntersectionObserver" in window
    ) {

      var revealObserver =
        new IntersectionObserver(
          function (entries, observer) {

            entries.forEach(
              function (entry) {

                if (
                  entry.isIntersecting
                ) {

                  entry.target.classList.add(
                    "visible"
                  );

                  observer.unobserve(
                    entry.target
                  );

                }

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

          revealObserver.observe(element);

        }
      );

    } else {

      revealElements.forEach(
        function (element) {

          element.classList.add(
            "visible"
          );

        }
      );

    }

    /* =====================================================
       TOAST
       ===================================================== */

    var toastTimer = null;

    function showToast(message) {

      if (!toast || !toastMessage) {
        return;
      }

      toastMessage.textContent = message;

      toast.classList.add("show");

      if (toastTimer) {
        window.clearTimeout(toastTimer);
      }

      toastTimer = window.setTimeout(
        function () {

          toast.classList.remove("show");

        },
        3000
      );
    }

    /* =====================================================
       COPY
       ===================================================== */

    function copyText(text) {

      if (!text) {
        return;
      }

      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {

        navigator.clipboard
          .writeText(text)
          .then(function () {

            showToast(
              "Result copied to clipboard."
            );

          })
          .catch(function () {

            fallbackCopy(text);

          });

      } else {

        fallbackCopy(text);

      }
    }

    function fallbackCopy(text) {

      var textarea =
        document.createElement("textarea");

      textarea.value = text;

      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(
        textarea
      );

      textarea.focus();
      textarea.select();

      try {

        document.execCommand(
          "copy"
        );

        showToast(
          "Result copied to clipboard."
        );

      } catch (error) {

        showToast(
          "Copy failed. Please select the text manually."
        );

      }

      document.body.removeChild(
        textarea
      );
    }

    /* =====================================================
       MODAL
       ===================================================== */

    function openModal(
      title,
      content
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
        content;

      modal.classList.add(
        "open"
      );

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.classList.add(
        "modal-active"
      );

    }

    function closeModal() {

      if (!modal) {
        return;
      }

      modal.classList.remove(
        "open"
      );

      modal.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.classList.remove(
        "modal-active"
      );

    }

    if (modalClose) {

      modalClose.addEventListener(
        "click",
        closeModal
      );

    }

    var modalBackdrop =
      modal
        ? modal.querySelector(".modal-backdrop")
        : null;

    if (modalBackdrop) {

      modalBackdrop.addEventListener(
        "click",
        closeModal
      );

    }

    document.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Escape"
        ) {
          closeModal();
        }

      }
    );

    /* =====================================================
       AI DATA
       ===================================================== */

    var businessNames = [
      "Nexora",
      "Velora",
      "Gomexa",
      "Lumora",
      "Novexa",
      "Vantora",
      "Elevora",
      "Zentra",
      "Movexa",
      "Aurevia",
      "Fluxora",
      "BrightForge"
    ];

    var websiteIdeas = [
      {
        title: "Premium Local Business",
        text:
          "A polished website for a growing local business with strong services, testimonials, pricing and a conversion-focused contact section."
      },
      {
        title: "Creator Command Center",
        text:
          "A personal platform combining a creator portfolio, digital products, social links, newsletter and community funnel."
      },
      {
        title: "AI Service Studio",
        text:
          "A modern AI-powered service website where visitors can discover tools, generate ideas and request custom solutions."
      },
      {
        title: "Startup Launch Page",
        text:
          "A high-impact landing page explaining a new product, its problem, solution, benefits, proof and call to action."
      }
    ];

    var contentIdeas = [
      "Explain the biggest problem your audience faces and show your simple solution.",
      "Show how your product or service saves someone time.",
      "Tell the story behind why you started.",
      "Share three mistakes beginners make in your industry.",
      "Create a before-and-after transformation.",
      "Answer the question customers ask you most.",
      "Show the process behind your work.",
      "Turn one customer problem into a short educational series."
    ];

    var roadmapIdeas = [
      {
        title: "Foundation",
        text:
          "Define the audience, offer, brand identity and one clear business goal."
      },
      {
        title: "Digital Presence",
        text:
          "Build a professional website, social profiles and a simple lead-generation system."
      },
      {
        title: "Content Engine",
        text:
          "Create repeatable content pillars and a weekly publishing workflow."
      },
      {
        title: "Automation",
        text:
          "Identify repetitive tasks and connect forms, communication and follow-ups."
      },
      {
        title: "Optimization",
        text:
          "Track what works, improve conversion points and double down on your strongest channels."
      }
    ];

    /* =====================================================
       RANDOM
       ===================================================== */

    function randomItem(array) {

      return array[
        Math.floor(
          Math.random() * array.length
        )
      ];

    }

    /* =====================================================
       TOOL GENERATORS
       ===================================================== */

    function generateBusinessName() {

      var name =
        randomItem(
          businessNames
        );

      return {
        title: "Business Name",
        html:
          '<div class="result-box">' +

          '<span class="result-label">' +
          'GENERATED BRAND' +
          '</span>' +

          '<h3 class="result-title">' +
          name +
          '</h3>' +

          '<p class="result-text">' +
          'A short, modern and flexible name that could work well for a digital-first brand.' +
          '</p>' +

          '</div>'
      };

    }

    function generateWebsiteConcept() {

      var idea =
        randomItem(
          websiteIdeas
        );

      return {
        title: "Website Concept",
        html:
          '<div class="result-box">' +

          '<span class="result-label">' +
          'CONCEPT' +
          '</span>' +

          '<h3 class="result-title">' +
          idea.title +
          '</h3>' +

          '<p class="result-text">' +
          idea.text +
          '</p>' +

          '</div>'
      };

    }

    function generateContentSpark() {

      var idea =
        randomItem(
          contentIdeas
        );

      return {
        title: "Content Spark",
        html:
          '<div class="result-box">' +

          '<span class="result-label">' +
          'CONTENT IDEA' +
          '</span>' +

          '<h3 class="result-title">' +
          'Create this post' +
          '</h3>' +

          '<p class="result-text">' +
          idea +
          '</p>' +

          '</div>'
      };

    }

    function generateRoadmap() {

      var shuffled =
        roadmapIdeas
          .slice()
          .sort(
            function () {
              return 0.5 -
                Math.random();
            }
          )
          .slice(0, 4);

      var list =
        shuffled
          .map(
            function (item) {

              return (
                "<li>" +
                "<strong>" +
                item.title +
                ":</strong> " +
                item.text +
                "</li>"
              );

            }
          )
          .join("");

      return {
        title: "AI Growth Roadmap",
        html:
          '<div class="result-box">' +

          '<span class="result-label">' +
          'YOUR ROADMAP' +
          '</span>' +

          '<ul class="result-list">' +
          list +
          '</ul>' +

          '</div>'
      };

    }

    function generateTool(tool) {

      switch (tool) {

        case "business-name":
          return generateBusinessName();

        case "website-concept":
          return generateWebsiteConcept();

        case "content-spark":
          return generateContentSpark();

        case "ai-roadmap":
          return generateRoadmap();

        default:
          return {
            title: "Gomez AI",
            html:
              '<div class="result-box">' +
              '<p class="result-text">' +
              'Choose a tool to generate something.' +
              '</p>' +
              '</div>'
          };

      }

    }

    /* =====================================================
       AI TOOL BUTTONS
       ===================================================== */

    document
      .querySelectorAll("[data-tool]")
      .forEach(function (button) {

        button.addEventListener(
          "click",
          function () {

            currentTool =
              button.getAttribute(
                "data-tool"
              );

            var result =
              generateTool(
                currentTool
              );

            openModal(
              result.title,
              result.html
            );

          }
        );

      });

    /* =====================================================
       COPY RESULT
       ===================================================== */

    var copyButton =
      document.querySelector(
        "[data-copy]"
      );

    if (copyButton) {

      copyButton.addEventListener(
        "click",
        function () {

          if (!modalContent) {
            return;
          }

          copyText(
            modalContent.innerText
          );

        }
      );

    }

    /* =====================================================
       REGENERATE
       ===================================================== */

    var regenerateButton =
      document.querySelector(
        "[data-regenerate]"
      );

    if (regenerateButton) {

      regenerateButton.addEventListener(
        "click",
        function () {

          if (!currentTool) {
            return;
          }

          var result =
            generateTool(
              currentTool
            );

          if (modalTitle) {
            modalTitle.textContent =
              result.title;
          }

          if (modalContent) {
            modalContent.innerHTML =
              result.html;
          }

          showToast(
            "New result generated."
          );

        }
      );

    }

    /* =====================================================
       PROJECT FORM
       ===================================================== */

    if (projectForm) {

      projectForm.addEventListener(
        "submit",
        function (event) {

          event.preventDefault();

          var name =
            document.getElementById(
              "name"
            );

          var business =
            document.getElementById(
              "business"
            );

          var email =
            document.getElementById(
              "email"
            );

          var phone =
            document.getElementById(
              "phone"
            );

          var service =
            document.getElementById(
              "service"
            );

          var details =
            document.getElementById(
              "details"
            );

          var projectName =
            name
              ? name.value.trim()
              : "";

          var projectBusiness =
            business
              ? business.value.trim()
              : "";

          var projectEmail =
            email
              ? email.value.trim()
              : "";

          var projectPhone =
            phone
              ? phone.value.trim()
              : "";

          var projectService =
            service
              ? service.value
              : "";

          var projectDetails =
            details
              ? details.value.trim()
              : "";

          if (
            !projectName ||
            !projectEmail ||
            !projectService ||
            !projectDetails
          ) {

            showToast(
              "Please complete the required fields."
            );

            return;

          }

          var subject =
            encodeURIComponent(
              "New Gomez Digital Project — " +
              projectName
            );

          var body =
            encodeURIComponent(
              "NEW GOMEZ DIGITAL PROJECT\n\n" +

              "Name: " +
              projectName +
              "\n" +

              "Business / Brand: " +
              (
                projectBusiness ||
                "Not provided"
              ) +
              "\n" +

              "Email: " +
              projectEmail +
              "\n" +

              "Phone: " +
              (
                projectPhone ||
                "Not provided"
              ) +
              "\n" +

              "Service: " +
              projectService +
              "\n\n" +

              "Project details:\n" +
              projectDetails
            );

          /*
             Replace this email address with the actual
             Gomez Digital business email before launch.
          */

          var destination =
            "mailto:?subject=" +
            subject +
            "&body=" +
            body;

          window.location.href =
            destination;

          showToast(
            "Project brief prepared."
          );

        }
      );

    }

    /* =====================================================
       FAQ
       ===================================================== */

    var faqItems =
      document.querySelectorAll(
        ".faq-item"
      );

    faqItems.forEach(
      function (item) {

        item.addEventListener(
          "toggle",
          function () {

            if (!item.open) {
              return;
            }

            faqItems.forEach(
              function (other) {

                if (
                  other !== item
                ) {
                  other.removeAttribute(
                    "open"
                  );
                }

              }
            );

          }
        );

      }
    );

  });

})();
