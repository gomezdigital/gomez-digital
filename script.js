/* =========================================================
   GOMEZ DIGITAL V4
   Main JavaScript
   ========================================================= */

(function () {
    "use strict";

    /* -------------------------------------------------------
       SAFE DOM READY
    ------------------------------------------------------- */

    document.addEventListener("DOMContentLoaded", function () {

        /* ---------------------------------------------------
           ELEMENTS
        --------------------------------------------------- */

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


        /* ===================================================
           1. LOADER
           =================================================== */

        function removeLoader() {

            if (!loader) {
                return;
            }

            loader.classList.add("is-hidden");
            loader.setAttribute("aria-hidden", "true");

            window.setTimeout(function () {

                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }

            }, 800);
        }

        /*
         * Normal loader removal.
         */
        window.setTimeout(removeLoader, 1500);

        /*
         * Absolute emergency protection.
         * Even if another part of this script fails,
         * the page will not remain stuck behind the loader.
         */
        window.setTimeout(removeLoader, 2800);


        /* ===================================================
           2. HEADER SCROLL EFFECT
           =================================================== */

        function updateHeader() {

            if (!header) {
                return;
            }

            if (window.scrollY > 30) {
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


        /* ===================================================
           3. MOBILE NAVIGATION
           =================================================== */

        function closeMenu() {

            if (!siteNav || !menuToggle) {
                return;
            }

            siteNav.classList.remove("open");

            menuToggle.classList.remove("open");

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

            menuToggle.classList.add("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation"
            );
        }


        if (menuToggle && siteNav) {

            menuToggle.addEventListener(
                "click",
                function () {

                    var isOpen =
                        siteNav.classList.contains("open");

                    if (isOpen) {
                        closeMenu();
                    } else {
                        openMenu();
                    }

                }
            );


            var navLinks =
                siteNav.querySelectorAll("a");

            navLinks.forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {
                        closeMenu();
                    }
                );

            });


            window.addEventListener(
                "resize",
                function () {

                    if (window.innerWidth > 850) {
                        closeMenu();
                    }

                }
            );
        }


        /* ===================================================
           4. SMOOTH SCROLL
           =================================================== */

        var anchorLinks =
            document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    var targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    var target =
                        document.querySelector(targetId);

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


        /* ===================================================
           5. REVEAL ANIMATIONS
           =================================================== */

        var revealElements =
            document.querySelectorAll(".reveal");


        if ("IntersectionObserver" in window) {

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

            /*
             * Older browser fallback.
             */
            revealElements.forEach(
                function (element) {

                    element.classList.add("visible");

                }
            );
        }


        /* ===================================================
           6. ACTIVE NAVIGATION
           =================================================== */

        var sections =
            document.querySelectorAll(
                "main section[id]"
            );

        var navigationLinks =
            document.querySelectorAll(
                ".site-nav a[href^='#']"
            );


        function setActiveNavigation(id) {

            navigationLinks.forEach(
                function (link) {

                    var href =
                        link.getAttribute("href");

                    if (href === "#" + id) {

                        link.classList.add("active");

                    } else {

                        link.classList.remove("active");

                    }

                }
            );
        }


        if (
            "IntersectionObserver" in window &&
            sections.length
        ) {

            var sectionObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    setActiveNavigation(
                                        entry.target.id
                                    );

                                }

                            }
                        );

                    },
                    {
                        rootMargin:
                            "-35% 0px -55% 0px",
                        threshold: 0
                    }
                );


            sections.forEach(
                function (section) {

                    sectionObserver.observe(section);

                }
            );
        }


        /* ===================================================
           7. TOAST
           =================================================== */

        var toastTimer = null;


        function showToast(message) {

            if (!toast) {
                return;
            }

            if (toastMessage) {
                toastMessage.textContent = message;
            }

            toast.classList.add("show");

            if (toastTimer) {
                window.clearTimeout(toastTimer);
            }

            toastTimer =
                window.setTimeout(
                    function () {

                        toast.classList.remove("show");

                    },
                    3000
                );
        }


        /* ===================================================
           8. CLIPBOARD
           =================================================== */

        function copyText(text) {

            if (!text) {
                return Promise.reject(
                    new Error("Nothing to copy")
                );
            }


            if (
                navigator.clipboard &&
                navigator.clipboard.writeText
            ) {

                return navigator.clipboard.writeText(text);

            }


            /*
             * Fallback for older mobile browsers.
             */

            return new Promise(
                function (resolve, reject) {

                    var textarea =
                        document.createElement("textarea");

                    textarea.value = text;

                    textarea.style.position = "fixed";
                    textarea.style.opacity = "0";
                    textarea.style.pointerEvents = "none";

                    document.body.appendChild(
                        textarea
                    );

                    textarea.focus();
                    textarea.select();

                    try {

                        var successful =
                            document.execCommand(
                                "copy"
                            );

                        document.body.removeChild(
                            textarea
                        );

                        if (successful) {
                            resolve();
                        } else {
                            reject(
                                new Error("Copy failed")
                            );
                        }

                    } catch (error) {

                        document.body.removeChild(
                            textarea
                        );

                        reject(error);

                    }

                }
            );
        }


        /* ===================================================
           9. MODAL
           =================================================== */

        var currentTool = null;


        function openModal(title, content) {

            if (
                !modal ||
                !modalTitle ||
                !modalContent
            ) {
                return;
            }

            modalTitle.textContent = title;

            modalContent.innerHTML = content;

            modal.classList.add("open");

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

            modal.classList.remove("open");

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


        if (modal) {

            var modalBackdrop =
                modal.querySelector(
                    ".modal-backdrop"
                );

            if (modalBackdrop) {

                modalBackdrop.addEventListener(
                    "click",
                    closeModal
                );

            }

        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {
                    closeModal();
                }

            }
        );


        /* ===================================================
           10. AI TOOL GENERATORS
           =================================================== */

        var businessNames = [
            "NovaForge",
            "BrightCore",
            "VantaFlow",
            "Nexora",
            "Elevora",
            "Lumina Labs",
            "PrimeShift",
            "VertexOne",
            "Boldora",
            "MomentumX"
        ];


        var websiteIdeas = [
            "A premium dark-mode business website with warm gold accents, animated statistics and a powerful conversion-focused hero.",
            "A modern AI consultancy website with interactive tools, glass panels and a futuristic but human visual identity.",
            "A clean personal brand website with an editorial layout, strong typography and animated project showcases.",
            "A high-energy startup landing page with interactive cards, customer proof and bold calls to action.",
            "A luxury service brand website using warm gradients, elegant typography and subtle motion."
        ];


        var contentIdeas = [
            "Your website is not just a page. It is your first salesperson.",
            "Stop waiting for the perfect idea. Build the first version and improve it.",
            "AI doesn't replace ambition. It amplifies people who know how to use it.",
            "Your digital presence should work while you sleep.",
            "Small businesses don't need to look small online."
        ];


        var roadmapIdeas = [
            "Automate customer FAQs → collect leads → organize prospects → follow up automatically.",
            "Create an AI content system → generate ideas → write drafts → schedule publishing.",
            "Build a lead funnel → landing page → contact form → automated response → sales follow-up.",
            "Turn repetitive admin work into a workflow using forms, AI processing and automated notifications.",
            "Build a customer support assistant that answers common questions and directs complex requests to a human."
        ];


        function randomItem(array) {

            return array[
                Math.floor(
                    Math.random() * array.length
                )
            ];

        }


        function generateBusinessName() {

            return (
                '<div class="generated-result">' +

                '<span class="result-label">' +
                'BRAND NAME IDEA' +
                '</span>' +

                '<strong class="generated-name">' +
                randomItem(businessNames) +
                '</strong>' +

                '<p>' +
                'A modern, flexible name designed for a digital-first brand.' +
                '</p>' +

                '</div>'
            );

        }


        function generateWebsiteConcept() {

            return (
                '<div class="generated-result">' +

                '<span class="result-label">' +
                'WEBSITE CONCEPT' +
                '</span>' +

                '<p>' +
                randomItem(websiteIdeas) +
                '</p>' +

                '<div class="result-mini">' +
                '<strong>Recommended sections</strong>' +
                '<span>Hero • Services • Proof • About • CTA</span>' +
                '</div>' +

                '</div>'
            );

        }


        function generateContentSpark() {

            return (
                '<div class="generated-result">' +

                '<span class="result-label">' +
                'CONTENT SPARK' +
                '</span>' +

                '<blockquote>' +
                randomItem(contentIdeas) +
                '</blockquote>' +

                '<p>' +
                'Turn this idea into a short video, carousel, post or campaign.' +
                '</p>' +

                '</div>'
            );

        }


        function generateAIRoadmap() {

            return (
                '<div class="generated-result">' +

                '<span class="result-label">' +
                'AI ROADMAP' +
                '</span>' +

                '<p>' +
                randomItem(roadmapIdeas) +
                '</p>' +

                '<div class="result-mini">' +
                '<strong>Start small</strong>' +
                '<span>Automate one repetitive task first, then expand.</span>' +
                '</div>' +

                '</div>'
            );

        }


        function generateTool(tool) {

            switch (tool) {

                case "business-name":
                    return {
                        title: "Business Name Generator",
                        content: generateBusinessName()
                    };

                case "website-concept":
                    return {
                        title: "Website Concept Generator",
                        content: generateWebsiteConcept()
                    };

                case "content-spark":
                    return {
                        title: "Content Spark",
                        content: generateContentSpark()
                    };

                case "ai-roadmap":
                    return {
                        title: "AI Roadmap",
                        content: generateAIRoadmap()
                    };

                default:
                    return {
                        title: "Gomez Digital AI",
                        content:
                            "<p>Choose one of the AI tools to begin.</p>"
                    };
            }

        }


        /* ===================================================
           11. AI TOOL BUTTONS
           =================================================== */

        var toolButtons =
            document.querySelectorAll(
                "[data-tool]"
            );


        toolButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        var tool =
                            button.getAttribute(
                                "data-tool"
                            );

                        currentTool = tool;

                        var result =
                            generateTool(tool);

                        openModal(
                            result.title,
                            result.content
                        );

                    }
                );

            }
        );


        /* ===================================================
           12. COPY RESULT
           =================================================== */

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

                    var text =
                        modalContent.innerText.trim();

                    copyText(text)
                        .then(
                            function () {

                                showToast(
                                    "Result copied to clipboard."
                                );

                            }
                        )
                        .catch(
                            function () {

                                showToast(
                                    "Could not copy automatically."
                                );

                            }
                        );

                }
            );

        }


        /* ===================================================
           13. REGENERATE
           =================================================== */

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

                    openModal(
                        result.title,
                        result.content
                    );

                }
            );

        }


        /* ===================================================
           14. PROJECT FORM
           =================================================== */

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
