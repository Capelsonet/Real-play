// ---------- S1 · hook: customers buy the whole, leaders run the parts ----------
(()=>{ const id='s1', g=mkScene(id), s=TL[id];
  header(g,id,'An executive briefing','Your customers buy the whole.\nYour leaders still run the parts.');
  // customer + solution ring (right)
  const cx=1450, cy=670;
  const t1=wt(id,'integrated solutions',-0.6);
  draw(g, gen.circle(cx,cy,230,R()), t1, 0.7);
  text(g,cx,cy+9,'CUSTOMER',{size:24,weight:600,track:'0.12em',anchor:'middle',t0:t1+0.3});
  [[0,1.4],[1.6,3.0],[3.2,4.6],[4.8,6.1]].forEach(([a,b],i)=>
    draw(g, gen.arc(cx,cy,330,330,a,b,false,R()), t1+0.5+i*0.18, 0.5));
  text(g,cx,cy+215,'integrated solutions',{size:22,italic:true,color:C.muted,anchor:'middle',t0:t1+1.0});
  // silos with a leader inside each (left)
  const t2=wt(id,'built leaders for silos',-0.2);
  [250,400,550,700,850].forEach((x,i)=>{
    draw(g, gen.rectangle(x-55,470,110,360,R()), t2+i*0.12, 0.5);
    draw(g, [gen.circle(x,705,30,R()), gen.arc(x,775,62,62,Math.PI,2*Math.PI,false,R())], t2+0.4+i*0.12, 0.4);
  });
  text(g,550,880,'silos',{size:22,italic:true,color:C.muted,anchor:'middle',t0:t2+0.8});
  // the gap
  const t3=wt(id,'That is the gap',0);
  draw(g,[gen.line(960,520,960,820,R({stroke:C.accent,strokeDasharray:[10,10]})),
          gen.line(1070,520,1070,820,R({stroke:C.accent}))],t3,0.4);
  draw(g,[gen.line(975,670,1055,670,R({stroke:C.accent,strokeWidth:3}))],t3+0.3,0.3);
  text(g,1015,505,'the gap',{size:26,italic:true,weight:600,color:C.accentSm,anchor:'middle',t0:t3+0.4});
})();

// ---------- S2 · enterprise leadership is a mindset ----------
(()=>{ const id='s2', g=mkScene(id), s=TL[id];
  header(g,id,'','Enterprise leadership is a mindset,\nnot a job title.');
  const t0=s.vo_start+0.4;
  const shapes=[
    [gen.rectangle(700,430,220,160,R()),'Divisions',810,518],
    [gen.rectangle(990,450,260,130,R()),'Businesses',1120,523],
    [gen.circle(800,740,190,R()),'Functions',800,748],
    [gen.path('M1010 650 h200 q30 0 30 30 v120 q0 30 -30 30 h-200 q-30 0 -30 -30 v-120 q0 -30 30 -30 z',R()),'Locations',1110,748]];
  shapes.forEach(([d,l,x,y],i)=>{ draw(g,d,t0+i*0.35,0.6);
    text(g,x,y,l,{size:26,anchor:'middle',t0:t0+i*0.35+0.3}); });
  const tu=wt(id,'a single unit',0);
  draw(g,[gen.circle(735,462,20,R({stroke:C.ink})),gen.line(735,472,735,490,R())],tu,0.4);
  text(g,600,420,'one unit',{size:22,italic:true,color:C.muted,anchor:'end',t0:tu+0.2});
  const tw=wt(id,'the whole firm',-0.1);
  draw(g, gen.ellipse(970,640,900,520,R({stroke:C.accent,strokeWidth:3.2})), tw, 0.9);
  text(g,1450,410,'the enterprise\nmindset',{size:28,italic:true,weight:600,color:C.accentSm,t0:tw+0.6});
})();

