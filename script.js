/* =========================================================
   GOMEZ DIGITAL V5
   MAIN JAVASCRIPT
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DOM READY
    ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        var loader = document.getElementById("pageLoader");

        var header = document.getElementById("siteHeader");

        var nav = document.getElementById("nav");

        var navLinks = document.getElementById("navLinks");

        var menuToggle = document.getElementById("menuToggle");

        var backToTop = document.getElementById("backToTop");

        var aiModal = document.getElementById("aiModal");

        var modalOverlay =
            document.getElementById("modalOverlay");

        var modalClose =
            document.getElementById("modalClose");

        var modalTitle =
            document.getElementById("modalTitle");

        var modalDescription =
            document.getElementById("modalDescription");

        var aiForm =
            document.getElementById("aiForm");

        var aiInput =
            document.getElementById("aiInput");

        var aiLabel =
            document.getElementById("aiLabel");

        var aiResult =
            document.getElementById("aiResult");

        var year =
            document.getElementById("year");


        /* =================================================
           FOOTER YEAR
        ================================================= */

        if (year) {

            year.textContent =
                new Date().getFullYear();

        }


        /* =================================================
           PAGE LOADER
        ================================================= */

        function hideLoader() {

            if (!loader) {
                return;
            }

            loader.classList.add("hidden");

            document.body.classList.remove(
                "loading"
            );

        }


        document.body.classList.add("loading");


        /*
         * Normal loader timing
         */

        window.setTimeout(
            hideLoader,
            1500
        );


        /*
         * Emergency fallback.
         * Prevents the loader from ever becoming
         * permanently stuck.
         */

        window.setTimeout(
            hideLoader,
            3500
        );


        /*
         * If the page has already loaded,
         * remove the loader shortly after.
         */

        window.addEventListener(
            "load",
            function () {

                window.setTimeout(
                    hideLoader,
                    250
                );

            }
        );


        /* =================================================
           MOBILE NAVIGATION
        ================================================= */

        function closeMobileMenu() {

            if (!navLinks || !menuToggle) {
                return;
            }

            navLinks.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }


        function openMobileMenu() {

            if (!navLinks || !menuToggle) {
                return;
            }

            navLinks.classList.add("open");

            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        }


        if (menuToggle) {

            menuToggle.addEventListener(
                "click",
                function () {

                    var isOpen =
                        navLinks &&
                        navLinks.classList.contains(
                            "open"
                        );

                    if (isOpen) {

                        closeMobileMenu();

                    } else {

                        openMobileMenu();

                    }

                }
            );

        }


        /*
         * Close menu after clicking a navigation link.
         */

        if (navLinks) {

            var mobileLinks =
                navLinks.querySelectorAll(
                    "a"
                );

            mobileLinks.forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            closeMobileMenu();

                        }
                    );

                }
            );

        }


        /*
         * Close menu with Escape.
         */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeMobileMenu();

                    closeModal();

                }

            }
        );


        /* =================================================
           HEADER SCROLL EFFECT
        ================================================= */

        function handleScroll() {

            var scrollPosition =
                window.scrollY ||
                window.pageYOffset;


            if (header) {

                if (scrollPosition > 40) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }

            }


            if (backToTop) {

                if (scrollPosition > 500) {

                    backToTop.classList.add(
                        "visible"
                    );

                } else {

                    backToTop.classList.remove(
                        "visible"
                    );

                }

            }

        }


        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true
            }
        );


        handleScroll();


        /* =================================================
           BACK TO TOP
        ================================================= */

        if (backToTop) {

            backToTop.addEventListener(
                "click",
                function () {

                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }
            );

        }


        /* =================================================
           SCROLL REVEAL
        ================================================= */

        var revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            var revealObserver =
                new IntersectionObserver(
                    function (
                        entries,
                        observer
                    ) {

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

                        rootMargin:
                            "0px 0px -40px 0px"
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
             * Fallback for old browsers.
             */

            revealElements.forEach(
                function (element) {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }


        /* =================================================
           ACTIVE NAVIGATION
        ================================================= */

        var sections =
            document.querySelectorAll(
                "main section[id]"
            );

        var navigationLinks =
            document.querySelectorAll(
                ".nav-link:not(.nav-cta)"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            var sectionObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }


                                var id =
                                    entry.target.id;


                                navigationLinks.forEach(
                                    function (link) {

                                        link.classList.remove(
                                            "active"
                                        );


                                        var href =
                                            link.getAttribute(
                                                "href"
                                            );


                                        if (
                                            href ===
                                            "#" + id
                                        ) {

                                            link.classList.add(
                                                "active"
                                            );

                                        }

                                    }
                                );

                            }
                        );

                    },
                    {
                        threshold: 0.25,

                        rootMargin:
                            "-20% 0px -60% 0px"
                    }
                );


            sections.forEach(
                function (section) {

                    sectionObserver.observe(
                        section
                    );

                }
            );

        }


        /* =================================================
           FAQ ACCORDION
        ================================================= */

        var faqItems =
            document.querySelectorAll(
                ".faq-item"
            );


        faqItems.forEach(
            function (item) {

                var question =
                    item.querySelector(
                        ".faq-question"
                    );


                if (!question) {
                    return;
                }


                question.addEventListener(
                    "click",
                    function () {

                        var isOpen =
                            item.classList.contains(
                                "open"
                            );


                        /*
                         * Close every other FAQ.
                         */

                        faqItems.forEach(
                            function (otherItem) {

                                otherItem.classList.remove(
                                    "open"
                                );


                                var otherQuestion =
                                    otherItem.querySelector(
                                        ".faq-question"
                                    );


                                if (
                                    otherQuestion
                                ) {

                                    otherQuestion.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );

                                }

                            }
                        );


                        /*
                         * Open selected FAQ.
                         */

                        if (!isOpen) {

                            item.classList.add(
                                "open"
                            );

                            question.setAttribute(
                                "aria-expanded",
                                "true"
                            );

                        }

                    }
                );

            }
        );


        /* =================================================
           AI STUDIO
        ================================================= */

        var aiTools =
            document.querySelectorAll(
                ".ai-tool"
            );


        var aiToolData = {

            "business-name": {

                title:
                    "Business Name Generator",

                description:
                    "Give us a business idea and we'll generate naming directions for it.",

                label:
                    "What is your business about?",

                placeholder:
                    "Example: A clothing brand for ambitious young entrepreneurs."

            },


            "website-concept": {

                title:
                    "Website Concept Builder",

                description:
                    "Describe your business and we'll create a starting website concept.",

                label:
                    "Describe the business",

                placeholder:
                    "Example: A modern fitness coaching business targeting busy professionals."

            },


            "content-spark": {

                title:
                    "Content Spark",

                description:
                    "Give us your niche and we'll generate content directions.",

                label:
                    "What is your niche?",

                placeholder:
                    "Example: Personal finance for university students."

            },


            "ai-roadmap": {

                title:
                    "AI Roadmap",

                description:
                    "Describe your business workflow and discover possible AI opportunities.",

                label:
                    "What does your business do?",

                placeholder:
                    "Example: I run an online store and spend hours answering customer questions."

            }

        };


        var currentTool =
            "business-name";


        function openModal(toolName) {

            if (!aiModal) {
                return;
            }


            var data =
                aiToolData[toolName];


            if (!data) {
                return;
            }


            currentTool =
                toolName;


            if (modalTitle) {

                modalTitle.textContent =
                    data.title;

            }


            if (modalDescription) {

                modalDescription.textContent =
                    data.description;

            }


            if (aiLabel) {

                aiLabel.textContent =
                    data.label;

            }


            if (aiInput) {

                aiInput.value = "";

                aiInput.placeholder =
                    data.placeholder;

            }


            if (aiResult) {

                aiResult.classList.remove(
                    "visible"
                );

                aiResult.innerHTML = "";

            }


            aiModal.classList.add(
                "active"
            );


            aiModal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "modal-open"
            );


            window.setTimeout(
                function () {

                    if (aiInput) {

                        aiInput.focus();

                    }

                },
                250
            );

        }


        function closeModal() {

            if (!aiModal) {
                return;
            }


            aiModal.classList.remove(
                "active"
            );


            aiModal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "modal-open"
            );

        }


        aiTools.forEach(
            function (tool) {

                tool.addEventListener(
                    "click",
                    function () {

                        var toolName =
                            tool.getAttribute(
                                "data-tool"
                            );


                        openModal(
                            toolName
                        );

                    }
                );

            }
        );


        if (modalClose) {

            modalClose.addEventListener(
                "click",
                closeModal
            );

        }


        if (modalOverlay) {

            modalOverlay.addEventListener(
                "click",
                closeModal
            );

        }


        /* =================================================
           AI DEMO GENERATOR
        ================================================= */

        function cleanInput(value) {

            return value
                .replace(
                    /\s+/g,
                    " "
                )
                .trim();

        }


        function generateBusinessName(input) {

            var words =
                input
                    .split(" ")
                    .filter(
                        function (word) {

                            return word.length > 2;

                        }
                    )
                    .slice(0, 3);


            var base =
                words
                    .map(
                        function (word) {

                            return (
                                word.charAt(0)
                                .toUpperCase() +
                                word.slice(1)
                            );

                        }
                    )
                    .join("");


            if (!base) {

                base = "Nova";

            }


            return [
                base + " Digital",
                "Nexa " + base,
                base + " Labs",
                base + " Studio",
                "Vanta " + base
            ];

        }


        function generateWebsiteConcept(input) {

            return (
                "<strong>Suggested direction</strong><br><br>" +

                "Build a modern, mobile-first website around " +

                "<strong>" +
                escapeHTML(input) +
                "</strong>" +

                ".<br><br>" +

                "Suggested structure: " +

                "Hero → Value Proposition → Services → " +

                "Proof / Work → Process → FAQ → Contact.<br><br>" +

                "Visual direction: premium typography, " +

                "strong spacing, clear calls-to-action " +

                "and a focused conversion journey."
            );

        }


        function generateContentSpark(input) {

            return (
                "<strong>Content directions</strong><br><br>" +

                "For <strong>" +
                escapeHTML(input) +
                "</strong>, consider creating:<br><br>" +

                "• Educational tips<br>" +

                "• Behind-the-scenes content<br>" +

                "• Common mistakes in the niche<br>" +

                "• Before-and-after transformations<br>" +

                "• Customer questions answered<br>" +

                "• Personal stories and lessons<br>" +

                "• Short-form myth vs fact posts"
            );

        }


        function generateAIRoadmap(input) {

            return (
                "<strong>Potential AI opportunities</strong><br><br>" +

                "Based on <strong>" +
                escapeHTML(input) +
                "</strong>, " +

                "look for repetitive tasks involving:<br><br>" +

                "• Customer questions<br>" +

                "• Data entry<br>" +

                "• Content production<br>" +

                "• Lead collection<br>" +

                "• Document processing<br>" +

                "• Reporting<br>" +

                "• Internal communication<br><br>" +

                "Next step: identify the task that consumes " +

                "the most repetitive time and design a small " +

                "automation around it."
            );

        }


        function escapeHTML(value) {

            var element =
                document.createElement(
                    "div"
                );


            element.textContent =
                value;


            return element.innerHTML;

        }


        function generateResult(
            toolName,
            input
        ) {

            switch (toolName) {

                case "business-name":

                    var names =
                        generateBusinessName(
                            input
                        );


                    return (
                        "<strong>Name directions</strong>" +

                        "<br><br>" +

                        names
                            .map(
                                function (name) {

                                    return (
                                        "• " +
                                        escapeHTML(
                                            name
                                        )
                                    );

                                }
                            )
                            .join("<br>") +

                        "<br><br>" +

                        "<small>" +

                        "These are creative starting points. " +

                        "Check trademark, domain and social " +

                        "availability before using a name." +

                        "</small>"
                    );


                case "website-concept":

                    return generateWebsiteConcept(
                        input
                    );


                case "content-spark":

                    return generateContentSpark(
                        input
                    );


                case "ai-roadmap":

                    return generateAIRoadmap(
                        input
                    );


                default:

                    return (
                        "Tell us more about your idea."
                    );

            }

        }


        if (aiForm) {

            aiForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    if (!aiInput || !aiResult) {
                        return;
                    }


                    var input =
                        cleanInput(
                            aiInput.value
                        );


                    if (!input) {

                        aiInput.focus();

                        return;

                    }


                    aiResult.innerHTML =
                        generateResult(
                            currentTool,
                            input
                        );


                    aiResult.classList.add(
                        "visible"
                    );

                }
            );

        }


        /* =================================================
           SIMPLE HERO PARALLAX
        ================================================= */

        var heroVisual =
            document.querySelector(
                ".hero-visual"
            );


        var reduceMotion =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (
            heroVisual &&
            !reduceMotion
        ) {

            window.addEventListener(
                "mousemove",
                function (event) {

                    /*
                     * Keep the movement subtle.
                     */

                    var x =
                        (
                            event.clientX /
                            window.innerWidth
                        ) - 0.5;


                    var y =
                        (
                            event.clientY /
                            window.innerHeight
                        ) - 0.5;


                    heroVisual.style.transform =
                        "translate3d(" +
                        (x * 8) +
                        "px, " +
                        (y * 6) +
                        "px, 0)";

                }
            );

        }


        /* =================================================
           SERVICE CARD TILT
        ================================================= */

        var serviceCards =
            document.querySelectorAll(
                ".service-card"
            );


        if (!reduceMotion) {

            serviceCards.forEach(
                function (card) {

                    card.addEventListener(
                        "mousemove",
                        function (event) {

                            /*
                             * Disable this effect on
                             * narrow touch devices.
                             */

                            if (
                                window.innerWidth < 900
                            ) {
                                return;
                            }


                            var rect =
                                card.getBoundingClientRect();


                            var x =
                                event.clientX -
                                rect.left;


                            var y =
                                event.clientY -
                                rect.top;


                            var rotateY =
                                (
                                    x /
                                    rect.width -
                                    0.5
                                ) * 5;


                            var rotateX =
                                (
                                    0.5 -
                                    y /
                                    rect.height
                                ) * 5;


                            card.style.transform =
                                "perspective(800px) " +
                                "rotateX(" +
                                rotateX +
                                "deg) " +
                                "rotateY(" +
                                rotateY +
                                "deg) " +
                                "translateY(-6px)";

                        }
                    );


                    card.addEventListener(
                        "mouseleave",
                        function () {

                            card.style.transform =
                                "";

                        }
                    );

                }
            );

        }


        /* =================================================
           SMOOTH INTERNAL LINKS
        ================================================= */

        var internalLinks =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        internalLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        var targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {
                            return;
                        }


                        var target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({

                            behavior:
                                reduceMotion
                                    ? "auto"
                                    : "smooth",

                            block: "start"

                        });


                        closeMobileMenu();

                    }
                );

            }
        );


        /* =================================================
           WINDOW RESIZE SAFETY
        ================================================= */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 820
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* =================================================
           INITIAL STATE
        ================================================= */

        /*
         * Reveal above-the-fold elements
         * immediately so the hero does not
         * appear empty on slow observers.
         */

        window.setTimeout(
            function () {

                var heroReveals =
                    document.querySelectorAll(
                        ".hero .reveal"
                    );


                heroReveals.forEach(
                    function (element) {

                        element.classList.add(
                            "visible"
                        );

                    }
                );

            },
            100
        );


        console.log(
            "Gomez Digital V4 initialized."
           /* =========================================================
   GOMEZ DIGITAL V5
   STEP 2 — MOBILE NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    var menuToggle = document.querySelector(".menu-toggle");
    var navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) {
        return;
    }

    menuToggle.addEventListener("click", function () {

        var isOpen = menuToggle.classList.toggle("active");

        navLinks.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        document.body.style.overflow = isOpen
            ? "hidden"
            : "";

    });


    /* ---------------------------------------------
       CLOSE MENU AFTER CLICKING A LINK
       --------------------------------------------- */

    var links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.style.overflow = "";

        });

    });


    /* ---------------------------------------------
       CLOSE MENU WITH ESCAPE
       --------------------------------------------- */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.style.overflow = "";

        }

    });

});
        );


    });


})();
