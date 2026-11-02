/* ==========================================================================
   STACKLY GARDENS — public site behaviour
   Botanical atelier · vanilla JS · demo experience
   ========================================================================== */

const body = document.body;
const page = body.dataset.page || 'home';
const LOGO = 'assets/img/logo.webp';
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* --------------------------------------------------------------------------
   1. Icon sprite
   -------------------------------------------------------------------------- */
const SPRITE = {
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/>',
  sprout: '<path d="M7 20h10"/><path d="M12 20v-8"/><path d="M12 12c0-3.5 2-6 5-6 0 3.5-2 6-5 6Z"/><path d="M12 14c0-3-2-5.5-5-5.5 0 3 2 5.5 5 5.5Z"/>',
  flower: '<circle cx="12" cy="12" r="2.4"/><path d="M12 9.6c-1.8-3.4-1-6.3 0-7.6 1 1.3 1.8 4.2 0 7.6Z"/><path d="M12 14.4c1.8 3.4 1 6.3 0 7.6-1-1.3-1.8-4.2 0-7.6Z"/><path d="M9.6 12c-3.4-1.8-6.3-1-7.6 0 1.3 1 4.2 1.8 7.6 0Z"/><path d="M14.4 12c3.4 1.8 6.3 1 7.6 0-1.3-1-4.2-1.8-7.6 0Z"/>',
  tree: '<path d="M12 22v-7"/><path d="M12 15 7 9h3.2L6 4h12l-4.2 5H17l-5 6Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  droplet: '<path d="M12 2.7s6 6.4 6 10.6a6 6 0 0 1-12 0C6 9.1 12 2.7 12 2.7Z"/>',
  scissors: '<circle cx="6" cy="6" r="2.6"/><circle cx="6" cy="18" r="2.6"/><path d="m8.3 7.6 12.2 10.8M8.3 16.4 20.5 5.6"/>',
  shovel: '<path d="M7 3h10"/><path d="M9 3v9.5a5 5 0 0 0 6 0V3"/><path d="M12 18v4"/>',
  spray: '<path d="M8 8h8l1 12H7L8 8Z"/><path d="M10 8V5.5A1.5 1.5 0 0 1 11.5 4h1A1.5 1.5 0 0 1 14 5.5V8"/><path d="M17.5 5h.01M20 8h.01M18 11h.01M21 13h.01"/>',
  truck: '<path d="M3 6h11v11H3z"/><path d="M14 9h4l3 3v5h-7"/><circle cx="7" cy="19" r="1.7"/><circle cx="17.5" cy="19" r="1.7"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/><path d="M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 1.8"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.4 2.4 4.6-4.8"/>',
  alert: '<path d="M12 9v4"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  arrowRight: '<path d="M4 12h16"/><path d="m14 6 6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  arrowLeft: '<path d="M20 12H4"/><path d="m10 18-6-6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  mapPin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/>',
  star: '<path d="m12 2 3 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.9 21.1 7.1 14.2l-5-4.9 6.9-1L12 2Z"/>',
  quote: '<path d="M10 11H6a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3"/><path d="M10 20H6a1 1 0 0 1-1-1v-4a3 3 0 0 1 3-3"/><path d="M20 11h-4a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3"/><path d="M20 20h-4a1 1 0 0 1-1-1v-4a3 3 0 0 1 3-3"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/>',
  facebook: '<path d="M15 3h3V0h-3a5 5 0 0 0-5 5v3H7v3h3v10h3V11h3l1-3h-4V5a2 2 0 0 1 2-2Z"/>',
  pinterest: '<circle cx="12" cy="12" r="9.5"/><path d="M9.2 21c.8-1.7 1.5-4.2 1.8-5.7.3-1.4 2.6-1.6 3.5-.3 1.4 2-.4 5.3-2.8 4.7"/><path d="M11.2 14.5 9.5 21"/>',
  youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none"/>',
  whatsapp: '<path d="M21 11.5A8.5 8.5 0 0 1 8.4 19L3 20.5l1.6-5.3A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8.1 8.4c0 4 3.5 7.5 7.5 7.5l1.1-1.1-2.2-1.5-1.2 1a5.6 5.6 0 0 1-2.5-2.5l1-1.2-1.5-2.2-1.2 1Z"/>',
  x: '<path d="M18.9 3H21l-6.5 7.4L22 21h-6l-4.7-6.1L6 21H3.9l6.9-7.9L2 3h6.1l4.2 5.6L18.9 3Zm-1 16h1.7L8.2 5H6.4l11.5 14Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
  shield: '<path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/>',
  sparkles: '<path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z" fill="currentColor" stroke="none"/>',
  camera: '<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.2"/>',
  ruler: '<path d="m3 15 6-6 12 12H9L3 15Z"/><path d="m7 11 2 2M10 8l2 2M13 5l2 2"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  home: '<path d="m3 10 9-8 9 8"/><path d="M5 9v12h14V9"/><path d="M9 21v-7h6v7"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  wallet: '<path d="M20 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15v14H5a2 2 0 0 1-2-2V5"/><path d="M16 13h.01"/>',
  fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>',
  message: '<path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 9 9 0 0 1-3.8-.9L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  logOut: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  filter: '<path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 21h16"/>',
  upload: '<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 21h16"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="m3 3 18 18"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c6.4 0 10 7 10 7a17.2 17.2 0 0 1-3.2 4.1"/><path d="M6.2 6.2A17.4 17.4 0 0 0 2 11s3.6 7 10 7a10.6 10.6 0 0 0 4-.8"/>',
  more: '<circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none"/>',
  pen: '<path d="m4 20 4.5-1 11-11a2.1 2.1 0 0 0-3-3l-11 11L4 20Z"/><path d="m14.5 5.5 3 3"/>',
  package: '<path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/>',
  trendingUp: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  pie: '<path d="M21 12a9 9 0 1 1-9-9v9h9Z"/><path d="M21 8a9 9 0 0 0-5-5v5h5Z"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.4 5.6L8 16l2.4-5.6L16 8Z"/>',
  mountain: '<path d="m3 20 6-11 4 6 2-3 6 8H3Z"/>',
  'help': '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4.3 1.8c-.8.6-1.8 1.2-1.8 2.7"/><path d="M12 17h.01"/>',
  lock: '<rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M3 21v-5h5M21 3v5h-5"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>'
};

function renderSprite() {
  if ($('#stackly-sprite')) return;
  const holder = document.createElement('div');
  holder.innerHTML = `<svg id="stackly-sprite" class="icon-sprite" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${Object.entries(SPRITE)
    .map(([id, paths]) => `<symbol id="i-${id}" viewBox="0 0 24 24">${paths}</symbol>`).join('')}</svg>`;
  body.prepend(holder.firstElementChild);
}