// ---------- S3 · Focus ----------
(()=>{ const id='s3', g=mkScene(id), s=TL[id];
  header(g,id,'1 · Focus','Enterprise leaders focus the whole\norganization on the customer.');
  const fx=960, t0=s.vo_start;
  draw(g,[gen.ellipse(fx,450,560,80,R()),
          gen.line(fx-280,450,fx-38,770,R()), gen.line(fx+280,450,fx+38,770,R()),
          gen.line(fx-38,770,fx-38,830,R()), gen.line(fx+38,770,fx+38,830,R())], t0, 0.8);
  // tangle of complexity
  const tc=wt(id,'Complexity pulls',0);
  let sd=7; const rnd=()=>{sd=(sd*9301+49297)%233280; return sd/233280;};
  const pts=[]; for(let i=0;i<26;i++){ const a=rnd()*Math.PI*2, r=40+rnd()*170;
    pts.push([fx+Math.cos(a)*r*1.3, 470+Math.sin(a)*r*0.55+ (i%3)*25]); }
  draw(g, gen.curve(pts,R({roughness:1.4,strokeWidth:2})), tc, 1.4);
  text(g,fx-560,420,'complexity',{size:24,italic:true,color:C.muted,t0:tc+0.3});
  const ti=wt(id,'structure',0), tp=wt(id,'process',0);
  text(g,fx+330,560,'structure',{size:24,italic:true,color:C.muted,t0:ti});
  text(g,fx+330,600,'process',{size:24,italic:true,color:C.muted,t0:tp});
  arrow(g,fx+320,575,fx+190,600,ti+0.2,0.4,{head:14,stroke:C.muted});
  // what survives
  const tv=wt(id,'differentiated value',-0.2);
  draw(g, gen.line(fx,835,fx,975,R({stroke:C.accent,strokeWidth:4,roughness:0.4})), tv, 0.6);
  text(g,fx+40,945,'differentiated value\nfor the customer',{size:24,italic:true,weight:600,color:C.accentSm,lh:30,t0:tv+0.4});
})();

// ---------- S4 · Build ----------
(()=>{ const id='s4', g=mkScene(id), s=TL[id];
  header(g,id,'2 · Build','They build what the firm does\nand what it is, together.');
  const cx=960, cy=680, a=520;
  const L=(t0,t1)=>{ const p=[]; for(let i=0;i<=60;i++){ const t=t0+(t1-t0)*i/60, d=1+Math.sin(t)**2;
    p.push([cx+a*Math.cos(t)/d, cy+a*Math.sin(t)*Math.cos(t)/d*1.25]); } return p; };
  const tl=wt(id,'strategic competence',-0.3), tr=wt(id,'organizational character',-0.3);
  draw(g, gen.curve(L(Math.PI/2,3*Math.PI/2),R()), tl, 0.9);
  text(g,cx-300,cy+2,'COMPETENCE',{size:28,weight:700,track:'0.06em',anchor:'middle',t0:tl+0.4});
  text(g,cx-300,cy+38,'what the firm can do',{size:21,italic:true,color:C.muted,anchor:'middle',t0:wt(id,'what the firm can do')});
  draw(g, gen.curve(L(-Math.PI/2,Math.PI/2),R()), tr, 0.9);
  text(g,cx+300,cy+2,'CHARACTER',{size:28,weight:700,track:'0.06em',anchor:'middle',t0:tr+0.4});
  text(g,cx+300,cy+38,'who it is',{size:21,italic:true,color:C.muted,anchor:'middle',t0:wt(id,'who it is')});
  text(g,cx-300,cy+175,'doing',{size:22,italic:true,color:C.muted,anchor:'middle',t0:tl+0.8});
  text(g,cx+300,cy+175,'being',{size:22,italic:true,color:C.muted,anchor:'middle',t0:tr+0.8});
  // accent dot travelling the whole loop
  const ts=wt(id,'at the same time',-0.1);
  const dot=el('circle',{r:16,fill:C.accent,opacity:0},g);
  custom(t=>{ if(t<ts){dot.setAttribute('opacity',0);return;}
    const u=(t-ts)/2.6*2*Math.PI - Math.PI/2, d=1+Math.sin(u)**2;
    dot.setAttribute('cx',cx+a*Math.cos(u)/d); dot.setAttribute('cy',cy+a*Math.sin(u)*Math.cos(u)/d*1.25);
    dot.setAttribute('opacity',clamp((t-ts)/0.2)); });
})();

