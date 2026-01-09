// contact.js - vanilla contact widget (replaces the React widget)
(function(){
  function createThemeToggle(){
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle theme');

    var switchEl = document.createElement('div');
    switchEl.className = 'switch';
    var knob = document.createElement('div');
    knob.className = 'knob';
    switchEl.appendChild(knob);

    var label = document.createElement('div');
    label.style.fontSize = '0.9rem';
    label.style.color = 'hsl(var(--muted-foreground))';

    function getStored(){ try{ return localStorage.getItem('bcmk-theme'); }catch(e){ return null; } }
    function current(){ return getStored() || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
    function applyTheme(t){ document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : ''); try{ localStorage.setItem('bcmk-theme', t); }catch(e){} label.textContent = t === 'dark' ? 'Dark' : 'Light'; }

    applyTheme(current());

    btn.appendChild(switchEl);
    btn.appendChild(label);

    btn.addEventListener('click', function(){ var t = current() === 'dark' ? 'light' : 'dark'; applyTheme(t); });
    return btn;
  }

  function createContactCard(){
    var card = document.createElement('div');
    card.className = 'contact-card';
    card.style.animation = 'fadeInUp 350ms ease';

    var content = document.createElement('div');
    content.className = 'contact-card-content';

    var title = document.createElement('div');
    title.className = 'contact-title font-heading';
    title.textContent = 'Contact Us';

    var line1 = document.createElement('div');
    line1.className = 'contact-line';
    var tel = document.createElement('a');
    tel.href = 'tel:+260763230498';
    tel.className = 'contact-link';
    tel.textContent = '📞 +260 763 230 498';
    line1.appendChild(tel);

    var line2 = document.createElement('div');
    line2.className = 'contact-line';
    var mail = document.createElement('a');
    mail.href = 'mailto:info@bcmk.co.zm';
    mail.className = 'contact-link';
    mail.textContent = '✉️ info@bcmk.co.zm';
    line2.appendChild(mail);

    content.appendChild(title);
    content.appendChild(line1);
    content.appendChild(line2);

    var actions = document.createElement('div');
    actions.className = 'contact-actions';
    actions.appendChild(createThemeToggle());

    card.appendChild(content);
    card.appendChild(actions);
    return card;
  }

  function mountContactCard(mountId){
    var mount = document.getElementById(mountId);
    if(!mount) return;
    try{
      // avoid duplicating
      if(mount.dataset.bcmkMounted === '1') return;
      var card = createContactCard();
      mount.appendChild(card);
      mount.dataset.bcmkMounted = '1';
    }catch(e){ console.error('mountContactCard failed', e); }
  }

  window.mountContactCard = mountContactCard;
})();
