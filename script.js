/* ==========================================
   THEME MANAGEMENT
   ========================================== */
const themeToggleLight = document.getElementById('theme-toggle-light');
const themeToggleDark = document.getElementById('theme-toggle-dark');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggleLight?.classList.toggle('active', theme === 'light');
    themeToggleDark?.classList.toggle('active', theme === 'dark');
}

themeToggleLight?.addEventListener('click', () => setTheme('light'));
themeToggleDark?.addEventListener('click', () => setTheme('dark'));

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

/* ==========================================
   PROJECTS DATA
   ========================================== */
const projects = [
    {
        number: '01',
        title: 'CTF',
        description: "I'm a CTF enjoyer",
        CTFtime: 'https://ctftime.org/user/252731',
        tech: 'Security'
    },
    {
        number: '02',
        title: 'Image recognition AI',
        tech: 'python',
        description: 'A simple AI for recognizing animal images',
        github: 'https://github.com/slayzbs/',
        stars: 6
    }
];

/* ==========================================
   RENDER PROJECTS (FIXED FOR CTFTIME)
   ========================================== */
const projectsGrid = document.querySelector('.projects-grid');

if (projectsGrid) {
    projects.forEach((project, index) => {
        const projectEl = document.createElement('div');
        projectEl.className = 'project slide-up';
        projectEl.style.animationDelay = `${index * 0.1}s`;

        // Logic pour éviter les undefined
        const techTag = project.tech ? `<span class="project-tech">${project.tech}</span>` : '';
        
        let linksHtml = '';
        if (project.github) linksHtml += `<a href="${project.github}" target="_blank" class="project-link">github</a>`;
        if (project.CTFtime) linksHtml += `<a href="${project.CTFtime}" target="_blank" class="project-link">ctftime</a>`;

        const starBadge = (project.github && project.stars !== undefined) ? `
            <span class="star-badge" data-role="star-badge" data-github="${project.github}">
                <svg viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.556L19.335 24 12 19.897 4.665 24l1.634-8.694L.6 9.75l7.732-1.732z"></path></svg>
                <span class="star-count">${project.stars}</span>
            </span>` : '';

        projectEl.innerHTML = `
            <div class="project-number">${project.number}</div>
            <div class="project-content">
                <div class="project-meta">${techTag}</div>
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-links">${linksHtml} ${starBadge}</div>
            </div>
        `;
        projectsGrid.appendChild(projectEl);
    });
}

/* ==========================================
   ANIMATIONS & SCROLL
   ========================================== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .fade-in, .slide-up').forEach(el => observer.observe(el));

// Name Character delay
document.querySelectorAll('.name-char').forEach((char, i) => {
    char.style.animationDelay = `${i * 0.08}s`;
    char.classList.add('visible');
});

// Navigation scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.getElementById('site-nav');
    const backToTop = document.getElementById('back-to-top');
    const currentScroll = window.scrollY;

    // Progress bar
    const progress = (currentScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('reading-progress').style.width = `${progress}%`;

    // Hide/Show Nav
    if (currentScroll > 100 && currentScroll > lastScroll) nav.classList.add('nav-hidden');
    else nav.classList.remove('nav-hidden');
    
    // Back to top
    if (currentScroll > 300) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');

    lastScroll = currentScroll;
}, { passive: true });

// Contact Form
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const notif = document.getElementById('notification');
    notif.textContent = "Message sent successfully!";
    notif.style.display = "block";
    setTimeout(() => notif.style.display = "none", 4000);
    e.target.reset();
});