// ---------- S5 · Reconcile ----------
(()=>{ const id='s5', g=mkScene(id), s=TL[id];
  header(g,id,'3 · Reconcile','They hold short-term pressure and\nlong-term vision at once.');
  const px=960, py=720;
  const beam=el('g',{},g);
  draw(beam, gen.rectangle(440,py-14,1040,22,R()), s.vo_start, 0.7);
  const items=[['Cost',600,'down',wt(id,'Cost')],['Growth',1320,'up',wt(id,'growth')],
               ['Stability',780,'down',wt(id,'Stability')],['Reinvention',1140,'up',wt(id,'reinvention')]];
  items.forEach(([l,x,dir,t])=>{
    if(dir==='down'){ arrow(beam,x,470,x,py-22,t,0.45,{head:22}); text(beam,x,445,l,{size:28,anchor:'middle',t0:t}); }
    else { arrow(beam,x,py-22,x,470,t,0.45,{head:22}); text(beam,x,445,l,{size:28,anchor:'middle',t0:t}); }
  });
  text(g,610,880,'short term',{size:22,italic:true,color:C.muted,anchor:'middle',t0:wt(id,'Cost')+0.4});
  text(g,1310,880,'long term',{size:22,italic:true,color:C.muted,anchor:'middle',t0:wt(id,'growth')+0.4});
  const th=wt(id,'hold both sides',-0.1);
  const keys=[[s.start,0],[items[0][3]+0.3,-3],[items[1][3]+0.3,3],[items[2][3]+0.3,-4],[items[3][3]+0.3,3.5],[th,3.5],[th+0.6,0]];
  custom(t=>{ let ang=0; for(let i=0;i<keys.length-1;i++){ const [ta,a0]=keys[i],[tb,a1]=keys[i+1];
      if(t>=ta&&t<=tb){ ang=a0+(a1-a0)*ease((t-ta)/Math.max(0.01,Math.min(0.5,tb-ta))); break; } if(t>tb) ang=a1; }
    beam.setAttribute('transform',`rotate(${ang} ${px} ${py})`); });
  draw(g, gen.polygon([[px,py+12],[px-80,py+150],[px+80,py+150]],R({stroke:C.accent,fill:C.accent,fillStyle:'solid',strokeWidth:3})), th, 0.6);
  text(g,px,py+195,'the enterprise leader',{size:24,italic:true,weight:600,color:C.accentSm,anchor:'middle',t0:th+0.4});
})();

// ---------- S6 · Align ----------
(()=>{ const id='s6', g=mkScene(id), s=TL[id];
  header(g,id,'4 · Align','They align five systems\nthat work as one loop.');
  const cx=960, cy=670, rr=255, r=86;
  const nodes=[['Meaning','Meaning'],['Mind-set','Mind-set'],['Mobilization','Mobilization'],['Measurement','Measurement'],['Mechanisms\nfor renewal','mechanisms for renewal']];
  const P=i=>{ const a=-Math.PI/2+i*2*Math.PI/5; return [cx+rr*Math.cos(a), cy+rr*Math.sin(a)]; };
  nodes.forEach(([l,ph],i)=>{ const [x,y]=P(i), t=wt(id,ph,-0.15);
    draw(g, gen.circle(x,y,2*r,R()), t, 0.5);
    text(g,x,y+(l.includes('\n')?-4:8),l,{size:l.includes('\n')?21:22,weight:600,anchor:'middle',lh:26,t0:t+0.2});
    // arc arrow to next node
    const a0=-Math.PI/2+i*2*Math.PI/5+0.42, a1=a0+2*Math.PI/5-0.84;
    const ta=t+0.5; draw(g, gen.arc(cx,cy,2*rr,2*rr,a0,a1,false,R({strokeWidth:2})), ta, 0.4);
    const hx=cx+rr*Math.cos(a1), hy=cy+rr*Math.sin(a1), dir=a1+Math.PI/2;
    draw(g,[gen.line(hx,hy,hx-16*Math.cos(dir-0.5),hy-16*Math.sin(dir-0.5),R({strokeWidth:2})),
            gen.line(hx,hy,hx-16*Math.cos(dir+0.5),hy-16*Math.sin(dir+0.5),R({strokeWidth:2}))],ta+0.35,0.2);
  });
  const tn=wt(id,'never settles',-0.3);
  const dot=el('circle',{r:15,fill:C.accent,opacity:0},g);
  custom(t=>{ if(t<tn){dot.setAttribute('opacity',0);return;}
    const u=-Math.PI/2+(t-tn)/3.0*2*Math.PI;
    dot.setAttribute('cx',cx+rr*Math.cos(u)); dot.setAttribute('cy',cy+rr*Math.sin(u));
    dot.setAttribute('opacity',clamp((t-tn)/0.2)); });
})();

