// Continuity chain (an element stays put across the cut and returns to ink):
//   S1->S2 silos (+ customer circle, which stays through S3) · S4->S5 dot becomes the pivot
//   S5->S6 pivot becomes the hub of the five systems · S7->S8 the three walls · S8->S9 the line
// S3->S4 and S6->S7 are clean breaks: a new thread opens (a new task; the turn).
const CUST={x:1560,y:670}, SILO_X=[420,600,780,960], UNITS=['Divisions','Businesses','Functions','Locations'];
const WALLS=[[640,'CULTURE','Cultures'],[960,'EXPERTISE','frameworks'],[1280,'REWARDS','pay follows']];
const gCust=carryGroup('s1','s3'), gSilos=carryGroup('s1','s2'), gDot=carryGroup('s4','s5'),
      gHub=carryGroup('s5','s6'), gWalls=carryGroup('s7','s8'), gLine=carryGroup('s8','s9');

// ---------- S1 · hook: customers buy the whole, leaders run the parts ----------
(()=>{ const id='s1', g=mkScene(id);
  header(g,id,'An executive briefing','Your customers buy the whole.\nYour leaders still run the parts.');
  const t1=wt(id,'integrated solutions',-0.6);
  draw(gCust, gen.circle(CUST.x,CUST.y,230,R()), t1, 0.7);                       // carried to S3
  text(gCust,CUST.x,CUST.y+9,'CUSTOMER',{size:24,weight:600,track:'0.12em',anchor:'middle',t0:t1+0.3});
  [[0,1.4],[1.6,3.0],[3.2,4.6],[4.8,6.1]].forEach(([a,b],i)=>
    draw(g, gen.arc(CUST.x,CUST.y,330,330,a,b,false,R()), t1+0.5+i*0.18, 0.5));
  text(g,CUST.x,CUST.y+215,'integrated solutions',{size:22,italic:true,color:C.muted,anchor:'middle',t0:t1+1.0});
  const t2=wt(id,'built leaders for silos',-0.2);
  SILO_X.forEach((x,i)=>{                                                          // carried to S2
    draw(gSilos, gen.rectangle(x-55,470,110,360,R()), t2+i*0.12, 0.5);
    draw(gSilos, [gen.circle(x,705,30,R()), gen.arc(x,775,62,62,Math.PI,2*Math.PI,false,R())], t2+0.4+i*0.12, 0.4);
  });
  text(g,690,880,'silos',{size:22,italic:true,color:C.muted,anchor:'middle',t0:t2+0.8});
  const t3=wt(id,'That is the gap',0);
  draw(g,[gen.line(1150,520,1150,820,R({stroke:C.accent,strokeDasharray:[10,10]})),
          gen.line(1260,520,1260,820,R({stroke:C.accent}))],t3,0.4);
  draw(g, gen.line(1165,670,1245,670,R({stroke:C.accent,strokeWidth:3})), t3+0.3, 0.3);
  text(g,1205,505,'the gap',{size:26,italic:true,weight:600,color:C.accentSm,anchor:'middle',t0:t3+0.4});
})();

// ---------- S2 · enterprise leadership is a mindset (the same silos, now enclosed) ----------
(()=>{ const id='s2', g=mkScene(id), s=TL[id];
  header(g,id,'','Enterprise leadership is a mindset,\nnot a job title.');
  SILO_X.forEach((x,i)=> text(g,x,452,UNITS[i],{size:22,weight:600,anchor:'middle',t0:s.vo_start+0.3+i*0.3}));
  text(g,420,866,'one unit',{size:22,italic:true,color:C.muted,anchor:'middle',t0:wt(id,'a single unit',0)});
  const tw=wt(id,'the whole firm',-0.1);
  draw(g, gen.ellipse(690,650,1100,560,R({stroke:C.accent,strokeWidth:3.2})), tw, 0.9);
  text(g,690,975,'the enterprise mindset',{size:28,italic:true,weight:600,color:C.accentSm,anchor:'middle',t0:tw+0.6});
})();

