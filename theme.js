(function(){
  var KEY='bbht-theme';
  function current(){return document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';}
  var SUN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19"/></svg>';
  var MOON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var LOGOS={light:'logos/bbht-logo-light.png',dark:'logos/bbht-logo-dark.png'};
  var FALLBACK='<svg viewBox="0 0 212 40" role="img" aria-label="BB HealthTech"><defs><linearGradient id="bbhtg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6C78E8"/><stop offset="1" stop-color="#2FD0BE"/></linearGradient></defs><circle cx="15" cy="20" r="9" fill="none" stroke="url(#bbhtg)" stroke-width="4.6"/><circle cx="28" cy="20" r="9" fill="none" stroke="url(#bbhtg)" stroke-width="4.6"/><text x="47" y="26" font-family="Inter,Segoe UI,sans-serif" font-size="18" font-weight="700" fill="currentColor">BB<tspan font-weight="500"> HealthTech</tspan></text></svg>';
  function applyLogos(){
    var t=current();
    document.querySelectorAll('.logo-img').forEach(function(img){
      if(img.dataset.failed!=='1'){img.src=LOGOS[t];}
    });
  }
  window.bbhtLogoFallback=function(img){
    img.dataset.failed='1';img.style.display='none';
    var fb=img.parentNode.querySelector('.logo-fallback');
    if(fb && !fb.dataset.built){fb.innerHTML=FALLBACK;fb.dataset.built='1';}
    if(fb){fb.style.display='inline-flex';}
  };
  function paintToggles(t){
    document.querySelectorAll('.theme-toggle').forEach(function(b){
      b.innerHTML=(t==='dark'?SUN:MOON);
      b.setAttribute('aria-label',t==='dark'?'Switch to light theme':'Switch to dark theme');
    });
  }
  function setTheme(t){
    document.documentElement.setAttribute('data-theme',t);
    try{localStorage.setItem(KEY,t);}catch(e){}
    applyLogos();paintToggles(t);
  }
  document.addEventListener('DOMContentLoaded',function(){
    applyLogos();paintToggles(current());
    document.querySelectorAll('.theme-toggle').forEach(function(b){
      b.addEventListener('click',function(){setTheme(current()==='dark'?'light':'dark');});
    });
  });
})();