const icon = (name, extra = '') => `<svg class="icon ${extra}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

/* --------------------------------------------------------------------------
   2. Shared chrome
   -------------------------------------------------------------------------- */
const publicNav = [
  ['home', 'Home', 'index.html'],
  ['services', 'Services', 'services.html'],
  ['projects', 'Projects', 'projects.html'],
  ['care', 'Care Guide', 'care-guide.html'],
  ['about', 'About', 'about.html'],
  ['contact', 'Contact', 'contact.html']
];

const socialLinks = [
  ['instagram', 'Instagram'],
  ['facebook', 'Facebook'],
  ['x', 'X'],
  ['youtube', 'YouTube'],
  ['whatsapp', 'WhatsApp']
];

const socialRow = socialLinks.map(([key, label]) => {
  const iconName = key === 'x' ? 'x' : key === 'whatsapp' ? 'whatsapp' : key === 'facebook' ? 'facebook' : key === 'youtube' ? 'youtube' : 'instagram';
  return `<a class="social-link" href="404.html" aria-label="Stackly Gardens on ${label}">${icon(iconName)}</a>`;
}).join('');

const navMarkup = (suffix) => publicNav.map(([key, label, href]) =>
  `<a href="${href}"${key === page ? ' aria-current="page"' : ''}>${suffix === 'drawer' ? `<span>${String(publicNav.findIndex(item => item[0] === key) + 1).padStart(2, '0')}</span>` : ''}${label}</a>`
).join('');

function brandMarkup(extraClass = '') {
  return `<a class="brand ${extraClass}" href="index.html">
    <span class="brand-mark"><img src="${LOGO}" alt="Stackly" width="40" height="40"></span>
    <span class="brand-text"><b>STACKLY</b></span>
  </a>`;
}

function renderPublicChrome() {
  const headerSlot = $('[data-site-header]');
  if (headerSlot) {
    headerSlot.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="scroll-progress" aria-hidden="true"><i></i></div>
      <div class="cursor-glow" aria-hidden="true"></div>
      <header class="site-header" data-site-header>
        <div class="topbar">
          <div class="container topbar-inner">
            <div class="topbar-group">
              <span class="topbar-item">${icon('mapPin')} 18 Willow Row, Chelsea</span>
              <span class="topbar-item"><span class="topbar-dot"></span> Spring planting slots open</span>
            </div>
            <div class="topbar-group">
              <span class="topbar-item">${icon('phone')} +1 (555) 014-2208</span>
              <span class="topbar-item">${icon('mail')} hello@stackly.com</span>
            </div>
          </div>
        </div>
        <div class="container header-inner">
          ${brandMarkup()}
          <nav class="desktop-nav" aria-label="Primary navigation">${navMarkup('desktop')}</nav>
          <div class="header-actions">
            <a class="header-login" href="login.html">Log in</a>
            <button class="menu-toggle" type="button" aria-label="Open navigation" aria-controls="public-drawer" aria-expanded="false">${icon('menu')}</button>
          </div>
        </div>
      </header>
      <div class="drawer-backdrop" data-drawer-backdrop></div>
      <aside class="mobile-drawer" id="public-drawer" aria-label="Mobile navigation" aria-hidden="true" inert>
        <div class="drawer-top">
          ${brandMarkup('brand--drawer')}
          <button class="drawer-close" type="button" data-drawer-close aria-label="Close navigation">${icon('close')}</button>
        </div>
        <nav aria-label="Mobile primary navigation">${navMarkup('drawer')}</nav>
        <div class="drawer-actions">
          <a class="button button--ghost" href="login.html" data-no-redirect>Log in</a>
        </div>
      </aside>`;
  }

  const footerSlot = $('[data-site-footer]');
  if (footerSlot) {
    footerSlot.innerHTML = `
      <footer class="site-footer">
        <svg class="footer-botanical" viewBox="0 0 300 300" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
          <path d="M150 290C150 200 150 120 92 40"/><path d="M150 250c-40-4-62-34-64-72 38 4 60 32 64 72Z"/><path d="M150 210c42-2 66-30 70-68-40 2-66 28-70 68Z"/><path d="M150 170c-36-4-56-30-58-64 34 4 54 28 58 64Z"/><path d="M150 130c36-2 58-26 62-58-36 2-58 24-62 58Z"/><path d="M126 124c-18-26-14-52 4-74 18 24 18 50-4 74Z"/>
        </svg>
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand">
              ${brandMarkup()}
              <p>Landscape design, horticultural care, and quiet luxury for gardens across the South East. A demo atelier, designed with care.</p>
              <div class="social-row" aria-label="Stackly Gardens on social media">${socialRow}</div>
            </div>
            <div class="footer-column">
              <h3>Explore</h3>
              <a href="index.html">Home</a>
              <a href="services.html">Services</a>
              <a href="projects.html">Projects</a>
              <a href="about.html">About</a>
              <a href="contact.html">Contact</a>
            </div>
            <div class="footer-column">
              <h3>Care Guide</h3>
              <a href="404.html">Spring Care</a>
              <a href="404.html">Summer Care</a>
              <a href="404.html">Autumn Care</a>
              <a href="404.html">Winter Care</a>
              <a href="404.html">Planting Tips</a>
            </div>
            <div class="footer-column footer-column--contact">
              <h3>Visit the studio</h3>
              <span class="contact-item">${icon('mapPin')}<span>18 Willow Row<br>Chelsea, London SW3</span></span>
              <span class="contact-item">${icon('phone')}<span>+1 (555) 014-2208</span></span>
              <span class="contact-item">${icon('mail')}<span>hello@stackly.com</span></span>
              <span class="contact-item">${icon('clock')}<span>Mon–Sat · 7:30 am – 6:00 pm</span></span>

            </div>
          </div>
          <div class="footer-middle">
            <span>Est. 2009 · Designing and tending gardens with a long view.</span>
            <div class="footer-badges">
              <span>${icon('leaf')} Peat-free</span>
              <span>${icon('shield')} Insured</span>
              <span>${icon('award')} RHS partner</span>
            </div>
          </div>
          <div class="footer-bottom">
            <span>&copy; 2026 Stackly Gardens. A demonstration experience — no real bookings or payments.</span>
            <div class="footer-bottom-links">
              <a href="404.html">Privacy</a>
              <a href="404.html">Terms</a>
              <a href="404.html">Accessibility</a>
              <a href="404.html">Journal</a>
            </div>
          </div>
        </div>
      </footer>`;
  }
}

/* --------------------------------------------------------------------------
   3. Header / navigation
   -------------------------------------------------------------------------- */
