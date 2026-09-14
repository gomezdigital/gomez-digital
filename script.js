/* =====================================================
   GOMEZ DIGITAL V4
   JAVASCRIPT ENGINE
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    const nav = document.querySelector(".nav-links");

    nav.classList.toggle("active");

}


/* Close mobile menu when a link is clicked */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        document.querySelector(".nav-links")
            .classList.remove("active");

    });

});


/* =====================================================
   AI TOOL MODAL
===================================================== */

const modal = document.getElementById("toolModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const toolInterface = document.getElementById("toolInterface");


function openTool(tool) {

    modal.classList.add("active");

    if (tool === "business") {

        modalTitle.textContent = "Business Idea Generator";

        modalDescription.textContent =
            "Tell Gomez AI what you are interested in and generate business ideas.";

        toolInterface.innerHTML = `

            <input
                id="businessInput"
                type="text"
                placeholder="Example: fitness, fashion, technology..."
                class="tool-input"
            >

            <button
                class="generate-btn"
                onclick="generateBusinessIdea()">
                Generate Idea →
            </button>

            <div id="toolResult" class="tool-result"></div>

        `;

    }


    else if (tool === "brand") {

        modalTitle.textContent = "Brand Name Generator";

        modalDescription.textContent =
            "Enter your business niche and generate brand name ideas.";

        toolInterface.innerHTML = `

            <input
                id="brandInput"
                type="text"
                placeholder="Example: clothing, tech, food..."
                class="tool-input"
            >

            <button
                class="generate-btn"
                onclick="generateBrandNames()">
                Generate Names →
            </button>

            <div id="toolResult" class="tool-result"></div>

        `;

    }


    else if (tool === "content") {

        modalTitle.textContent = "Content Idea Generator";

        modalDescription.textContent =
            "Choose a platform and generate content ideas.";

        toolInterface.innerHTML = `

            <input
                id="contentInput"
                type="text"
                placeholder="Example: TikTok fitness page..."
                class="tool-input"
            >

            <button
                class="generate-btn"
                onclick="generateContentIdeas()">
                Generate Ideas →
            </button>

            <div id="toolResult" class="tool-result"></div>

        `;

    }

}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeTool() {

    modal.classList.remove("active");

}


/* Close modal when clicking outside */

modal.addEventListener("click", function(event) {

    if (event.target === modal) {

        closeTool();

    }

});


/* Close modal with Escape */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeTool();

    }

});


/* =====================================================
   BUSINESS IDEA GENERATOR
===================================================== */

function generateBusinessIdea() {

    const input =
        document.getElementById("businessInput").value.trim();

    const result =
        document.getElementById("toolResult");


    if (!input) {

        result.innerHTML =
            "<p>Please enter an interest or niche first.</p>";

        return;

    }


    const ideas = [

        `Create a digital service helping ${input} businesses attract customers online.`,

        `Build a social-media brand focused on ${input} tips, education and entertainment.`,

        `Create an online marketplace connecting ${input} providers with customers.`,

        `Build a subscription-free digital tool that helps ${input} businesses automate repetitive tasks.`,

        `Create a content agency specializing in ${input} brands.`

    ];


    const randomIdea =
        ideas[Math.floor(Math.random() * ideas.length)];


    result.innerHTML = `

        <div class="result-box">

            <strong>💡 Gomez Idea</strong>

            <p>${randomIdea}</p>

        </div>

    `;

}


/* =====================================================
   BRAND NAME GENERATOR
===================================================== */

function generateBrandNames() {

    const input =
        document.getElementById("brandInput").value.trim();

    const result =
        document.getElementById("toolResult");


    if (!input) {

        result.innerHTML =
            "<p>Please enter a niche first.</p>";

        return;

    }


    const words = [

        "Nova",
        "Nexa",
        "Vibe",
        "Prime",
        "Vertex",
        "Pulse",
        "Forge",
        "Vision",
        "Flow",
        "Rise"

    ];


    let names = [];


    for (let i = 0; i < 5; i++) {

        const word =
            words[Math.floor(Math.random() * words.length)];

        const name =
            word + " " +
            input.charAt(0).toUpperCase() +
            input.slice(1);

        names.push(name);

    }


    result.innerHTML = `

        <div class="result-box">

            <strong>✨ Brand Ideas</strong>

            ${names.map(name =>
                `<p>• ${name}</p>`
            ).join("")}

        </div>

    `;

}


/* =====================================================
   CONTENT IDEA GENERATOR
===================================================== */

function generateContentIdeas() {

    const input =
        document.getElementById("contentInput").value.trim();

    const result =
        document.getElementById("toolResult");


    if (!input) {

        result.innerHTML =
            "<p>Please describe your page or niche first.</p>";

        return;

    }


    const ideas = [

        `3 mistakes people make when starting ${input}`,

        `A beginner's guide to ${input}`,

        `The truth nobody tells you about ${input}`,

        `5 things you should know about ${input}`,

        `I tried ${input} for 7 days — here's what happened`,

        `POV: You finally understand ${input}`,

        `The fastest way to improve at ${input}`

    ];


    result.innerHTML = `

        <div class="result-box">

            <strong>🔥 Content Ideas</strong>

            ${ideas.map((idea, index) =>
                `<p>${index + 1}. ${idea}</p>`
            ).join("")}

        </div>

    `;

}


/* =====================================================
   PAGE LOAD ANIMATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("loaded");

});


/* =====================================================
   CONSOLE BRANDING
===================================================== */

console.log(
    "%c GOMEZ DIGITAL ",
    "background:#fff;color:#000;font-size:20px;font-weight:bold;padding:8px;"
);

console.log(
    "Build. Automate. Grow."
);