// ---------- S3 · Focus (the clean line runs to the carried customer) ----------
(()=>{ const id='s3', g=mkScene(id), s=TL[id];
  header(g,id,'1 · Focus','Enterprise leaders focus the whole\norganization on the customer.');
  const fx=700, t0=s.vo_start;
  draw(g,[gen.ellipse(fx,450,560,80,R()),
          gen.line(fx-280,450,fx-38,770,R()), gen.line(fx+280,450,fx+38,770,R()),
          gen.line(fx-38,770,fx-38,830,R()), gen.line(fx+38,770,fx+38,830,R())], t0, 0.8);
  const tc=wt(id,'Complexity pulls',0);
  let sd=7; const rnd=()=>{sd=(sd*9301+49297)%233280; return sd/233280;};
  const pts=[]; for(let i=0;i<26;i++){ const a=rnd()*Math.PI*2, r=40+rnd()*170;
    pts.push([fx+Math.cos(a)*r*1.3, 470+Math.sin(a)*r*0.55+(i%3)*25]); }
  draw(g, gen.curve(pts,R({roughness:1.4,strokeWidth:2})), tc, 1.4);
  text(g,190,420,'complexity',{size:24,italic:true,color:C.muted,t0:tc+0.3});
  const ti=wt(id,'structure',0), tp=wt(id,'process',0);
  text(g,fx+330,560,'structure',{size:24,italic:true,color:C.muted,t0:ti});
  text(g,fx+330,600,'process',{size:24,italic:true,color:C.muted,t0:tp});
  arrow(g,fx+320,575,fx+190,600,ti+0.2,0.4,{head:14,stroke:C.muted});
  const tv=wt(id,'differentiated value',-0.2);
  draw(g, gen.curve([[fx,832],[fx,880],[fx+60,905],[1000,905],[1400,905],[1520,880],[CUST.x,830],[CUST.x,790]],
        R({stroke:C.accent,strokeWidth:4,roughness:0.4})), tv, 1.3);
  text(g,1130,950,'differentiated value\nfor the customer',{size:24,italic:true,weight:600,color:C.accentSm,anchor:'middle',lh:30,t0:tv+0.5});
})();

// ---------- S4 · Build (an accent dot circles the loop and comes to rest at its centre) ----------
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
  const ts=wt(id,'who it is',0), te=s.end-0.45;
  const dot=el('circle',{r:16,fill:C.accent,opacity:0},gDot);                       // carried to S5: it becomes the pivot
  custom(t=>{ if(t<ts){dot.setAttribute('opacity',0);return;}
    const p=clamp((t-ts)/(te-ts)), u=-Math.PI/2+p*2*Math.PI, d=1+Math.sin(u)**2;
    dot.setAttribute('cx',cx+a*Math.cos(u)/d); dot.setAttribute('cy',cy+a*Math.sin(u)*Math.cos(u)/d*1.25);
    dot.setAttribute('opacity',clamp((t-ts)/0.2)); dot.setAttribute('fill',t>=TL.s5.start?C.ink:C.accent); });
})();

// ---------- S5 · Reconcile (the dot from S4 is the pivot; the fulcrum goes on to S6) ----------
(()=>{ const id='s5', g=mkScene(id), s=TL[id];
  header(g,id,'3 · Reconcile','They hold short-term pressure and\nlong-term vision at once.');
  const px=960, py=680;
  const beam=el('g',{},g);
  draw(beam, gen.rectangle(440,py-14,1040,22,R()), s.vo_start, 0.7);
  const items=[['Cost',600,'down',wt(id,'Cost')],['Growth',1320,'up',wt(id,'growth')],
               ['Stability',780,'down',wt(id,'Stability')],['Reinvention',1140,'up',wt(id,'reinvention')]];
  items.forEach(([l,x,dir,t])=>{
    if(dir==='down') arrow(beam,x,470,x,py-22,t,0.45,{head:22});
    else arrow(beam,x,py-22,x,470,t,0.45,{head:22});
    text(beam,x,445,l,{size:28,anchor:'middle',t0:t}); });
  text(g,610,840,'short term',{size:22,italic:true,color:C.muted,anchor:'middle',t0:wt(id,'Cost')+0.4});
  text(g,1310,840,'long term',{size:22,italic:true,color:C.muted,anchor:'middle',t0:wt(id,'growth')+0.4});
  const th=wt(id,'hold both sides',-0.1);
  const keys=[[s.start,0],[items[0][3]+0.3,-3],[items[1][3]+0.3,3],[items[2][3]+0.3,-4],[items[3][3]+0.3,3.5],[th,3.5],[th+0.6,0]];
  custom(t=>{ let ang=0; for(let i=0;i<keys.length-1;i++){ const [ta,a0]=keys[i],[tb,a1]=keys[i+1];
      if(t>=ta&&t<=tb){ ang=a0+(a1-a0)*ease((t-ta)/Math.max(0.01,Math.min(0.5,tb-ta))); break; } if(t>tb) ang=a1; }
    beam.setAttribute('transform',`rotate(${ang} ${px} ${py})`); });
  const tri=draw(gHub, gen.polygon([[px,py+6],[px-60,py+110],[px+60,py+110]],
      R({stroke:C.accent,fill:C.accent,fillStyle:'solid',strokeWidth:3})), th, 0.6); // carried to S6
  recolor(tri, TL.s6.start, C.accent, C.ink, 0.12);
  text(g,px,py+155,'the enterprise leader',{size:24,italic:true,weight:600,color:C.accentSm,anchor:'middle',t0:th+0.4});
})();