function setupHeader() {
  const header = $('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = $('.menu-toggle', header);
  const drawer = $('#public-drawer');
  const backdrop = $('[data-drawer-backdrop]');
  if (!toggle || !drawer || !backdrop) return;
  let lastFocus = null;
  const close = (refocus = false) => {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.setAttribute('inert', '');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    body.classList.remove('is-locked');
    if (refocus && lastFocus) lastFocus.focus();
  };
  const open = () => {
    lastFocus = document.activeElement;
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    drawer.removeAttribute('inert');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    body.classList.add('is-locked');
    $('[data-drawer-close]', drawer)?.focus();
  };
  toggle.addEventListener('click', () => drawer.classList.contains('is-open') ? close(true) : open());
  $('[data-drawer-close]', drawer)?.addEventListener('click', () => close(true));
  backdrop.addEventListener('click', () => close(true));
  $$('a', drawer).forEach(link => link.addEventListener('click', () => close()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) close(true);
    if (event.key === 'Tab' && drawer.classList.contains('is-open')) {
      const focusable = $$('a, button, input, [tabindex]:not([tabindex="-1"])', drawer).filter(item => item.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
}

function setupScrollProgress() {
  const bar = $('.scroll-progress i');
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0}%`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

function setupCursorGlow() {
  const glow = $('.cursor-glow');
  if (!glow || reducedMotion || !finePointer) return;
  let frame = false;
  let x = 0;
  let y = 0;
  const paint = () => {
    glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    glow.classList.add('is-on');
    frame = false;
  };
  window.addEventListener('pointermove', event => {
    x = event.clientX;
    y = event.clientY;
    if (!frame) { frame = true; requestAnimationFrame(paint); }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. Motion, reveals, counters
   -------------------------------------------------------------------------- */
function setupReveals() {
  $$('.stagger').forEach(group => {
    $$(':scope > *', group).forEach((item, index) => item.style.setProperty('--i', String(index)));
  });
  const items = $$('.reveal, .stagger');
  if (!items.length) return;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -32px' });
  items.forEach(item => observer.observe(item));
}

function setupCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;
  const format = (value, decimals) => Number(value).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  const animate = element => {
    const raw = element.dataset.count;
    const target = Number(raw);
    const decimals = (String(raw).split('.')[1] || '').length;
    if (reducedMotion || element.closest('.hero') || !Number.isFinite(target)) {
      element.textContent = format(target, decimals);
      return;
    }
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / 1300, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = format(target * eased, decimals);
      if (progress < 1) requestAnimationFrame(tick);
      else element.textContent = format(target, decimals);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .5 });
  counters.forEach(counter => observer.observe(counter));
}

function setupMeters() {
  const fills = $$('.meter-fill[data-meter]');
  if (!fills.length) return;
  const reveal = element => {
    const value = Math.max(0, Math.min(100, Number(element.dataset.meter || 0)));
    element.style.width = `${value}%`;
  };
  if (reducedMotion || !('IntersectionObserver' in window)) {
    fills.forEach(reveal);
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .35 });
  fills.forEach(fill => observer.observe(fill));
}

function setupTilt() {
  if (reducedMotion || !finePointer) return;
  $$('[data-tilt]').forEach(element => {
    const strength = Number(element.dataset.tilt || 7);
    element.addEventListener('pointermove', event => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      element.style.transform = `perspective(1000px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(0)`;
    });
    element.addEventListener('pointerleave', () => {
      element.style.transform = '';
    });
  });
}

function setupMagnetic() {
  if (reducedMotion || !finePointer) return;
  $$('.button:not(.button--ghost), .shop-cta').forEach(element => {
    element.addEventListener('pointermove', event => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .06;
      const y = (event.clientY - rect.top - rect.height / 2) * .06;
      element.style.setProperty('--mx', `${x}px`);
      element.style.setProperty('--my', `${y}px`);
    });
    element.addEventListener('pointerleave', () => {
      element.style.removeProperty('--mx');
      element.style.removeProperty('--my');
    });
  });
}

function setupParallax() {
  if (reducedMotion) return;
  const items = $$('[data-parallax]');
  if (!items.length) return;
  let frame = false;
  const paint = () => {
    const viewport = window.innerHeight;
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > viewport + 200) { frame = false; return; }
      const amount = (rect.top + rect.height / 2 - viewport / 2) * Number(item.dataset.parallax || -.05);
      item.style.transform = `translate3d(0, ${amount}px, 0)`;
    });
    frame = false;
  };
  window.addEventListener('scroll', () => {
    if (frame) return;
    frame = true;
    requestAnimationFrame(paint);
  }, { passive: true });
  paint();
}

/* --------------------------------------------------------------------------
   5. Custom selects
   -------------------------------------------------------------------------- */
function setSelectLabel(trigger, text) {
  const label = $('.select-label', trigger);
  if (label) label.textContent = text;
}

function resetSelect(select, placeholder) {
  const trigger = $('.select-trigger', select);
  const hidden = $('.select-hidden', select);
  if (hidden) hidden.value = '';
  if (trigger) {
    setSelectLabel(trigger, placeholder || trigger.dataset.placeholder || 'Select an option');
    trigger.classList.add('is-placeholder');
  }
  $$('.select-option', select).forEach(option => option.setAttribute('aria-selected', 'false'));
}

function setupDropdowns() {
  $$('.custom-select').forEach(select => {
    const trigger = $('.select-trigger', select);
    const menu = $('.select-menu', select);
    const hidden = $('.select-hidden', select);
    if (!trigger || !menu || !hidden) return;
    const close = () => {
      menu.classList.remove('is-open');
      select.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };
    const choose = option => {
      hidden.value = option.dataset.value || '';
      setSelectLabel(trigger, option.dataset.label || option.textContent.trim());
      trigger.classList.remove('is-placeholder');
      $$('.select-option', menu).forEach(item => item.setAttribute('aria-selected', String(item === option)));
      close();
      hidden.dispatchEvent(new Event('change', { bubbles: true }));
      if (hidden.getAttribute('aria-invalid') === 'true') validateInput(hidden);
      trigger.focus();
    };
    const selectLabelNode = hidden.getAttribute('aria-labelledby') ? document.getElementById(hidden.getAttribute('aria-labelledby')) : null;
    if (selectLabelNode) {
      selectLabelNode.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        trigger.focus();
        if (!menu.classList.contains('is-open')) trigger.click();
      });
    }
    trigger.addEventListener('click', () => {
      const willOpen = !menu.classList.contains('is-open');
      $$('.custom-select').forEach(other => {
        if (other !== select) {
          other.querySelector('.select-menu')?.classList.remove('is-open');
          other.querySelector('.select-trigger')?.setAttribute('aria-expanded', 'false');
          other.classList.remove('is-open');
        }
      });
      close();
      if (willOpen) {
        menu.classList.add('is-open');
        select.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        ($('.select-option[aria-selected="true"]', menu) || $('.select-option', menu))?.focus();
      }
    });
    $$('.select-option', menu).forEach(option => option.addEventListener('click', () => {
      if (option.disabled || option.getAttribute('aria-disabled') === 'true') return;
      choose(option);
    }));
    select.addEventListener('keydown', event => {
      if (event.key === 'Escape') close();
    });
    menu.addEventListener('keydown', event => {
      const options = $$('.select-option:not([disabled])', menu);
      const current = options.indexOf(document.activeElement);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const next = event.key === 'ArrowDown' ? (current + 1) % options.length : (current - 1 + options.length) % options.length;
        options[next]?.focus();
      }
    });
    const described = hidden.getAttribute('aria-describedby');
    const fieldLabel = trigger.closest('.field')?.querySelector('.form-label');
    if (described) trigger.setAttribute('aria-describedby', described);
    if (fieldLabel?.id) trigger.setAttribute('aria-labelledby', fieldLabel.id);
  });
  document.addEventListener('click', event => {
    $$('.custom-select').forEach(select => {
      if (!select.contains(event.target)) {
        $('.select-menu', select)?.classList.remove('is-open');
        $('.select-trigger', select)?.setAttribute('aria-expanded', 'false');
        select.classList.remove('is-open');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Password, roles, validation
   -------------------------------------------------------------------------- */
function setupPasswordToggles() {
  $$('[data-password-toggle]').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = document.getElementById(toggle.dataset.passwordToggle);
      if (!input) return;
      const visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      const iconUse = toggle.querySelector('use');
      if (iconUse) {
        iconUse.setAttribute('href', visible ? '#i-eye' : '#i-eyeOff');
        toggle.setAttribute('aria-pressed', String(!visible));
      } else {
        toggle.textContent = visible ? 'Show' : 'Hide';
      }
      toggle.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
    });
  });
}

function setupPasswordStrength() {
  $$('[data-strength]').forEach(box => {
    const input = document.getElementById(box.dataset.strength);
    if (!input) return;
    const label = $('.strength-label', box);
    const defaultText = label ? label.textContent : '';
    const update = () => {
      const value = input.value;
      let level = 0;
      if (value.length >= 8) level += 1;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) level += 1;
      if (/\d/.test(value)) level += 1;
      if (/[^A-Za-z0-9]/.test(value) && value.length >= 10) level += 1;
      box.dataset.level = String(level);
      if (!label) return;
      label.textContent = !value ? defaultText : ['Too short', 'Getting there', 'Good strength', 'Strong', 'Excellent'][level];
    };
    input.addEventListener('input', update);
    update();
  });
}

function setupRoleSwitches() {
  $$('.role-switch').forEach(switcher => {
    const opts = $$('.role-opt', switcher);
    opts.forEach(opt => {
      const radio = $('input[type="radio"]', opt);
      if (!radio) return;
      const activate = () => {
        opts.forEach(item => item.classList.toggle('on', item === opt));
        const field = switcher.closest('.field');
        const error = field?.querySelector('.field-error');
        if (error) error.textContent = '';
      };
      radio.addEventListener('change', () => { if (radio.checked) activate(); });
      if (radio.checked) activate();
    });
  });
}

function findFieldError(input) {
  const group = input.closest('.field') || input.closest('.form-group') || input.closest('.custom-select');
  if (group) {
    const error = $('.field-error', group);
    if (error) return error;
  }
  const described = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean)
    .map(id => document.getElementById(id))
    .find(node => node && node.classList.contains('field-error'));
  return described || null;
}

function selectTriggerFor(input) {
  return input.closest('.custom-select')?.querySelector('.select-trigger') || null;
}

function showFieldError(input, message) {
  const error = findFieldError(input);
  input.setAttribute('aria-invalid', 'true');
  const trigger = selectTriggerFor(input);
  if (trigger) trigger.setAttribute('aria-invalid', 'true');
  if (error) error.textContent = message;
}

function clearFieldError(input) {
  const error = findFieldError(input);
  input.removeAttribute('aria-invalid');
  const trigger = selectTriggerFor(input);
  if (trigger) trigger.removeAttribute('aria-invalid');
  if (error) error.textContent = '';
}

function validateInput(input) {
  const type = input.dataset.validate;
  const value = input.value.trim();
  let message = '';
  if (!message && (input.required || type === 'required') && !value) message = 'This field is required.';
  if (!message && type === 'name' && !/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ .'-]{2,}$/.test(value)) message = 'Use at least 3 letters for your name.';
  if (!message && type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value)) message = 'Enter a valid email address.';
  if (!message && type === 'phone' && !/^\d{10}$/.test(value.replace(/[\s()-]/g, ''))) message = 'Enter a valid 10-digit phone number.';
  if (!message && type === 'password' && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) message = 'Use 8+ characters with an uppercase letter, a lowercase letter, and a number.';
  if (!message && type === 'confirm' && value !== (input.form?.querySelector('[data-validate="password"]')?.value || '')) message = 'Passwords do not match.';
  if (!message && type === 'message' && value.length < 12) message = 'Tell us a little more (12 characters minimum).';
  if (!message && type === 'role' && !value) message = 'Choose an account role to continue.';
  if (message) showFieldError(input, message);
  else clearFieldError(input);
  return !message;
}

function validateForm(form) {
  let valid = true;
  $$('[data-validate]', form).forEach(input => {
    if (!validateInput(input)) valid = false;
  });
  $$('input[type="checkbox"][required]', form).forEach(input => {
    const error = findFieldError(input);
    if (!input.checked) {
      input.setAttribute('aria-invalid', 'true');
      if (error) error.textContent = 'Please tick this box to continue.';
      valid = false;
    } else {
      input.removeAttribute('aria-invalid');
      if (error) error.textContent = '';
    }
  });
  return valid;
}

function setupForms() {
  $$('[data-validate]').forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateInput(input);
    });
    input.addEventListener('change', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateInput(input);
    });
  });

  $$('input[type="checkbox"][required]').forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) clearFieldError(input);
    });
  });

  const signup = $('#signup-form');
  if (signup) {
    signup.addEventListener('submit', async event => {
      event.preventDefault();
      if (!validateForm(signup)) {
        showToast('Please review the highlighted fields.', 'error');
        return;
      }
      const email = signup.querySelector('[name="email"]').value.trim().toLowerCase();
      const users = getUsers();
      if (users.some(user => user.email === email)) {
        showFieldError(signup.querySelector('[name="email"]'), 'An account with this email already exists. Try signing in.');
        return;
      }
      const submit = signup.querySelector('[type="submit"]');
      const original = submit.innerHTML;
      submit.disabled = true;
      submit.textContent = 'Creating your account…';
      const user = {
        name: signup.querySelector('[name="name"]').value.trim(),
        email,
        phone: signup.querySelector('[name="phone"]').value.replace(/[\s()-]/g, ''),
        role: signup.querySelector('input[name="role"]:checked')?.value || 'customer',
        passwordHash: await hashPassword(signup.querySelector('[name="password"]').value),
        createdAt: new Date().toISOString()
      };
      users.push(user);
      saveUsers(users);
      try {
        sessionStorage.setItem('stacklyGardenSignupEmail', email);
        sessionStorage.setItem('stacklyGardenFlash', 'Account created. Sign in to open your garden workspace.');
      } catch { /* storage unavailable */ }
      submit.disabled = false;
      submit.innerHTML = original;
      window.location.href = 'login.html';
    });
  }

  const login = $('#login-form');
  if (login) {
    login.addEventListener('submit', async event => {
      event.preventDefault();
      if (!validateForm(login)) return;
      const email = login.querySelector('[name="email"]').value.trim().toLowerCase();
      const password = login.querySelector('[name="password"]').value;
      const role = login.querySelector('input[name="role"]:checked')?.value || 'customer';
      await seedDemoAccounts();
      const user = getUsers().find(item => item.email === email);
      if (!user || user.passwordHash !== await hashPassword(password)) {
        showFieldError(login.querySelector('[name="password"]'), 'Email or password is not correct.');
        return;
      }
      if (user.role !== role) {
        showFieldError(login.querySelector('input[name="role"]') || login.querySelector('[name="email"]'),
          `Choose the ${user.role === 'admin' ? 'Admin' : 'Customer'} role to continue.`);
        return;
      }
      const submit = login.querySelector('[type="submit"]');
      submit.disabled = true;
      submit.textContent = 'Opening your workspace…';
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({
          name: user.name, email: user.email, role: user.role, signedInAt: Date.now()
        }));
      } catch { /* storage unavailable */ }
      window.location.href = user.role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
    });

    const demoChips = $$('[data-demo-fill]', login);
    demoChips.forEach(chip => chip.addEventListener('click', () => {
      login.querySelector('[data-validate="email"]').value = chip.dataset.demoEmail;
      login.querySelector('[data-validate="password"]').value = chip.dataset.demoPassword;
      const radio = login.querySelector(`input[name="role"][value="${chip.dataset.demoRole}"]`);
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
      $$('[data-validate]', login).forEach(input => clearFieldError(input));
      showToast(`${chip.dataset.demoRole === 'admin' ? 'Admin' : 'Customer'} demo credentials filled in.`, 'ok');
      login.querySelector('[type="submit"]').focus();
    }));

    const prefill = (() => {
      try { return sessionStorage.getItem('stacklyGardenSignupEmail') || ''; } catch { return ''; }
    })();
    if (prefill) {
      const emailInput = login.querySelector('[name="email"]');
      if (emailInput && !emailInput.value) emailInput.value = prefill;
      try { sessionStorage.removeItem('stacklyGardenSignupEmail'); } catch { /* storage unavailable */ }
    }
    const flash = (() => {
      try {
        const value = sessionStorage.getItem('stacklyGardenFlash');
        sessionStorage.removeItem('stacklyGardenFlash');
        return value;
      } catch { return null; }
    })();
    if (flash) showToast(flash, 'ok');

    $('[data-forgot-password]')?.addEventListener('click', () => {
      pushReturnPage(currentPageFile());
      window.location.href = '404.html';
    });
  }

  const contact = $('#contact-form');
  if (contact) {
    contact.addEventListener('submit', event => {
      event.preventDefault();
      if (!validateForm(contact)) {
        showToast('Please fix the highlighted fields and try again.', 'error');
        $('[aria-invalid="true"]', contact)?.focus();
        return;
      }
      $('.form-success', contact.closest('.contact-card') || contact.parentElement)?.classList.add('is-visible');
      showToast('Message received. Our garden team replies within one working day.', 'ok');
      contact.reset();
      $$('.custom-select', contact).forEach(select => resetSelect(select));
      $$('[data-validate]', contact).forEach(input => clearFieldError(input));
      $$('input[type="checkbox"]', contact).forEach(input => {
        input.checked = false;
        input.closest('.check-chip')?.classList.remove('is-on');
      });
    });
  }

  const booking = $('#booking-form');
  if (booking) {
    booking.addEventListener('submit', event => {
      event.preventDefault();
      if (!validateForm(booking)) {
        showToast('Please fix the highlighted fields and try again.', 'error');
        return;
      }
      $('.form-success', booking.parentElement)?.classList.add('is-visible');
      showToast('Request received. We will confirm your visit shortly.', 'ok');
      booking.reset();
      $$('.custom-select', booking).forEach(select => resetSelect(select));
      $$('[data-validate]', booking).forEach(input => clearFieldError(input));
    });
  }

  $$('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', () => input.closest('.check-chip')?.classList.toggle('is-on', input.checked));
  });

  $$('.newsletter-form').forEach(form => {
    const input = $('[data-validate="email"]', form);
    const success = $('.newsletter-success', form);
    let hideTimer;
    let removeTimer;
    const hideSuccess = () => {
      clearTimeout(hideTimer);
      if (!success || !success.classList.contains('is-visible')) return;
      success.classList.add('is-leaving');
      clearTimeout(removeTimer);
      removeTimer = setTimeout(() => success.classList.remove('is-visible', 'is-leaving'), 320);
    };
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!input || !validateInput(input)) return;
      clearTimeout(removeTimer);
      success?.classList.remove('is-leaving');
      success?.classList.add('is-visible');
      showToast('You are on the Seasonal Edit list. Welcome in.', 'ok');
      form.reset();
      clearFieldError(input);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(hideSuccess, 4000);
    });
    input?.addEventListener('input', hideSuccess);
  });
}

/* --------------------------------------------------------------------------
   7. Toast + demo accounts
   -------------------------------------------------------------------------- */
function showToast(message, tone = 'ok') {
  let stack = $('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    body.appendChild(stack);
  }
  const toast = document.createElement('div');
  toast.className = `toast${tone === 'ok' ? '' : tone === 'error' ? ' is-error' : ' is-warn'}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  const symbol = tone === 'ok' ? 'check' : tone === 'error' ? 'alert' : 'info';
  const spriteFallback = tone === 'ok' ? SPRITE.check : tone === 'error' ? SPRITE.alert || SPRITE.help : SPRITE.info || SPRITE.help;
  const ico = SPRITE[symbol] || spriteFallback;
  toast.innerHTML = `
    <span class="toast-ico"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24">${ico}</svg></span>
    <div class="toast-body"><strong>${tone === 'ok' ? 'All set' : tone === 'error' ? 'Please check' : 'Heads up'}</strong><p>${message}</p></div>
    <button class="toast-close" type="button" aria-label="Dismiss notification">${icon('close')}</button>`;
  stack.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('is-in'));
  const dismiss = () => {
    toast.classList.remove('is-in');
    window.setTimeout(() => toast.remove(), 450);
  };
  $('.toast-close', toast)?.addEventListener('click', dismiss);
  window.setTimeout(dismiss, 4800);
}

async function hashPassword(value) {
  if (window.crypto?.subtle && window.TextEncoder) {
    const buffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return btoa(unescape(encodeURIComponent(value)));
}

const USERS_KEY = 'stackly.gardenUsers';
const SESSION_KEY = 'stackly.gardenSession';
const DEMO_PASSWORD = 'Demo1234';
const DEMO_ACCOUNTS = [
  { name: 'Eleanor Hart', email: 'admin@stackly.demo', phone: '5550142208', role: 'admin' },
  { name: 'James Whitfield', email: 'customer@stackly.demo', phone: '5550142208', role: 'customer' }
];

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}

function saveUsers(users) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch { /* storage unavailable */ }
}

function readSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}

let seedPromise = null;
function seedDemoAccounts() {
  if (seedPromise) return seedPromise;
  seedPromise = (async () => {
    try {
      const users = getUsers();
      let changed = false;
      const passwordHash = await hashPassword(DEMO_PASSWORD);
      for (const account of DEMO_ACCOUNTS) {
        const existing = users.find(user => user.email === account.email);
        if (!existing) {
          users.push({ ...account, passwordHash, createdAt: new Date().toISOString() });
          changed = true;
        } else if (existing.passwordHash !== passwordHash) {
          existing.passwordHash = passwordHash;
          existing.role = account.role;
          changed = true;
        }
      }
      if (changed) saveUsers(users);
    } catch { /* storage unavailable */ }
  })();
  return seedPromise;
}

/* --------------------------------------------------------------------------
   8. Modals
   -------------------------------------------------------------------------- */
function setupModals() {
  let openModal = null;
  let lastTrigger = null;

  const closeModal = (modal = openModal) => {
    if (!modal) return;
    modal.classList.remove('is-open');
    window.setTimeout(() => { if (!modal.classList.contains('is-open')) modal.hidden = true; }, 380);
    $('.modal-backdrop')?.classList.remove('is-open');
    body.classList.remove('is-locked');
    if (openModal === modal) openModal = null;
    if (lastTrigger) { lastTrigger.focus({ preventScroll: true }); lastTrigger = null; }
  };

  const openAt = (modal, trigger) => {
    if (!modal) return;
    lastTrigger = trigger || document.activeElement;
    openModal = modal;
    modal.hidden = false;
    $('.modal-backdrop')?.classList.add('is-open');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    body.classList.add('is-locked');
    $('[data-modal-close]', modal)?.focus({ preventScroll: true });
  };

  $$('[data-project-open]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      const modal = $('#project-modal');
      if (!modal) return;
      const gallery = (trigger.dataset.gallery || '').split(',').map(item => item.trim()).filter(Boolean);
      const main = $('[data-project-image]', modal);
      const mainSrc = trigger.dataset.image || (gallery[0] ? `assets/img/${gallery[0]}` : '');
      if (main && mainSrc) {
        main.src = mainSrc;
        main.alt = trigger.dataset.title || 'Stackly Gardens project';
      }
      const title = $('[data-project-title]', modal);
      const kicker = $('[data-project-kicker]', modal);
      const text = $('[data-project-text]', modal);
      const location = $('[data-project-location]', modal);
      const year = $('[data-project-year]', modal);
      const scope = $('[data-project-scope]', modal);
      if (title) title.textContent = trigger.dataset.title || 'A Stackly garden';
      if (kicker) kicker.textContent = trigger.dataset.kicker || 'Signature project';
      if (text) text.textContent = trigger.dataset.text || '';
      if (location) location.textContent = trigger.dataset.location || '—';
      if (year) year.textContent = trigger.dataset.year || '—';
      if (scope) scope.textContent = trigger.dataset.scope || '—';
      const thumbRow = $('[data-project-gallery]', modal);
      if (thumbRow) {
        thumbRow.innerHTML = gallery.map((file, index) =>
          `<img src="assets/img/${file}" alt="Project view ${index + 1}" width="84" height="62" loading="lazy" class="${index === 0 ? 'is-active' : ''}" data-project-thumb>`).join('');
        $$('[data-project-thumb]', thumbRow).forEach(thumb => thumb.addEventListener('click', () => {
          if (!main) return;
          main.src = thumb.src;
          main.alt = title?.textContent || 'Project view';
          $$('[data-project-thumb]', thumbRow).forEach(item => item.classList.toggle('is-active', item === thumb));
        }));
      }
      closeButtonFocus(modal);
      openAt(modal, trigger);
    });
  });

  function closeButtonFocus(modal) {
    $('[data-modal-close]', modal)?.focus({ preventScroll: true });
  }

  $$('[data-modal-open]').forEach(trigger => {
    if (trigger.matches('[data-project-open]')) return;
    trigger.addEventListener('click', event => {
      const modal = document.getElementById(trigger.dataset.modalOpen);
      if (!modal) return;
      event.preventDefault();
      openAt(modal, trigger);
    });
  });

  $$('[data-modal-close]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    closeModal(button.closest('.modal') || openModal);
  }));

  $('.modal-backdrop')?.addEventListener('click', () => closeModal());

  document.addEventListener('keydown', event => {
    if (!openModal) return;
    if (event.key === 'Escape') { event.preventDefault(); closeModal(); }
    if (event.key === 'Tab') {
      const focusable = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', openModal)
        .filter(item => !item.disabled && !item.hidden && item.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
}

/* --------------------------------------------------------------------------
   9. Before / after slider
   -------------------------------------------------------------------------- */
function setupBeforeAfter() {
  $$('[data-ba]').forEach(wrapper => {
    const range = $('[data-ba-range]', wrapper);
    const set = value => {
      const pos = Math.max(0, Math.min(100, Number(value)));
      wrapper.style.setProperty('--pos', `${pos}%`);
      if (range) range.value = String(pos);
    };
    if (range) {
      const initial = range.value || '52';
      set(initial);
      range.addEventListener('input', () => set(range.value));
    } else {
      set(wrapper.style.getPropertyValue('--pos').replace('%', '') || 52);
    }
  });
}

/* --------------------------------------------------------------------------
   10. Testimonials
   -------------------------------------------------------------------------- */
function setupQuotes() {
  $$('[data-quotes]').forEach(shell => {
    const track = $('[data-quote-track]', shell);
    const slides = $$('.quote-slide', shell);
    const dotsBox = $('[data-quote-dots]', shell);
    if (!track || slides.length < 2) return;
    let index = 0;
    const dots = slides.map((slide, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      dot.addEventListener('click', () => go(i, true));
      dotsBox?.appendChild(dot);
      return dot;
    });
    const go = (next, stop = false) => {
      index = (next + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-current', String(i === index));
      });
      if (stop) pause();
    };
    let timer = null;
    const play = () => {
      if (reducedMotion) return;
      timer = window.setInterval(() => go(index + 1), 6500);
    };
    const pause = () => { if (timer) { clearInterval(timer); timer = null; } };
    go(0);
    play();
    shell.addEventListener('pointerenter', pause);
    shell.addEventListener('pointerleave', play);
    shell.addEventListener('focusin', pause);
    shell.addEventListener('focusout', play);
    $('[data-quote-prev]', shell)?.addEventListener('click', () => go(index - 1, true));
    $('[data-quote-next]', shell)?.addEventListener('click', () => go(index + 1, true));
  });
}

/* --------------------------------------------------------------------------
   11. Billing, seasons, checklist, FAQ, filters
   -------------------------------------------------------------------------- */
function setupBilling() {
  $$('[data-billing]').forEach(group => {
    const buttons = $$('button', group);
    const apply = mode => {
      buttons.forEach(button => {
        const on = button.dataset.billingValue === mode;
        button.classList.toggle('is-active', on);
        button.setAttribute('aria-pressed', String(on));
      });
      $$('[data-price-monthly]').forEach(price => {
        const monthly = Number(price.dataset.priceMonthly);
        const annual = Number(price.dataset.priceAnnual || Math.round(monthly * 10.2));
        price.textContent = mode === 'annual' ? String(Math.round(annual / 12)) : String(monthly);
      });
      $$('[data-billed]').forEach(note => {
        note.textContent = mode === 'annual' ? 'Billed annually · two months gifted' : 'Billed monthly · cancel anytime';
      });
      $$('[data-price-note]').forEach(note => {
        note.textContent = mode === 'annual' ? 'per month, billed yearly' : 'per month';
      });
    };
    buttons.forEach(button => button.addEventListener('click', () => apply(button.dataset.billingValue || 'monthly')));
    apply(group.querySelector('.is-active')?.dataset.billingValue || 'monthly');
  });
}

function setupSeasonTabs() {
  $$('[data-season-group]').forEach(group => {
    const tabs = $$('[data-season]', group);
    const panels = $$('[data-season-panel]', group);
    const activate = key => {
      tabs.forEach(tab => {
        const on = tab.dataset.season === key;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
      });
      panels.forEach(panel => panel.classList.toggle('is-active', panel.dataset.seasonPanel === key));
    };
    tabs.forEach(tab => {
      tab.addEventListener('click', () => activate(tab.dataset.season));
      tab.addEventListener('keydown', event => {
        const current = tabs.indexOf(tab);
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        const next = tabs[(current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
        next.focus();
        activate(next.dataset.season);
      });
    });
    activate(group.querySelector('.season-tab.is-active')?.dataset.season || tabs[0]?.dataset.season);
  });
}

function setupChecklists() {
  $$('[data-checklist]').forEach(panel => {
    const items = $$('[data-check]', panel);
    const fill = $('[data-check-fill]', panel);
    const count = $('[data-check-count]', panel);
    const reset = $('[data-check-reset]', panel);
    const update = () => {
      const done = items.filter(item => item.checked).length;
      const ratio = items.length ? (done / items.length) * 100 : 0;
      if (fill) fill.style.width = `${ratio}%`;
      if (count) count.textContent = `${done} / ${items.length}`;
      items.forEach(item => item.closest('.check-item')?.classList.toggle('is-done', item.checked));
    };
    items.forEach(item => item.addEventListener('change', update));
    reset?.addEventListener('click', () => {
      items.forEach(item => { item.checked = false; });
      update();
      showToast('Seasonal checklist reset for a fresh start.', 'ok');
    });
    update();
  });
}

function setupFaqs() {
  $$('.faq-item').forEach(item => {
    const button = $('.faq-question', item);
    const answer = $('.faq-answer', item);
    if (!button || !answer) return;
    button.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      const list = item.closest('.faq-list');
      if (list && willOpen) {
        $$('.faq-item.is-open', list).forEach(other => {
          if (other === item) return;
          other.classList.remove('is-open');
          $('.faq-question', other)?.setAttribute('aria-expanded', 'false');
          const otherAnswer = $('.faq-answer', other);
          if (otherAnswer) otherAnswer.style.maxHeight = '';
        });
      }
      item.classList.toggle('is-open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
      answer.style.maxHeight = willOpen ? `${answer.scrollHeight}px` : '';
    });
  });
}

function setupFilters() {
  $$('[data-filter-group]').forEach(group => {
    const buttons = $$('[data-filter]', group);
    const target = document.querySelector(`[data-filter-target="${group.dataset.filterGroup}"]`);
    if (!target) return;
    const empty = document.querySelector(`[data-filter-empty="${group.dataset.filterGroup}"]`);
    buttons.forEach(button => button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';
      buttons.forEach(item => {
        const on = item === button;
        item.classList.toggle('is-active', on);
        item.setAttribute('aria-pressed', String(on));
      });
      let visible = 0;
      $$('[data-category]', target).forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
        if (match) visible += 1;
      });
      if (empty) empty.hidden = visible > 0;
      const count = document.querySelector(`[data-filter-count="${group.dataset.filterGroup}"]`);
      if (count) count.textContent = String(visible).padStart(2, '0');
    }));
  });
}

