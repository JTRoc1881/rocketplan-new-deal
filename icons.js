// RocketPlan product icons + rocket launch animation. Shared by the New Deal builder and client page.
// Every icon is the brand mark's round purple badge with a white ring, carrying a product glyph.
(function(){
  const G=(id)=>`<defs><linearGradient id="g-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9A00FF"/><stop offset="1" stop-color="#6D00E6"/></linearGradient></defs>`;
  const badge=(id,glyph)=>`${G(id)}<circle cx="32" cy="32" r="32" fill="url(#g-${id})"/><circle cx="32" cy="32" r="27.5" fill="none" stroke="#fff" stroke-opacity=".92" stroke-width="2"/>${glyph}`;
  const star=(cx,cy,R,r,fill)=>{let p=[];for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r:R;p.push((cx+rr*Math.cos(a)).toFixed(2)+','+(cy+rr*Math.sin(a)).toFixed(2));}return `<polygon points="${p.join(' ')}" fill="${fill}"/>`;};
  const spark=(cx,cy,s,fill)=>`<path d="M${cx} ${cy-s} Q${cx} ${cy} ${cx+s} ${cy} Q${cx} ${cy} ${cx} ${cy+s} Q${cx} ${cy} ${cx-s} ${cy} Q${cx} ${cy} ${cx} ${cy-s}Z" fill="${fill}"/>`;
  const glyphs={
    earth:`<clipPath id="c-earth"><circle cx="32" cy="32" r="13"/></clipPath><circle cx="32" cy="32" r="13" fill="#fff"/><g clip-path="url(#c-earth)" fill="#40C9AE"><path d="M24 21c4-1 7 1 8 3.5S30 29 27.5 30s-4 3.5-2.5 6 5 2 6 5-1.5 5-5 4.5C21.5 44 18 39 18.5 33c.4-5 2.5-9.5 5.5-12z"/><path d="M37 19.5c4 1.5 7 5 7.5 9 .2 2-1.5 3.5-3.5 2.5s-3.5-3-3.5-5.5 0-4.5-.5-6z"/><path d="M41 37c2 0 3 2 2 3.5s-3 2.5-4.5 1.5 0-5 2.5-5z"/></g><circle cx="32" cy="32" r="13" fill="none" stroke="#fff" stroke-width="1.5"/>`,
    moon:`<mask id="m-moon"><circle cx="32" cy="32" r="13" fill="#fff"/><circle cx="39" cy="26" r="11.5" fill="#000"/></mask><circle cx="32" cy="32" r="13" fill="#FFF6DF" mask="url(#m-moon)"/><g fill="#E9D6FF" opacity=".75"><circle cx="26" cy="33" r="2.2"/><circle cx="30" cy="40" r="1.5"/><circle cx="23" cy="26.5" r="1.3"/></g>${spark(44,21,3.6,'#FEAF3E')}`,
    stars:`${star(31,30,11,4.6,'#fff')}${star(20.5,41,5,2.1,'#FEAF3E')}${star(44,41.5,6,2.5,'#fff')}${spark(45,20,2.6,'#FEAF3E')}`,
    crm:`<g stroke="#fff" stroke-width="2.2" stroke-linecap="round"><line x1="32" y1="32" x2="32" y2="20"/><line x1="32" y1="32" x2="42.5" y2="38"/><line x1="32" y1="32" x2="21.5" y2="38"/></g><circle cx="32" cy="32" r="5" fill="#fff"/><circle cx="32" cy="19" r="3.6" fill="#fff"/><circle cx="43" cy="38.5" r="3.6" fill="#fff"/><circle cx="21" cy="38.5" r="3.6" fill="#fff"/><circle cx="32" cy="32" r="2" fill="#9A00FF"/>`,
    ai:`<g transform="translate(19.5 19.5) scale(1.05)"><path fill="#fff" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></g>${spark(44.5,20.5,5,'#FEAF3E')}${spark(38,15.5,2.2,'#fff')}`,
    fee:`<g transform="translate(19 19) scale(1.08)" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></g>`,
    rocket:`<path fill="#fff" d="M32 12c5.5 4.5 8 11 8 19.5L32 41l-8-9.5C24 23 26.5 16.5 32 12z"/><circle cx="32" cy="26" r="3.6" fill="#9A00FF"/><circle cx="32" cy="26" r="1.6" fill="#fff"/><path fill="#fff" d="M24.5 31.5 19 39l6.5-1.5zM39.5 31.5 45 39l-6.5-1.5z"/><path fill="#FEAF3E" d="M29 41h6l-3 9z"/>`
  };
  const names={earth:'RocketPlan Earth',moon:'RocketPlan Moon',stars:'RocketPlan Stars',crm:'RocketCRM',ai:'RocketCall AI',fee:'Set Up Fee',rocket:'RocketPlan'};
  window.RP_ICON_IDS=Object.keys(glyphs);
  window.rpIcon=function(id,size,cls){id=glyphs[id]?id:'rocket';return `<svg class="rp-icon ${cls||''}" width="${size||40}" height="${size||40}" viewBox="0 0 64 64" role="img" aria-label="${names[id]}">${badge(id,glyphs[id])}</svg>`;};
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
    h+=`<svg class="rocket" viewBox="0 0 64 64">${glyphs.rocket}</svg>`;
    o.innerHTML=h;document.body.appendChild(o);
    setTimeout(()=>{o.remove();if(done)done();},1600);
  };
})();
