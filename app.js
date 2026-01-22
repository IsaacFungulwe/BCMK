// app.js - moved from inline scripts
(function(){
  function initYear(){
    var y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
  }

  function setupHeaderScroll(){
    var header = document.getElementById('header');
    function onScroll(){
      if(!header) return;
      if(window.scrollY > 10) header.classList.add('scrolled'); else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // expose mobile menu functions for inline onclick handlers
  window.toggleMobileMenu = function(){
    var menu = document.getElementById('mobileMenu');
    if(menu) menu.classList.toggle('active');
  };
  window.closeMobileMenu = function(){
    var menu = document.getElementById('mobileMenu');
    if(menu) menu.classList.remove('active');
  };
window.handleFormSubmit = function (e) {
  e.preventDefault();
  var form = e.target;
  var btn = form.querySelector('button');
  var originalBtnText = btn.textContent;
  var toast = document.getElementById('toast');

  // Disable button to prevent double clicks
  btn.disabled = true;
  btn.textContent = 'Sending...';

  var formData = new FormData(form);

  fetch('API/contact.php', {    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      if (toast) toast.classList.add('show');
      form.reset();
      setTimeout(() => { if (toast) toast.classList.remove('show'); }, 4000);
    } else {
      alert(data.message || 'Failed to send message.');
    }
  })
  .catch(() => alert('Network error. Please try again.'))
  .finally(() => {
    btn.disabled = false;
    btn.textContent = originalBtnText;
  });
};


  function setupObserver(){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.style.opacity = '1'; }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-fade-in-up').forEach(function(el){ observer.observe(el); });
  }

  // Modern theme toggle: mount a compact toggle into #react-controls
  function mountThemeToggle(){
    var mount = document.getElementById('react-controls');
    if(!mount) return;
    if(mount.dataset.themeMounted === '1') return;

    function getStored(){ try{ return localStorage.getItem('bcmk-theme'); }catch(e){ return null; } }
    function prefersDark(){ return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; }
    function current(){ return getStored() || (prefersDark() ? 'dark' : 'light'); }
    function applyTheme(t){
      document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : '');
      try{ localStorage.setItem('bcmk-theme', t); }catch(e){}
    }

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle-advanced';
    btn.setAttribute('aria-label', 'Toggle color theme');
    btn.setAttribute('aria-pressed', current() === 'dark' ? 'true' : 'false');

    btn.innerHTML = `
      <span class="icon sun" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="1.2">
            <line x1="12" y1="2" x2="12" y2="4"/>
            <line x1="12" y1="20" x2="12" y2="22"/>
            <line x1="2" y1="12" x2="4" y2="12"/>
            <line x1="20" y1="12" x2="22" y2="12"/>
            <line x1="4.5" y1="4.5" x2="6" y2="6"/>
            <line x1="17.5" y1="17.5" x2="19" y2="19"/>
            <line x1="17.5" y1="6" x2="19" y2="4"/>
            <line x1="4.5" y1="19" x2="6" y2="17"/>
          </g>
        </svg>
      </span>
      <span class="icon moon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
        </svg>
      </span>
    `;

    function setState(){
      var t = current();
      if(t === 'dark'){
        btn.classList.add('is-dark');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('is-dark');
        btn.setAttribute('aria-pressed', 'false');
      }
    }

    btn.addEventListener('click', function(){
      var t = current() === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.add('theme-transition');
      window.setTimeout(function(){ document.documentElement.classList.remove('theme-transition'); }, 300);
      applyTheme(t);
      setState();
    });

    // initialize
    applyTheme(current());
    setState();

    mount.appendChild(btn);
    mount.dataset.themeMounted = '1';
  }

  // Initialize on DOM ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ initYear(); setupHeaderScroll(); setupObserver(); mountThemeToggle(); });
  } else {
    initYear(); setupHeaderScroll(); setupObserver(); mountThemeToggle();
  }
})();