/* --------------------------------------------------------------------------
   12. Return stack / demo routing / error pages
   -------------------------------------------------------------------------- */
const RETURN_STACK_KEY = 'stackly.gardenReturnStack';
const SAME_TAB_KEY = 'stackly.gardenSameTab';
const RETURN_SCROLL_KEY = 'stackly.gardenReturnScroll';
const RETURN_SECTION_KEY = 'stackly.gardenReturnSection';

function currentPageFile() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function readReturnStack() {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(RETURN_STACK_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string') : [];
  } catch { return []; }
}

function writeReturnStack(stack) {
  try { sessionStorage.setItem(RETURN_STACK_KEY, JSON.stringify(stack.slice(-12))); } catch { /* storage unavailable */ }
}

function pushReturnPage(file, sameTab = true) {
  const stack = readReturnStack().filter(item => item !== file);
  stack.push(file);
  writeReturnStack(stack);
  try {
    sessionStorage.setItem(RETURN_SCROLL_KEY, JSON.stringify({ file, y: Math.round(window.scrollY) || 0 }));
    if (sameTab) sessionStorage.setItem(SAME_TAB_KEY, file);
    else sessionStorage.removeItem(SAME_TAB_KEY);
  } catch { /* storage unavailable */ }
}

function recordReturnSection(file, section) {
  if (!section) return;
  try { sessionStorage.setItem(RETURN_SECTION_KEY, JSON.stringify({ file, section })); } catch { /* storage unavailable */ }
}

