/* Binary background */
function generateBinary(len) {
    return Array.from({ length: len }, () => Math.random() > 0.5 ? '1' : '0').join('') + ' ';
}

function calculateWindowSizeInChars() {
    const tester = document.createElement('span');
    // Copy the style of the binary bg
    tester.style.fontFamily = '"JetBrains Mono", monospace';
    tester.style.fontSize = '11px';
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

const binaryLayer1 = document.getElementById('binary-layer-1');
const binaryLayer2 = document.getElementById('binary-layer-2');

function refreshBackground() {
    const [charsPerLine, lines] = calculateWindowSizeInChars();

    if (binaryLayer1 && binaryLayer2) {
        // Only need to build the content once
        let content = '';
        for (let i = 0; i < lines; i++) {
            content += generateBinary(charsPerLine) + '\n';
        }

        binaryLayer1.textContent = content;
        binaryLayer2.textContent = content;
    }
}
refreshBackground();

window.addEventListener('resize', () => {
    /* Refresh background on phone rotate or window resize */
    refreshBackground();
    console.log(`New size: ${window.innerWidth}x${window.innerHeight}`);
})


/* Typing animation */
const typingPhrases = [
    'systems programming in C/C++',
    'training neural networks',
    'ray marching on the GPU',
    'writing memory allocators',
    'building distributed systems',
    'optimizing CUDA kernels'
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typingTarget = document.getElementById('typing-target');

function typeStep() {
    if (!typingTarget) return;
    const phrase = typingPhrases[phraseIdx];

    typingTarget.textContent = isDeleting
        ? phrase.substring(0, charIdx--)
        : phrase.substring(0, charIdx++);

    let typeSpeed = isDeleting ? 30 : 75;

    if (!isDeleting && charIdx === phrase.length + 1) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % typingPhrases.length;
        typeSpeed = 400;
    }

    setTimeout(typeStep, typeSpeed);
}
setTimeout(typeStep, 1200);

/* UI Logic for scroll and menu */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('section-visible');
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section-hidden').forEach(s => observer.observe(s));

document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

/* TODO handle contact form */
