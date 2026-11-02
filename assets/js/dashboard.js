/* ==========================================================================
   STACKLY GARDENS — dashboard behaviour
   Role guard · section routing · demo data interactions
   ========================================================================== */

const dashBody = document.body;
const dashRole = dashBody.dataset.page === 'admin' ? 'admin' : 'customer';
const dashPageFile = window.location.pathname.split('/').pop() || 'admin-dashboard.html';
const $d = (selector, scope = document) => scope.querySelector(selector);
const $$d = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const Stackly = window.Stackly || {};
const dashIcon = Stackly.icon || (() => '');
const toast = Stackly.showToast || (() => {});

const DASH_SESSION_KEY = Stackly.SESSION_KEY || 'stackly.gardenSession';

const ADMIN_NAV = [
  ['Overview', [['overview', 'Overview', 'grid']]],
  ['Studio', [
    ['jobs', 'Jobs & tasks', 'sprout', '5'],
    ['projects', 'Projects', 'layers'],
    ['schedule', 'Schedule', 'calendar', '3'],
    ['clients', 'Clients', 'users']
  ]],
  ['Business', [
    ['services', 'Services & stock', 'package'],
    ['reports', 'Reports', 'pie'],
    ['settings', 'Settings', 'settings']
  ]]
];

const CUSTOMER_NAV = [
  ['My garden', [
    ['overview', 'Overview', 'grid'],
    ['garden', 'Garden profile', 'leaf']
  ]],
  ['Care', [
    ['bookings', 'Bookings', 'calendar', '2'],
    ['plans', 'Care plan', 'layers'],
    ['care', 'Care calendar', 'heart']
  ]],
  ['Billing', [
    ['invoices', 'Invoices', 'wallet'],
    ['messages', 'Messages', 'message', '2'],
    ['gallery', 'Garden gallery', 'camera']
  ]],
  ['Account', [['settings', 'Settings', 'settings']]]
];

function readSession() {
  try { return JSON.parse(sessionStorage.getItem(DASH_SESSION_KEY) || 'null'); } catch { return null; }
}

