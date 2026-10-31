import { links } from "./data.js";


// Load links into html tags
function initLinks() {
    // helper function
    function initLink(id, value) {
        const element = document.getElementById(id);
        if (element && value) {
            element.href = value;
        }
    }

    // single links (direct mapping)
    const socials = ['github', 'linkedin', 'itchio', 'email', 'blog', 'c3cPR', 'cpuDesign', 'makeJelly', 'glgame2d'];
    socials.forEach(platform => {
        initLink(`link-${platform}`, links[platform]);
    });
    initLink('link-hero-github', links.github);

    // projects
    links.projects.forEach((url, index) => {
        initLink(`link-project-${index + 1}`, url);
    });

    // articles
    links.articles.forEach((url, index) => {
        initLink(`link-article-${index + 1}`, url);
    });
}
initLinks();


// Binary background
function generateBinary(len) {
    return Array.from({ length: len }, () => Math.random() > 0.5 ? '1' : '0').join('') + ' ';
}

function calculateWindowSizeInChars() {
    const tester = document.createElement('span');
    // Copy the style of the binary bg
    tester.style.fontFamily = '"JetBrains Mono", monospace';
    tester.style.fontSize = '16px';
    tester.style.lineHeight = '1.2';
    tester.style.position = 'absolute';
    tester.style.visibility = 'hidden';
    tester.textContent = '0'; // Monospace: all chars are same width
    document.body.appendChild(tester);

    const charWidth = tester.getBoundingClientRect().width;
    const charHeight = tester.getBoundingClientRect().height;
    document.body.removeChild(tester);

    // Total width / width of one char + 10% buffer for safety
    const widthInChars = Math.ceil((window.innerWidth / charWidth) * 1.1);
    const heightInChars = Math.ceil((window.innerHeight / charHeight) * 1.1);

    return [widthInChars, heightInChars];
}

const binaryLayers = document.querySelectorAll('.binary-layer');

function refreshBackground() {
    const [charsPerLine, lines] = calculateWindowSizeInChars();

    // Only need to build the content once
    let content = '';
    for (let i = 0; i < lines; i++) {
        content += generateBinary(charsPerLine) + '\n';
    }

    binaryLayers.forEach(layer => layer.textContent = content);
}
refreshBackground();

window.addEventListener('resize', refreshBackground);


// Mobile menu
const mobileMenu = document.getElementById('mobile-menu');

document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Collapse the menu again once a link is picked
mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});


// Email address copying
document.getElementById('link-email').addEventListener('click', () => {
    const display = document.getElementById('email-display');
    const oldDisplayText = display.textContent;
    const oldDisplayColor = display.style.color;

    // remove "mailto:" before writing to clipboard
    const email = links.email.replace("mailto:", "");
    navigator.clipboard.writeText(email).then(() => {
        // Visual feedback
        display.style.color = '#00e5a0';
        display.textContent = 'Copied!';

        // Reset after 2 seconds
        setTimeout(() => {
            display.style.color = oldDisplayColor;
            display.textContent = oldDisplayText;
        }, 2000);
    });
});