function consumeReturnSection(file) {
  try {
    const saved = JSON.parse(sessionStorage.getItem(RETURN_SECTION_KEY) || 'null');
    if (!saved || saved.file !== file) return null;
    sessionStorage.removeItem(RETURN_SECTION_KEY);
    return saved.section;
  } catch { return null; }
}

function restoreReturnScroll(file) {
  let saved = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(RETURN_SCROLL_KEY) || 'null');
    sessionStorage.removeItem(RETURN_SCROLL_KEY);
  } catch { /* storage unavailable */ }
  if (!saved || saved.file !== file || !saved.y) return;
  const apply = () => window.scrollTo({ top: saved.y, behavior: 'instant' });
  requestAnimationFrame(() => requestAnimationFrame(apply));
  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => requestAnimationFrame(apply), { once: true });
  }
}

function consumeSameTabReturn() {
  try {
    const file = sessionStorage.getItem(SAME_TAB_KEY) || null;
    sessionStorage.removeItem(SAME_TAB_KEY);
    return file;
  } catch { return null; }
}

function peekReturnPage() {
  const stack = readReturnStack();
  return stack.length ? stack[stack.length - 1] : null;
}

function popReturnPage() {
  const stack = readReturnStack();
  const file = stack.pop() || null;
  writeReturnStack(stack);
  return file;
}