// ---------- S7 · the turn: organizations reject enterprise leaders ----------
// The three walls are carried into S8 (same position, back to ink at the cut).
const WALLS=[[640,'CULTURE','Cultures'],[960,'EXPERTISE','frameworks'],[1280,'REWARDS','pay follows']];
const carry=el('g',{id:'carry'});
(()=>{ const id='s7', g=mkScene(id), s=TL[id], nx=TL.s8;
  header(g,id,'','Yet organizations are built to\nreject enterprise leaders.');
  custom(t=>{ let o=Math.min(clamp((t-s.start)/0.3), clamp((nx.end-t)/0.3)); if(t<s.start||t>nx.end) o=0;
    carry.setAttribute('opacity',o); carry.style.display=o>0?'':'none'; });
  WALLS.forEach(([x,l,ph],i)=>{ const t=wt(id,ph,-0.1);
    draw(carry, gen.rectangle(x-35,530,70,300,R({fill:C.ink,fillStyle:'hachure',hachureGap:9,fillWeight:1.2})), t, 0.5);
    const lab=text(carry,x,500,l,{size:24,weight:700,track:'0.12em',anchor:'middle',t0:t+0.15});
    if(i===2){ const te=lab.querySelector('text');
      const tr=wt(id,'unit results',0);
      custom(tt=>te.setAttribute('fill', tt>=tr && tt<nx.start ? C.accent : C.ink)); }
  });
  // the enterprise arrow pushes through two walls and stops at the third
  const k=[[s.vo_start,250],[wt(id,'unit heroes'),560],[wt(id,'unit heroes',0.6),700],
           [wt(id,'isolated expertise'),880],[wt(id,'isolated expertise',0.6),1020],[wt(id,'unit results'),1238]];
  const line=el('path',{stroke:C.ink,'stroke-width':4,fill:'none','stroke-linecap':'round'},g);
  const head=el('path',{fill:'none',stroke:C.ink,'stroke-width':4,'stroke-linecap':'round','stroke-linejoin':'round'},g);
  custom(t=>{ let x=k[0][1]; for(let i=0;i<k.length-1;i++){ if(t>=k[i][0]){ x=k[i][1]+(k[i+1][1]-k[i][1])*ease((t-k[i][0])/(k[i+1][0]-k[i][0])); } }
    if(t<k[0][0]) { line.setAttribute('d',''); head.setAttribute('d',''); return; }
    line.setAttribute('d',`M200 680 L${x} 680`); head.setAttribute('d',`M${x-22} 664 L${x} 680 L${x-22} 696`); });
  WALLS.slice(0,2).forEach(([x],i)=>{ const t=k[1+i*2][0];
    draw(g,[gen.line(x-30,640,x+28,700,R({strokeWidth:2})),gen.line(x+30,650,x-20,720,R({strokeWidth:2}))],t,0.3); });
  const tr=wt(id,'unit results',0.15);
  draw(g,[gen.line(1205,640,1225,660,R({strokeWidth:2})),gen.line(1205,720,1225,700,R({strokeWidth:2})),gen.line(1195,680,1220,680,R({strokeWidth:2}))],tr,0.25);
})();

// ---------- S8 · dismantle the barriers on purpose ----------
(()=>{ const id='s8', g=mkScene(id), s=TL[id];
  header(g,id,'Overcoming the obstacles','Closing the gap means dismantling\nthe barriers on purpose.');
  const levers=[['Demand an enterprise view','Demand & measure it,\nfrom the top'],
                ['Rotate high potentials','Rotate high potentials\nacross the firm'],
                ['Track talent','Track talent\nacross silos']];
  levers.forEach(([ph,cap],i)=>{ const x=WALLS[i][0], t=wt(id,ph,0);
    draw(g,[gen.line(x-70,560,x+70,800,R({strokeWidth:3})),gen.line(x+70,560,x-70,800,R({strokeWidth:3}))],t,0.45);
    text(g,x,885,cap,{size:23,anchor:'middle',lh:29,t0:t+0.2});
  });
  const tl=wt(id,'across silos',0.1);
  draw(g, gen.line(200,680,1720,680,R({stroke:C.accent,strokeWidth:6,roughness:0.5})), tl, 0.8);
  draw(g,[gen.line(1720,680,1690,660,R({stroke:C.accent,strokeWidth:6,roughness:0.4})),gen.line(1720,680,1690,700,R({stroke:C.accent,strokeWidth:6,roughness:0.4}))], tl+0.7, 0.2);
})();

// ---------- S9 · closing card ----------
(()=>{ const id='s9', g=mkScene(id), s=TL[id];
  eyebrow(g,'Korn Ferry',s.start+0.2,960,390,'middle');
  words(g,960,540,'Lead the *whole.*',s.start+0.4,{size:104,anchor:'middle',step:0.18});
  text(g,960,985,'Adapted from Douglas A. Ready, “Leading at the Enterprise Level,” MIT Sloan Management Review, Spring 2004.',
    {size:22,color:C.muted,anchor:'middle',t0:s.start+1.0});
})();
