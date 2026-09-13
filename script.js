/* =====================================================
   GOMEZ DIGITAL V3
   INTERACTIONS
===================================================== */


/* ================= PRELOADER ================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.classList.add("hidden");
        }

    }, 900);

});


/* ================= MOBILE MENU ================= */

const menuButton = document.getElementById("menuButton");

menuButton.addEventListener("click", () => {

    document.body.classList.toggle("menu-open");

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .service-card, .process-step, .project-showcase, .global-card, .contact-intro, .project-form"
);

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(35px)";
    element.style.transition = "opacity .8s ease, transform .8s ease";

    revealObserver.observe(element);

});


/* ================= MOUSE PARALLAX ================= */

const heroVisual = document.querySelector(".hero-visual");

document.addEventListener("mousemove", (event) => {

    if (!heroVisual || window.innerWidth < 900) return;

    const x = (window.innerWidth / 2 - event.clientX) / 70;
    const y = (window.innerHeight / 2 - event.clientY) / 70;

    heroVisual.style.transform =
        `translateY(-50%) translate(${x}px, ${y}px)`;

});


/* ================= PROJECT FORM ================= */

const projectForm = document.getElementById("projectForm");

projectForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const business =
        document.getElementById("business").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const countryCode =
        document.getElementById("countryCode").value;

    const phone =
        document.getElementById("phone").value.trim();

    const service =
        document.getElementById("service").value;

    const message =
        document.getElementById("message").value.trim();


    /* ============================================
       YOUR GOMEZ DIGITAL WHATSAPP NUMBER
       CHANGE THIS
    ============================================ */

    const GOMEZ_WHATSAPP = "2671086913";


    const whatsappMessage =

`🚀 GOMEZ DIGITAL — NEW PROJECT REQUEST

👤 Name:
${name}

🏢 Business / Brand:
${business}

📧 Email:
${email}

📱 Client WhatsApp:
${countryCode} ${phone}

💼 Service:
${service}

📝 Project Details:
${message}

Sent through Gomez Digital V3 🌍`;


    const whatsappURL =
        `https://wa.me/${GOMEZ_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;


    window.open(whatsappURL, "_blank");

});


/* ================= DYNAMIC YEAR ================= */

const yearElements =
    document.querySelectorAll(".current-year");

yearElements.forEach(element => {

    element.textContent = new Date().getFullYear();

});
