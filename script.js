/* =====================================================
   GOMEZ DIGITAL V3.1
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", function () {

    const loader =
        document.getElementById("loader");


    setTimeout(function () {

        if (loader) {
            loader.classList.add("hidden");
        }

    }, 700);

});



/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileClose =
    document.getElementById("mobileClose");

const mobileLinks =
    document.querySelectorAll(".mobile-links a");


/*
    OPEN MENU
*/

function openMenu() {

    if (!mobileMenu || !menuButton) {
        return;
    }


    mobileMenu.classList.add("open");

    document.body.classList.add("menu-active");


    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );


    mobileMenu.setAttribute(
        "aria-hidden",
        "false"
    );

}


/*
    CLOSE MENU
*/

function closeMenu() {

    if (!mobileMenu || !menuButton) {
        return;
    }


    mobileMenu.classList.remove("open");

    document.body.classList.remove("menu-active");


    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    mobileMenu.setAttribute(
        "aria-hidden",
        "true"
    );

}


/*
    TOGGLE MENU
*/

if (menuButton) {

    menuButton.addEventListener(
        "click",
        function () {

            const isOpen =
                mobileMenu.classList.contains("open");


            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );

}


/*
    CLOSE BUTTON
*/

if (mobileClose) {

    mobileClose.addEventListener(
        "click",
        closeMenu
    );

}


/*
    CLOSE AFTER CLICKING A LINK
*/

mobileLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        closeMenu
    );

});


/*
    ESCAPE KEY CLOSES MENU
*/

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeMenu();

        }

    }
);



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".service-card, " +
        ".process-step, " +
        ".project-showcase, " +
        ".global-card, " +
        ".contact-intro, " +
        ".project-form"
    );


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    function (element) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity .8s ease, " +
            "transform .8s ease";

        revealObserver.observe(element);

    }
);



/* =====================================================
   HERO PARALLAX
===================================================== */

const heroVisual =
    document.querySelector(".hero-visual");


document.addEventListener(
    "mousemove",
    function (event) {

        if (
            !heroVisual ||
            window.innerWidth < 901
        ) {
            return;
        }


        const x =
            (
                window.innerWidth / 2 -
                event.clientX
            ) / 70;


        const y =
            (
                window.innerHeight / 2 -
                event.clientY
            ) / 70;


        heroVisual.style.transform =
            `translateY(-50%) translate(${x}px, ${y}px)`;

    }
);



/* =====================================================
   PROJECT FORM → WHATSAPP
===================================================== */

const projectForm =
    document.getElementById("projectForm");


if (projectForm) {

    projectForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*
                GOMEZ DIGITAL BUSINESS WHATSAPP

                International format.
                No + sign.
                No spaces.
            */

            const GOMEZ_WHATSAPP =
                "26771086913";


            /*
                GET FORM VALUES
            */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const business =
                document
                    .getElementById("business")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const countryCode =
                document
                    .getElementById("countryCode")
                    .value;


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const service =
                document
                    .getElementById("service")
                    .value;


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            /*
                CREATE WHATSAPP MESSAGE
            */

            const whatsappMessage =

`🚀 GOMEZ DIGITAL — NEW PROJECT REQUEST

━━━━━━━━━━━━━━━━━━

👤 CLIENT
Name: ${name}

🏢 BUSINESS / BRAND
${business}

📧 EMAIL
${email}

📱 CLIENT WHATSAPP
${countryCode} ${phone}

💼 SERVICE
${service}

📝 PROJECT DETAILS
${message}

━━━━━━━━━━━━━━━━━━

🌍 Submitted through Gomez Digital
https://gomezdigital.github.io/gomez-digital/`;


            /*
                CREATE WHATSAPP URL
            */

            const whatsappURL =
                `https://wa.me/${GOMEZ_WHATSAPP}` +
                `?text=${encodeURIComponent(
                    whatsappMessage
                )}`;


            /*
                OPEN WHATSAPP
            */

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}



/* =====================================================
   CURRENT YEAR
===================================================== */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}
