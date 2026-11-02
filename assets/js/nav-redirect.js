(function(){
  const PUBLIC_PAGES = ['index.html','services.html','projects.html','about.html','contact.html','care-guide.html','signup.html','login.html','404.html'];
  const DASH_PAGES = ['admin-dashboard.html','customer-dashboard.html','404dash.html'];

  function isPublicPage(){
    const p = location.pathname.split('/').pop() || 'index.html';
    return PUBLIC_PAGES.includes(p) || p === '';
  }
  function isDashPage(){
    const p = location.pathname.split('/').pop() || '';
    return DASH_PAGES.includes(p);
  }

  function redirectForPublic(){
    document.querySelectorAll('a.button, button:not([type="submit"]):not([type="reset"]):not([data-go-back]):not([data-drawer-close]):not([data-modal-close]):not([data-password-toggle]):not([data-billing-value])').forEach(el => {
      if(el.closest('form') && el.type === 'submit') return;
      if(el.hasAttribute('data-no-redirect')) return;
      if(el.classList.contains('drawer-close')) return;
      if(el.classList.contains('menu-toggle')) return;
      if(el.classList.contains('modal-close')) return;
      if(el.closest('.modal')) return;
      el.addEventListener('click', function(e){
        if(el.tagName === 'A' && el.href){
          try {
            const url = new URL(el.href, location.href);
            if(url.origin !== location.origin) return;
            if(url.pathname.endsWith('404.html')) return;
            if(el.getAttribute('href') === '#') return;
            if(el.getAttribute('href').startsWith('javascript:')) return;
            e.preventDefault();
            location.href = '404.html';
            return;
          } catch(err){}
        } else if(el.tagName === 'BUTTON'){
          e.preventDefault();
          location.href = '404.html';
          return;
        }
      }, {capture:true});
    });
    document.querySelectorAll('.card, .service-card, .project-card, .journal-card, .plan-card, .testimonial-card, .team-card, .step-card, .atelier-feature, .service-rail a.service-card, .project-grid a, .journal-grid a, .testimonial-grid article, .plans-grid article').forEach(card => {
      if(card.closest('form')) return;
      if(card.hasAttribute('data-no-redirect')) return;
      if(card.tagName === 'A') return;
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e){
        if(e.target.closest('a, button')) return;
        location.href = '404.html';
      });
    });
  }

  function redirectForDash(){
    document.querySelectorAll('a.button, button:not([type="submit"]):not([type="reset"]):not([data-go-back]):not([data-drawer-close]):not([data-modal-close]):not([data-password-toggle])').forEach(el => {
      if(el.closest('form') && el.type === 'submit') return;
      if(el.hasAttribute('data-no-redirect')) return;
      if(el.closest('.modal')) return;
      el.addEventListener('click', function(e){
        if(el.tagName === 'A' && el.href){
          try {
            const url = new URL(el.href, location.href);
            if(url.origin !== location.origin) return;
            if(url.pathname.endsWith('404dash.html')) return;
            if(el.getAttribute('href') === '#') return;
            if(el.getAttribute('href').startsWith('javascript:')) return;
            e.preventDefault();
            location.href = '404dash.html';
            return;
          } catch(err){}
        } else if(el.tagName === 'BUTTON'){
          e.preventDefault();
          location.href = '404dash.html';
          return;
        }
      }, {capture:true});
    });
    document.querySelectorAll('.card, .dash-card, .service-row, .timeline-item, .event-row, .stat-card, .table-card, .list-card, .quick-card').forEach(card => {
      if(card.closest('form')) return;
      if(card.hasAttribute('data-no-redirect')) return;
      if(card.tagName === 'A') return;
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e){
        if(e.target.closest('a, button')) return;
        location.href = '404dash.html';
      });
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      if(isPublicPage() && !isDashPage()) redirectForPublic();
      if(isDashPage()) redirectForDash();
    });
  } else {
    if(isPublicPage() && !isDashPage()) redirectForPublic();
    if(isDashPage()) redirectForDash();
  }
})();
