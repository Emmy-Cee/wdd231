const menuButton = document.querySelector('#menu-button');
const mainNav = document.querySelector('#main-nav');
const directory = document.querySelector('#directory');
const viewButtons = document.querySelectorAll('.view-toggle');
const currentYear = document.getElementById("currentyear");

currentYear.innerHTML = new Date().getFullYear();
const lastModified = document.getElementById("lastModified");
lastModified.innerHTML = `Last Modified: <span class="highlight">${new Intl.DateTimeFormat("en-US",{dateStyle: "full"}).format(new Date(document.lastModified))}</span>`;

let currentView = 'grid';
let members = [];

function getMembershipLabel(level) {
if (level === 3) return 'Gold';
if (level === 2) return 'Silver';
return 'Member';
}

function renderDirectory(view = currentView) {
if (!directory) return;

currentView = view;
directory.classList.remove('grid-view', 'list-view');
directory.classList.add(`${view}-view`);

directory.innerHTML = members
    .map((member) => {
    const membership = getMembershipLabel(member.membershipLevel);
    const imageSrc = member.image.startsWith('http') ? member.image : `images/${member.image}`;
    return `
        <article class="member-card">
            <div class="member-header">
                <h2 class="member-name">${member.name}</h2>
                <span class="membership-level">${member.category}</span>
            </div>
            <div class="member-card-content">
                <img src="${imageSrc}" alt="${member.name} logo or storefront" loading="lazy">
                <div class="member-contact">
                    <span></span><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></span>
                    <span><strong>Phone:</strong> ${member.phone}</span>
                    <span><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noreferrer">${member.website}</a></span>
                </div>
            </div>
        </article>
    `;
    })
    .join('');
}

async function loadMembers() {
try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
    }

    members = await response.json();
    renderDirectory(currentView);
} catch (error) {
    directory.innerHTML = '<p class="error-message">Unable to load member information right now.</p>';
    console.error('Failed to fetch members:', error);
}
}

if (menuButton && mainNav) {
menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
});
}

if (viewButtons.length) {
viewButtons.forEach((button) => {
    button.addEventListener('click', () => {
    viewButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderDirectory(button.dataset.view || 'grid');
    });
});
}

loadMembers();
