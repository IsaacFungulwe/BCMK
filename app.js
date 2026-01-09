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

  window.handleFormSubmit = function(e){
    e.preventDefault();
    var toast = document.getElementById('toast');
    if(toast) toast.classList.add('show');
    if(e.target && typeof e.target.reset === 'function') e.target.reset();
    setTimeout(function(){ if(toast) toast.classList.remove('show'); }, 4000);
  };

  function setupObserver(){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.style.opacity = '1'; }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-fade-in-up').forEach(function(el){ observer.observe(el); });
  }

  // Load the contact widget conditionally by injecting contact.js
  function loadContactWidget(){
    // Example condition: only load on wider screens (desktop/tablet) or when explicitly requested via ?contact=1
    var shouldLoad = (window.innerWidth && window.innerWidth > 480) || location.search.indexOf('contact=1') !== -1;
    if(!shouldLoad) return;
    if(window.__contactWidgetLoaded) return;
    var script = document.createElement('script');
    script.src = 'contact.js';
    script.async = true;
    script.onload = function(){
      window.__contactWidgetLoaded = true;
      try{
        if(typeof window.mountContactCard === 'function'){
          window.mountContactCard('react-controls');
        }
      }catch(e){ console.error('mountContactCard failed', e); }
    };
    script.onerror = function(e){ console.error('Failed to load contact.js', e); };
    document.head.appendChild(script);
  }

  // Initialize on DOM ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ initYear(); setupHeaderScroll(); setupObserver(); loadContactWidget(); });
  } else {
    initYear(); setupHeaderScroll(); setupObserver(); loadContactWidget();
  }
})();