function dashboardForRole() {
  const session = readSession();
  if (session?.role === 'admin') return 'admin-dashboard.html';
  if (session?.role === 'customer') return 'customer-dashboard.html';
  return null;
}

function isErrorPage(file) {
  return file === '404.html' || file === '404dash.html';
}

function inSiteReferrer() {
  try {
    if (!document.referrer) return null;
    const url = new URL(document.referrer, window.location.href);
    if (url.origin !== window.location.origin) return null;
    const file = url.pathname.split('/').pop() || 'index.html';
    return isErrorPage(file) ? null : file;
  } catch { return null; }
}

function goBackOr(fallback) {
  const here = currentPageFile();
  const referrer = inSiteReferrer();
  const recorded = peekReturnPage();
  const usable = file => Boolean(file) && file !== here && !isErrorPage(file);

  // Always prefer the browser's own back entry. This restores the exact
  // previous screen (including scroll position and in-page section) instead
  // of loading a page from the top and dropping the visitor at the hero.
  if (window.history.length > 1) {
    consumeSameTabReturn();
    if (recorded && (recorded === referrer || usable(recorded))) popReturnPage();
    window.history.back();
    return;
  }

  // Directly-opened error page: no history entry to return to, so use the
  // recorded page or the referrer as a sensible fallback.
  consumeSameTabReturn();
  if (usable(recorded)) {
    popReturnPage();
    window.location.href = recorded;
    return;
  }
  if (usable(referrer)) {
    window.location.href = referrer;
    return;
  }
  window.location.href = fallback || 'index.html';
}

