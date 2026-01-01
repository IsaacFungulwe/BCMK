// contact.js - extracted React contact widget (no JSX, UMD-style)
(function(){
  function mountContactCard(React, ReactDOM, mountId){
    if(!React || !ReactDOM) return;
    var e = React.createElement;

    var useState = React.useState;
    var useEffect = React.useEffect;

    function ThemeToggle(){
      var _a = useState(function(){ try{ return localStorage.getItem('bcmk-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }catch(e){ return 'light'; } });
      var theme = _a[0], setTheme = _a[1];
      useEffect(function(){
        document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
        try{ localStorage.setItem('bcmk-theme', theme); }catch(e){}
      }, [theme]);
      return e('div', { className: 'theme-toggle', role: 'button', 'aria-label': 'Toggle theme', onClick: function(){ setTheme(function(t){ return t === 'dark' ? 'light' : 'dark'; }); } },
        e('div', { className: 'switch', 'aria-hidden': true }, e('div', { className: 'knob' })),
        e('div', { style: { fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))' } }, theme === 'dark' ? 'Dark' : 'Light')
      );
    }

    function ContactCard(){
      return e('div', { className: 'contact-card', style: { animation: 'fadeInUp 350ms ease' } },
        e('div', { className: 'contact-card-content' },
          e('div', { className: 'contact-title font-heading' }, 'Contact Us'),
          e('div', { className: 'contact-line' }, e('a', { href: 'tel:+260763230498', className: 'contact-link' }, '📞 +260 763 230 498')),
          e('div', { className: 'contact-line' }, e('a', { href: 'mailto:info@bcmk.co.zm', className: 'contact-link' }, '✉️ info@bcmk.co.zm'))
        ),
        e('div', { className: 'contact-actions' }, e(ThemeToggle))
      );
    }

    var mount = document.getElementById(mountId);
    if(mount) {
      try{ ReactDOM.createRoot(mount).render(e(ContactCard)); }
      catch(e){ console.error('contact.js render failed', e); }
    }
  }

  // expose globally for the loader in app.js
  window.mountContactCard = mountContactCard;
})();
