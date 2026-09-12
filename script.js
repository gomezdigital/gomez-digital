/* =========================
   GOMEZ DIGITAL
   JAVASCRIPT
========================= */


/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

    });


    /* Close menu when a navigation link is clicked */

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });

    });

}


/* =========================
   WHATSAPP CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const business = document.getElementById("business").value.trim();
        const message = document.getElementById("message").value.trim();


        if (!name || !business || !message) {
            alert("Please complete all fields.");
            return;
        }


        /*
        IMPORTANT:
        Replace 267XXXXXXXX with your real
        WhatsApp number.

        Do not include + or spaces.
        Example:
        26771234567
        */

        const phoneNumber = "267XXXXXXXX";


        const whatsappMessage =
            "Hello Gomez Digital!%0A%0A" +
            "Name: " + encodeURIComponent(name) + "%0A" +
            "Business: " + encodeURIComponent(business) + "%0A" +
            "Project: " + encodeURIComponent(message);


        const whatsappURL =
            "https://wa.me/" + phoneNumber +
            "?text=" + whatsappMessage;


        window.open(whatsappURL, "_blank");

    });

}


/* =========================
   CURRENT YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