function setupErrorPage() {
  const errorPage = $('[data-error-page]');
  if (!errorPage) return;
  const fallback = page === '404dash' ? (dashboardForRole() || 'login.html') : 'index.html';
  $$('[data-go-back]').forEach(button => button.addEventListener('click', () => goBackOr(fallback)));
  const dashboard = dashboardForRole();
  $$('[data-dashboard-return]').forEach(link => {
    link.href = dashboard ? `${dashboard}#sec-overview` : 'login.html#login-form';
  });
  const form = $('[data-error-search]');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const input = $('input', form);
      if (!input || !input.value.trim()) return;
      pushReturnPage(currentPageFile());
      window.location.href = '404.html';
    });
  }
}

function setupGoBackButtons() {
  if ($('[data-error-page]')) return;
  $$('[data-go-back]').forEach(button => button.addEventListener('click', () => goBackOr('index.html')));
}

function setupReturnTracking() {
  const here = currentPageFile();
  if (isErrorPage(here)) return;
  consumeSameTabReturn();
  restoreReturnScroll(here);
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || (link.target && link.target !== '_self')) return;
    let file = null;
    try { file = new URL(link.href, window.location.href).pathname.split('/').pop() || 'index.html'; } catch { return; }
    if (file !== '404.html' && file !== '404dash.html') return;
    pushReturnPage(currentPageFile(), !(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey));
  }, true);
}