// ---------- S6 · Align (the pivot is now the hub of the five systems) ----------
(()=>{ const id='s6', g=mkScene(id);
  header(g,id,'4 · Align','They align five systems\nthat work as one loop.');
  const cx=960, cy=670, rr=255, r=86;
  const nodes=[['Meaning','Meaning'],['Mind-set','Mind-set'],['Mobilization','Mobilization'],['Measurement','Measurement'],['Mechanisms\nfor renewal','mechanisms for renewal']];
  const P=i=>{ const a=-Math.PI/2+i*2*Math.PI/5; return [cx+rr*Math.cos(a), cy+rr*Math.sin(a)]; };
  nodes.forEach(([l,ph],i)=>{ const [x,y]=P(i), t=wt(id,ph,-0.15);
    draw(g, gen.circle(x,y,2*r,R()), t, 0.5);
    text(g,x,y+(l.includes('\n')?-4:8),l,{size:l.includes('\n')?21:22,weight:600,anchor:'middle',lh:26,t0:t+0.2});
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

// ---------- S7 · the turn (clean break). The three walls are carried into S8 ----------
(()=>{ const id='s7', g=mkScene(id), s=TL[id], nx=TL.s8;
  header(g,id,'','Yet organizations are built to\nreject enterprise leaders.');
  WALLS.forEach(([x,l,ph],i)=>{ const t=wt(id,ph,-0.1);
    draw(gWalls, gen.rectangle(x-35,530,70,300,R({fill:C.ink,fillStyle:'hachure',hachureGap:9,fillWeight:1.2})), t, 0.5);
    const lab=text(gWalls,x,500,l,{size:24,weight:700,track:'0.12em',anchor:'middle',t0:t+0.15});
    if(i===2){ const te=lab.querySelector('text'), tr=wt(id,'unit results',0);
      custom(tt=>te.setAttribute('fill', tt>=tr && tt<nx.start ? C.accent : C.ink)); }
  });
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

// ---------- S8 · dismantle the barriers on purpose. The accent line is carried into S9 ----------
(()=>{ const id='s8', g=mkScene(id);
  header(g,id,'Overcoming the obstacles','Closing the gap means dismantling\nthe barriers on purpose.');
  const levers=[['Demand an enterprise view','Demand & measure it,\nfrom the top'],
                ['Rotate high potentials','Rotate high potentials\nacross the firm'],
                ['Track talent','Track talent\nacross silos']];
  levers.forEach(([ph,cap],i)=>{ const x=WALLS[i][0], t=wt(id,ph,0);
    draw(g,[gen.line(x-70,560,x+70,800,R({strokeWidth:3})),gen.line(x+70,560,x-70,800,R({strokeWidth:3}))],t,0.45);
    text(g,x,885,cap,{size:23,anchor:'middle',lh:29,t0:t+0.2});
  });
  const tl=wt(id,'across silos',0.1);
  const ln=draw(gLine, gen.line(200,680,1720,680,R({stroke:C.accent,strokeWidth:6,roughness:0.5})), tl, 0.8);
  const hd=draw(gLine,[gen.line(1720,680,1690,660,R({stroke:C.accent,strokeWidth:6,roughness:0.4})),gen.line(1720,680,1690,700,R({stroke:C.accent,strokeWidth:6,roughness:0.4}))], tl+0.7, 0.2);
  recolor(ln, TL.s9.start, C.accent, C.ink); recolor(hd, TL.s9.start, C.accent, C.ink);
})();

// ---------- S9 · closing card, standing on the carried line ----------
(()=>{ const id='s9', g=mkScene(id), s=TL[id];
  eyebrow(g,'Korn Ferry',s.start+0.2,960,500,'middle');
  words(g,960,640,'Lead the *whole.*',s.start+0.4,{size:104,anchor:'middle',step:0.18});
  text(g,960,985,'Adapted from Douglas A. Ready, “Leading at the Enterprise Level,” MIT Sloan Management Review, Spring 2004.',
    {size:22,color:C.muted,anchor:'middle',t0:s.start+1.0});
})();
