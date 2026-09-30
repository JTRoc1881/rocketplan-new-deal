// RocketPlan product icons + rocket launch animation. Shared by the New Deal builder and client page.
// Every icon is the brand mark's round purple badge with a white ring, carrying a product glyph.
(function(){
  // Orbit family: lit purple disc (rim light, base shadow), a fine orbit ring behind every product, refined white line glyphs.
  const G=(id)=>`<defs><radialGradient id="g-${id}" cx="0.3" cy="0.22" r="0.95"><stop offset="0" stop-color="#B85CFF"/><stop offset="0.5" stop-color="#9A00FF"/><stop offset="1" stop-color="#5600BE"/></radialGradient><radialGradient id="s-${id}" cx="0.5" cy="1.15" r="0.9"><stop offset="0" stop-color="#1E0D47" stop-opacity="0.35"/><stop offset="1" stop-color="#1E0D47" stop-opacity="0"/></radialGradient><linearGradient id="r-${id}" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.7"/><stop offset="0.6" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient></defs>`;
  const ORBIT=(op)=>`<ellipse cx="32" cy="33" rx="23" ry="8" transform="rotate(-24 32 33)" fill="none" stroke="#FFFFFF" stroke-opacity="${op||0.42}" stroke-width="1.3"/>`;
  const badge=(id,glyph,orbit)=>`${G(id)}<circle cx="32" cy="32" r="32" fill="url(#g-${id})"/><circle cx="32" cy="32" r="32" fill="url(#s-${id})"/><circle cx="32" cy="32" r="30.6" fill="none" stroke="url(#r-${id})" stroke-width="1.6"/>${orbit===false?'':ORBIT(orbit)}${glyph}`;
  const STAR='M0,-10 L2.35,-3.24 L9.51,-3.09 L3.8,1.24 L5.88,8.09 L0,4 L-5.88,8.09 L-3.8,1.24 L-9.51,-3.09 L-2.35,-3.24 Z';
  const star=(cx,cy,sc,fill)=>`<path transform="translate(${cx} ${cy}) scale(${sc})" fill="${fill}" d="${STAR}"/>`;
  const glyphs={
    earth:`<g fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"><circle cx="32" cy="32" r="11" fill="#FFFFFF" fill-opacity="0.12"/><ellipse cx="32" cy="32" rx="4.6" ry="11"/><line x1="21" y1="32" x2="43" y2="32"/><path d="M23.6 26.2h16.8M23.6 37.8h16.8" stroke-opacity="0.6" stroke-width="1.5"/></g>`,
    moon:`<path d="M36.5 20 A12.5 12.5 0 1 0 36.5 44.5 A9.8 9.8 0 1 1 36.5 20 Z" fill="#FFFFFF"/><g fill="#5600BE" fill-opacity="0.35"><circle cx="27.2" cy="30.5" r="2.1"/><circle cx="30.4" cy="37.8" r="1.4"/><circle cx="25.4" cy="36.2" r="1"/></g>`,
    stars:`<g fill="none" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="1.2" stroke-linecap="round"><line x1="24" y1="27" x2="40" y2="22"/><line x1="40" y1="22" x2="36" y2="40"/></g>${star(24,27,0.62,'#FFFFFF')}${star(40,22,0.36,'#FFFFFF')}${star(36,40,0.48,'#FFFFFF')}`,
    crm:`<ellipse cx="32" cy="33" rx="23" ry="8" transform="rotate(-24 32 33)" fill="none" stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="1.4"/><g fill="#FFFFFF"><circle cx="52.4" cy="24.8" r="3"/><circle cx="24.2" cy="43.1" r="3"/><circle cx="19.4" cy="31.1" r="3"/></g><circle cx="32" cy="32" r="6.5" fill="#FFFFFF"/><circle cx="32" cy="32" r="2.6" fill="#5600BE"/>`,
    ai:`<g transform="translate(18.5 19) scale(1.02)"><path fill="#FFFFFF" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></g><g fill="none" stroke="#FFFFFF" stroke-width="1.9" stroke-linecap="round"><path d="M39.5 21.5 A8.5 8.5 0 0 1 43 27.5"/><path d="M42.5 17 A14 14 0 0 1 47.5 27" stroke-opacity="0.55"/></g>`,
    fee:`<g transform="translate(19.5 19.5) scale(1.04)" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></g>`,
    rocket:`<path fill="#FFFFFF" d="M32 12c5.5 4.5 8 11 8 19.5L32 41l-8-9.5C24 23 26.5 16.5 32 12z"/><circle cx="32" cy="26" r="3.6" fill="#5600BE"/><circle cx="32" cy="26" r="1.6" fill="#FFFFFF"/><path fill="#FFFFFF" d="M24.5 31.5 19 39l6.5-1.5zM39.5 31.5 45 39l-6.5-1.5z"/><path fill="#F4E5FF" d="M29 41h6l-3 9z"/>`
  };
  const noOrbit={crm:true,rocket:true};
  const names={earth:'RocketPlan Earth',moon:'RocketPlan Moon',stars:'RocketPlan Stars',crm:'RocketCRM',ai:'RocketCall AI',fee:'Set Up Fee',rocket:'RocketPlan'};
  window.RP_ICON_IDS=Object.keys(glyphs);
  const alias={call:'ai',rocketcall:'ai',rocketcrm:'crm',setup:'fee'};
  window.rpIcon=function(id,size,cls){id=alias[id]||id;id=glyphs[id]?id:'rocket';return `<svg class="rp-icon ${cls||''}" width="${size||40}" height="${size||40}" viewBox="0 0 64 64" role="img" aria-label="${names[id]}">${badge(id,glyphs[id],noOrbit[id]?false:undefined)}</svg>`;};
  window.rpIconFor=function(name){const n=(name||'').toLowerCase();if(n.includes('earth'))return 'earth';if(n.includes('moon'))return 'moon';if(n.includes('star'))return 'stars';if(n.includes('crm'))return 'crm';if(n.includes('call'))return 'ai';if(n.includes('set up')||n.includes('setup'))return 'fee';return 'rocket';};

  // Rocket launch: a white rocket lifts off from an element, leaves a trail, and clears the top of the screen.
  const css=`.rp-launch{position:fixed;inset:0;pointer-events:none;z-index:1000;overflow:hidden}
.rp-launch .flash{position:absolute;left:0;top:0;width:100%;height:100%;background:radial-gradient(circle at var(--x) var(--y),rgba(154,0,255,.35),rgba(154,0,255,0) 45%);animation:rp-flash 1.1s ease-out forwards}
.rp-launch .rocket{position:absolute;left:var(--x);top:var(--y);width:96px;height:96px;margin:-48px 0 0 -48px;animation:rp-fly 1.35s cubic-bezier(.5,0,.9,.2) forwards;filter:drop-shadow(0 8px 24px rgba(30,13,71,.35))}
.rp-launch .p{position:absolute;left:var(--x);top:var(--y);width:8px;height:8px;border-radius:999px;background:var(--c);animation:rp-p var(--d) ease-out var(--w) forwards;opacity:0}
.rp-launch .s{position:absolute;left:var(--x);top:var(--y);width:10px;height:10px;color:#FEAF3E;animation:rp-s var(--d) ease-out var(--w) forwards;opacity:0}
@keyframes rp-fly{0%{transform:translateY(0) scale(.55) rotate(0);opacity:0}12%{opacity:1;transform:translateY(-6px) scale(1) rotate(-3deg)}30%{transform:translateY(-40px) scale(1) rotate(-6deg)}100%{transform:translateY(-130vh) scale(.9) rotate(-8deg);opacity:1}}
@keyframes rp-flash{0%{opacity:0}15%{opacity:1}100%{opacity:0}}
@keyframes rp-p{0%{opacity:0;transform:translate(0,0) scale(1)}10%{opacity:1}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(.2)}}
@keyframes rp-s{0%{opacity:0;transform:translate(0,0) scale(.4) rotate(0)}15%{opacity:1}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(1.1) rotate(90deg)}}
@media (prefers-reduced-motion:reduce){.rp-launch{display:none}}`;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  window.rpLaunch=function(fromEl,done){
    const r=fromEl&&fromEl.getBoundingClientRect?fromEl.getBoundingClientRect():{left:innerWidth/2-20,top:innerHeight*.6,width:40,height:40};
    const x=r.left+r.width/2,y=r.top+r.height/2;
    const o=document.createElement('div');o.className='rp-launch';o.style.setProperty('--x',x+'px');o.style.setProperty('--y',y+'px');
    let h=`<div class="flash"></div>`;
    for(let k=0;k<26;k++){const a=Math.PI/2+(Math.random()-.5)*1.2,d=60+Math.random()*160;h+=`<span class="p" style="--c:${['#9A00FF','#FEAF3E','#40C9AE','#F4E5FF'][k%4]};--dx:${(Math.cos(a)*d).toFixed(0)}px;--dy:${(Math.sin(a)*d).toFixed(0)}px;--d:${(.7+Math.random()*.6).toFixed(2)}s;--w:${(Math.random()*.25).toFixed(2)}s"></span>`;}
    for(let k=0;k<10;k++){const a=-Math.PI/2+(Math.random()-.5)*2.4,d=90+Math.random()*220;h+=`<span class="s" style="--dx:${(Math.cos(a)*d).toFixed(0)}px;--dy:${(Math.sin(a)*d).toFixed(0)}px;--d:${(.9+Math.random()*.6).toFixed(2)}s;--w:${(.1+Math.random()*.3).toFixed(2)}s">${spark(5,5,5,'currentColor').replace('<path','<svg viewBox="0 0 10 10" width="10" height="10"><path')+'</svg>'}</span>`;}
    h+=`<svg class="rocket" viewBox="0 0 64 64">${glyphs.rocket.replace(/#5600BE/g,'#9A00FF')}</svg>`;
    o.innerHTML=h;document.body.appendChild(o);
    setTimeout(()=>{o.remove();if(done)done();},1600);
  };
})();