const PUBLIC_PAGES = ['home', 'services', 'projects', 'care', 'about', 'contact'];
const CARD_SELECTOR = [
  '.card', '.service-card', '.project-card', '.journal-card', '.plan-card',
  '.testimonial-card', '.team-card', '.step-card', '.addon-card', '.info-card',
  '.value-card', '.tool-card', '.plant-card', '.quote-card', '.compare-card',
  '.contact-card', '.map-card', '.client-card', '.settings-card',
  '.atelier-feature', '.season-panel'
].join(', ');

const KEEP_CLICKABLE = [
  '.menu-toggle', '.drawer-close', '[data-drawer-close]', '[data-drawer-backdrop]',
  '.header-login', '.mobile-drawer a[href="login.html"]',
  '.skip-link', '.select-trigger', '.select-option', '[data-filter]',
  '[data-modal-open]', '[data-modal-close]', '[data-project-thumb]',
  '[data-go-back]', '[data-safe]', '[data-demo-fill]',
  '[data-quote-prev]', '[data-quote-next]', '[data-billing-value]', '[data-season]',
  '[data-check-reset]', '[data-before-after]',
  '.faq-question', '.season-tab', '.quote-arrow', '.quote-dots button', '.billing-toggle button',
  '.toast-close', '.pass-toggle',
  '.gallery-item', '.modal', '.modal-backdrop'
].join(', ');

function setupDemoRouting() {
  if (!PUBLIC_PAGES.includes(page)) return;
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0) return;
    const target = event.target instanceof Element ? event.target.closest('a, button') : null;
    if (!target) return;
    if (target.hasAttribute('data-no-redirect')) return;

    const inChrome = Boolean(target.closest('.site-header, .site-footer, .mobile-drawer'));
    const isCta = target.matches('a.button');
    const isCard = target.matches(CARD_SELECTOR);

    if (target.matches('a')) {
      // Header, footer and mobile-drawer links keep their existing behaviour.
      if (inChrome && !isCta) return;
      const inHero = Boolean(target.closest('.hero'));
      // All hero buttons route to 404.
      if (inHero && target.classList.contains('button')) {
        event.preventDefault();
        pushReturnPage(currentPageFile());
        window.location.href = '404.html';
        return;
      }
      // Cards are not real destinations; keep them from opening their href.
      // Modal triggers inside cards, filters and other controls stay usable.
      if (!isCard && !isCta && target.closest(KEEP_CLICKABLE)) return;
      const href = target.getAttribute('href') || '';
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      try {
        if (new URL(target.href, window.location.href).origin !== window.location.origin) return;
      } catch { return; }
      if (target.target === '_blank') return;
    } else {
      if (target.closest(KEEP_CLICKABLE)) return;
      if (target.matches('input, select, textarea, label')) return;
      const form = target.closest('form');
      if (form && target.matches('button[type="submit"], input[type="submit"]')) return;
    }

    event.preventDefault();
    pushReturnPage(currentPageFile());
    window.location.href = '404.html';
  }, true);
}

/* Placeholder links in the demo markup point at 404.html / 404dash.html.
   They must not navigate there unless they are CTA buttons or buttons, so
   ordinary links stay on the current screen instead of showing an error page. */
function setupPlaceholderNavigation() {
  if ($('[data-error-page]') || PUBLIC_PAGES.includes(page)) return;
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0) return;
    const link = event.target instanceof Element ? event.target.closest('a') : null;
    if (!link || link.classList.contains('button')) return;
    if (link.target === '_blank') return;
    // Footer placeholder links are meant to open the demo 404 page.
    if (link.closest('.site-footer') && (link.classList.contains('social-link') || link.closest('.footer-column') || link.closest('.footer-bottom-links'))) return;
    let file = '';
    try { file = new URL(link.href, window.location.href).pathname.split('/').pop().toLowerCase(); } catch { return; }
    if (file !== '404.html' && file !== '404dash.html') return;
    event.preventDefault();
  }, true);
}

/* --------------------------------------------------------------------------
   13. Page transition + boot
   -------------------------------------------------------------------------- */
function setupPageEntrance() {
  body.classList.add('page-transition');
  body.addEventListener('animationend', event => {
    if (event.target === body && event.animationName === 'pageIn') body.classList.remove('page-transition');
  });
}

function boot() {
  renderSprite();
  renderPublicChrome();
  seedDemoAccounts();
  setupPageEntrance();
  setupHeader();
  setupScrollProgress();
  setupCursorGlow();
  setupReveals();
  setupCounters();
  setupMeters();
  setupTilt();
  setupMagnetic();
  setupParallax();
  setupDropdowns();
  setupPasswordToggles();
  setupPasswordStrength();
  setupRoleSwitches();
  setupForms();
  setupModals();
  setupBeforeAfter();
  setupQuotes();
  setupBilling();
  setupSeasonTabs();
  setupChecklists();
  setupFaqs();
  setupFilters();
  setupErrorPage();
  setupGoBackButtons();
  setupReturnTracking();
  setupPlaceholderNavigation();
  setupDemoRouting();
}

window.Stackly = {
  icon,
  showToast,
  readSession,
  getUsers,
  SESSION_KEY,
  USERS_KEY,
  dashboardForRole,
  currentPageFile,
  recordReturnSection,
  consumeReturnSection,
  reducedMotion
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