function guardSession() {
  const session = readSession();
  if (!session || !session.role) {
    try { sessionStorage.setItem('stacklyGardenFlash', 'Please sign in to open your garden workspace.'); } catch { /* storage unavailable */ }
    window.location.replace('login.html');
    return null;
  }
  if (session.role !== dashRole) {
    window.location.replace(session.role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html');
    return null;
  }
  return session;
}

const session = guardSession();
if (session) initDashboard(session);

function initDashboard(user) {
  const dash = $d('[data-dashboard]');
  if (!dash) return;
  const roleLabel = user.role === 'admin' ? 'Administrator' : 'Garden client';
  const initials = user.name.split(/\s+/).filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase();
  $$d('[data-user-name]').forEach(node => { node.textContent = user.name; });
  $$d('[data-role-name]').forEach(node => { node.textContent = roleLabel; });
  $$d('[data-user-email]').forEach(node => { node.textContent = user.email; });
  $$d('[data-user-initials]').forEach(node => { node.textContent = initials; });
  $$d('[data-greeting]').forEach(node => {
    const hour = new Date().getHours();
    node.textContent = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  });

  /* ---------- Navigation ---------- */
  const groups = user.role === 'admin' ? ADMIN_NAV : CUSTOMER_NAV;
  const navSlot = $d('[data-dash-nav]');
  if (navSlot) {
    navSlot.innerHTML = groups.map(([label, items]) => `
      <div class="dash-nav-label">${label}</div>
      ${items.map(([key, text, ico, badge]) => `
        <a class="dash-link" href="#sec-${key}" data-section="sec-${key}" data-label="${text}">
          ${dashIcon(ico)}<span>${text}</span>${badge ? `<span class="pill">${badge}</span>` : ''}
        </a>`).join('')}
    `).join('');
  }

  /* ---------- Section switching ---------- */
  const links = $$d('.dash-link', dash);
  const targets = links.map(link => ({ link, section: document.getElementById(link.dataset.section), label: link.dataset.label }))
    .filter(item => item.section);
  const crumbTitle = $d('[data-crumb-title]');
  const searchInputs = $$d('[data-dash-search]', dash);

  const clearSearch = () => {
    searchInputs.forEach(input => {
      input.value = '';
      const target = document.getElementById(input.dataset.dashSearch || '');
      if (!target) return;
      $$d('[data-search-item]', target).forEach(item => { item.hidden = false; });
      const empty = $d('[data-search-empty]', target);
      if (empty) empty.hidden = true;
    });
    $$d('[data-dash-filter]', dash).forEach(button => button.classList.remove('is-active'));
  };

  const activate = item => {
    targets.forEach(entry => {
      const on = entry === item;
      entry.section.classList.toggle('is-active', on);
      entry.link.classList.toggle('is-active', on);
      if (on) entry.link.setAttribute('aria-current', 'page');
      else entry.link.removeAttribute('aria-current');
    });
    if (item && crumbTitle) crumbTitle.textContent = item.label;
    clearSearch();
    closeSidebar();
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: Stackly.reducedMotion ? 'auto' : 'smooth' });
    try { history.replaceState(null, '', `#${item.section.id}`); } catch { /* history unavailable */ }
    paintVisuals();
  };

  links.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const item = targets.find(entry => entry.link === link);
    if (item) activate(item);
  }));

  $$d('[data-dash-goto]').forEach(trigger => trigger.addEventListener('click', event => {
    event.preventDefault();
    const item = targets.find(entry => entry.section.id === trigger.dataset.dashGoto);
    if (item) activate(item);
  }));

  const fromHash = targets.find(item => `#${item.section.id}` === window.location.hash);
  let savedId = null;
  try {
    savedId = Stackly.consumeReturnSection ? Stackly.consumeReturnSection(dashPageFile) : null;
  } catch { savedId = null; }
  const saved = savedId ? targets.find(item => item.section.id === savedId) : null;
  const initial = fromHash || saved || targets[0];
  if (initial) {
    targets.forEach(entry => {
      entry.section.classList.toggle('is-active', entry === initial);
      entry.link.classList.toggle('is-active', entry === initial);
      if (entry === initial) entry.link.setAttribute('aria-current', 'page');
    });
    if (crumbTitle) crumbTitle.textContent = initial.label;
  }

  /* ---------- Sidebar ---------- */
  const closeSidebar = () => {
    dash.classList.remove('is-side-open');
    dashBody.classList.remove('is-locked');
    $d('[data-sidebar-toggle]')?.setAttribute('aria-expanded', 'false');
  };
  const openSidebar = () => {
    dash.classList.add('is-side-open');
    dashBody.classList.add('is-locked');
    $d('[data-sidebar-toggle]')?.setAttribute('aria-expanded', 'true');
    $d('[data-sidebar-close]')?.focus();
  };
  $d('[data-sidebar-toggle]')?.addEventListener('click', openSidebar);
  $d('[data-sidebar-close]')?.addEventListener('click', closeSidebar);
  $d('[data-sidebar-overlay]')?.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dash.classList.contains('is-side-open')) closeSidebar();
  });

  /* ---------- Logout ---------- */
  $$d('[data-logout]').forEach(button => button.addEventListener('click', () => {
    try { sessionStorage.removeItem(DASH_SESSION_KEY); } catch { /* storage unavailable */ }
    window.location.href = 'login.html';
  }));

  /* ---------- Demo 404 for non-functional actions ---------- */
  const activeSectionId = () => targets.find(item => item.section.classList.contains('is-active'))?.section.id || '';
  const to404 = () => {
    if (Stackly.recordReturnSection) Stackly.recordReturnSection(dashPageFile, activeSectionId());
    window.location.href = '404dash.html';
  };
  dash.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target.closest('a, button, input[type="submit"], input[type="image"]') : null;
    if (!target || !dash.contains(target)) return;
    if (target.matches('[data-sidebar-toggle]')) return;
    if (target.matches('[data-sidebar-close]')) return;
    if (target.matches('.dash-side [data-logout]')) return;
    if (target.matches('button[type="submit"], input[type="submit"], input[type="image"]') && target.closest('form')) return;
    if (target.closest('.dash-side a')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    to404();
  }, true);

  /* ---------- Search + filters ---------- */
  searchInputs.forEach(searchInput => {
    const target = document.getElementById(searchInput.dataset.dashSearch || '') || $d('.dash-section.is-active', dash);
    if (!target) return;
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      let visible = 0;
      $$d('[data-search-item]', target).forEach(item => {
        const match = !query || item.textContent.toLowerCase().includes(query);
        item.hidden = !match;
        if (match) visible += 1;
      });
      const empty = $d('[data-search-empty]', target);
      if (empty) empty.hidden = visible > 0 || !query;
    });
  });

  $$d('[data-dash-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const group = button.closest('[data-dash-filter-group]') || button.parentElement;
      const target = document.getElementById(button.dataset.dashFilterTarget || '') || $d('.dash-section.is-active', dash);
      if (!target) return;
      const value = button.dataset.dashFilter || 'all';
      const chipButtons = $$d('[data-dash-filter]', group);
      const isOn = button.classList.contains('is-active') && value !== 'all';
      chipButtons.forEach(chip => chip.classList.toggle('is-active', chip === button && !isOn));
      const activeValue = isOn ? 'all' : value;
      $$d('[data-status]', target).forEach(row => {
        row.hidden = !(activeValue === 'all' || row.dataset.status === activeValue);
      });
      const empty = $d('[data-search-empty]', target);
      if (empty) empty.hidden = true;
    });
  });

  /* ---------- Charts, rings, meters ---------- */
  function paintVisuals() {
    $$d('.chart-bar[data-value]').forEach(bar => {
      const value = Math.max(2, Math.min(100, Number(bar.dataset.value || 0)));
      bar.style.height = `${value}%`;
    });
    $$d('.ring[data-value]').forEach(ring => {
      ring.style.setProperty('--val', String(Math.max(0, Math.min(100, Number(ring.dataset.value || 0)))));
    });
    $$d('.meter-fill[data-meter]').forEach(fill => {
      fill.style.width = `${Math.max(0, Math.min(100, Number(fill.dataset.meter || 0)))}%`;
    });
  }
  paintVisuals();
  requestAnimationFrame(paintVisuals);

  /* ---------- Settings forms / message composer ---------- */
  $$d('[data-dash-save-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      toast('Preferences saved for this demo session.', 'ok');
    });
  });

  $$d('[data-dash-action]').forEach(button => {
    button.addEventListener('click', () => {
      const label = button.dataset.dashAction || 'Done';
      const row = button.closest('[data-status]');
      if (row) {
        row.dataset.status = 'done';
        const badge = row.querySelector('.badge');
        if (badge) {
          badge.textContent = 'Completed';
          badge.className = 'badge';
        }
      }
      toast(`${label} — updated in this demo.`, 'ok');
    });
  });

  const messageForm = $d('[data-message-form]');
  if (messageForm) {
    messageForm.addEventListener('submit', event => {
      event.preventDefault();
      const input = $d('textarea, input[name="message"]', messageForm);
      const text = input?.value.trim() || '';
      if (!text) { toast('Write a short message first.', 'warn'); input?.focus(); return; }
      const list = $d('[data-message-list]');
      if (list) {
        const item = document.createElement('div');
        item.className = 'msg';
        item.innerHTML = `
          <span class="avatar">${initials}</span>
          <div class="msg-copy"><b>You <span>Just now</span></b><p>${text.replace(/[<>&]/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[char]))}</p></div>`;
        list.prepend(item);
      }
      messageForm.reset();
      toast('Message sent to the studio. We will reply within one working day.', 'ok');
    });
  }

  /* ---------- Care checklist (dashboard) ---------- */
  $$d('[data-checklist]', dash).forEach(panel => {
    const items = $$d('[data-check]', panel);
    const fill = $d('[data-check-fill]', panel);
    const count = $d('[data-check-count]', panel);
    const update = () => {
      const done = items.filter(item => item.checked).length;
      if (fill) fill.style.width = `${items.length ? (done / items.length) * 100 : 0}%`;
      if (count) count.textContent = `${done} / ${items.length}`;
      items.forEach(item => item.closest('.check-item')?.classList.toggle('is-done', item.checked));
    };
    items.forEach(item => item.addEventListener('change', update));
    $d('[data-check-reset]', panel)?.addEventListener('click', () => {
      items.forEach(item => { item.checked = false; });
      update();
      toast('Checklist reset for a fresh week.', 'ok');
    });
    update();
  });

  const charts = $$d('.chart');
  if (charts.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { paintVisuals(); observer.unobserve(entry.target); } });
    }, { threshold: .25 });
    charts.forEach(chart => observer.observe(chart));
  }
}

/* Short screens: keep dashboard chrome usable */
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    document.querySelector('[data-dashboard]')?.classList.remove('is-side-open');
    document.body.classList.remove('is-locked');
  }
});
