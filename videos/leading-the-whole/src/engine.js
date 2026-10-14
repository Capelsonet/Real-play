// Sketch-explainer engine: deterministic render(t) over an SVG built once.
const C = { paper:'#FBF6F1', ink:'#123B30', accent:'#07C690', accentSm:'#05A57A', muted:'#7E958B' };
const NS = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('stage');
const gen = rough.generator();
let SEED = 11;
const TL = {}; TIMELINE.forEach(s => TL[s.id] = s);
const ITEMS = [];            // {render(t)}
const SCENES = {};           // id -> {g, s}
const ease = x => x<0?0:x>1?1:(x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2);
const clamp = x => x<0?0:x>1?1:x;

function el(tag, attrs, parent){ const e=document.createElementNS(NS,tag); for(const k in attrs) e.setAttribute(k,attrs[k]); (parent||svg).appendChild(e); return e; }

// Spoken time of a phrase that exists verbatim in the scene's voiceover.
function wt(id, phrase, off=0){
  const s=TL[id]; const i=s.vo.indexOf(phrase);
  if(i<0) throw new Error(`wt: "${phrase}" not in ${id}`);
  return s.vo_start + i/s.vo.length*(s.vo_end-s.vo_start) + off;
}

function mkScene(id, opts={}){
  const s=TL[id]; const g=el('g',{id});
  const last = TIMELINE[TIMELINE.length-1].id===id;
  SCENES[id]={g,s};
  ITEMS.push({render:t=>{
    let o = clamp((t-s.start)/0.3);
    if(!last) o = Math.min(o, clamp((s.end-t)/0.3));
    if(t<s.start-0.01 || (!last && t>s.end+0.01)) o=0;
    g.setAttribute('opacity',o); g.style.display=o>0?'':'none';
  }});
  return g;
}

// Draw a rough drawable (or array) progressively from t0 over dur seconds.
function draw(parent, drawables, t0, dur=0.8, o={}){
  if(!Array.isArray(drawables)) drawables=[drawables];
  const g=el('g',{},parent); const paths=[];
  drawables.forEach(d=>gen.toPaths(d).forEach(p=>{
    const solid = p.fill && p.fill!=='none' && (!p.stroke || p.stroke==='none');
    const e=el('path',{d:p.d, fill:solid?p.fill:'none', stroke:solid?'none':(p.stroke||C.ink),
      'stroke-width':p.strokeWidth||2, 'stroke-linecap':'round','stroke-linejoin':'round'},g);
    if(!solid){ e.setAttribute('pathLength',1); e.setAttribute('stroke-dasharray','1 1'); }
    if(solid) e.dataset.solid='1';
    paths.push({e,solid});
  }));
  const n=paths.filter(p=>!p.solid).length||1;
  ITEMS.push({render:t=>{
    const p=ease((t-t0)/dur);
    paths.forEach(({e,solid})=>{
      if(solid){ e.setAttribute('opacity',clamp((t-t0-dur*0.6)/0.4)); return; }
      e.setAttribute('stroke-dashoffset',1-p); e.setAttribute('opacity',p<0.002?0:1);
    });
  }});
  return g;
}
const R = (o={}) => Object.assign({seed:SEED++, roughness:1.1, bowing:0.8, stroke:C.ink, strokeWidth:2.4}, o);

// Text with fade-up. `*word*` = accent. lines separated by \n.
function text(parent, x, y, str, o={}){
  const size=o.size||28, lh=o.lh||size*1.18;
  const g=el('g',{},parent);
  const t=el('text',{x, y, 'font-family':o.display?'Inter Display, Inter':'Inter','font-size':size,
    'font-weight':o.weight||400, fill:o.color||C.ink, 'text-anchor':o.anchor||'start',
    'letter-spacing':o.track||0, 'font-style':o.italic?'italic':'normal'},g);
  str.split('\n').forEach((line,li)=>{
    const ts=el('tspan',{x, dy: li?lh:0},t);
    line.split(/(\*[^*]+\*)/).forEach(seg=>{ if(!seg) return;
      const acc=seg.startsWith('*'); const sp=el('tspan',acc?{fill:o.accentColor||C.accent}:{},ts);
      sp.textContent=acc?seg.slice(1,-1):seg; });
  });
  const t0=o.t0||0, d=o.dur||0.5;
  ITEMS.push({render:tt=>{ const p=ease((tt-t0)/d); g.setAttribute('opacity',p);
    g.setAttribute('transform',`translate(0,${(1-p)*16})`); }});
  g.dataset.label='1'; return g;
}

// Headline revealed word by word. `*word*` marks accent words.
function words(parent, x, y, str, t0, o={}){
  const size=o.size||60, lh=size*1.12, step=o.step||0.07;
  const t=el('text',{x,y,'font-family':'Inter','font-size':size,'font-weight':700,fill:C.ink,
    'letter-spacing':`${-0.025*size}`,'text-anchor':o.anchor||'start'},parent);
  t.dataset.label='1';
  let k=0;
  str.split('\n').forEach((line,li)=>{
    const ts=el('tspan',{x,dy:li?lh:0},t);
    line.split(' ').forEach((w,wi)=>{
      const acc=w.startsWith('*'); const sp=el('tspan',acc?{fill:C.accent}:{},ts);
      sp.textContent=(wi?' ':'')+w.replace(/\*/g,'');
      const tw=t0+(k++)*step;
      ITEMS.push({render:tt=>sp.setAttribute('fill-opacity',ease((tt-tw)/0.35))});
    });
  });
  return t;
}

function eyebrow(parent, str, t0, x=150, y=120, anchor='start'){
  return text(parent,x,y,str.toUpperCase(),{size:22,weight:600,track:'0.18em',color:C.ink,t0,anchor});
}
function header(g, id, eb, hl){
  const s=TL[id];
  if(eb) eyebrow(g, eb, s.start+0.15);
  words(g, 150, eb?205:190, hl, s.start+0.25);
}

// Arrow from (x1,y1) to (x2,y2)
function arrow(parent,x1,y1,x2,y2,t0,dur=0.6,o={}){
  const a=Math.atan2(y2-y1,x2-x1), h=o.head||18;
  const d=[gen.line(x1,y1,x2,y2,R(o)),
    gen.line(x2,y2,x2-h*Math.cos(a-0.45),y2-h*Math.sin(a-0.45),R(o)),
    gen.line(x2,y2,x2-h*Math.cos(a+0.45),y2-h*Math.sin(a+0.45),R(o))];
  return draw(parent,d,t0,dur);
}
function custom(fn){ ITEMS.push({render:fn}); }

function render(t){ ITEMS.forEach(i=>i.render(t)); }
window.render=render;

// Continuity: a group that stays on screen from scene `a` through the end of scene `b`.
function carryGroup(a,b){
  const A=TL[a], B=TL[b], last=TIMELINE[TIMELINE.length-1].id===b, g=el('g',{id:`carry_${a}_${b}`});
  ITEMS.push({render:t=>{
    let o=clamp((t-A.start)/0.3); if(!last) o=Math.min(o,clamp((B.end-t)/0.3));
    if(t<A.start-0.01||(!last&&t>B.end+0.01)) o=0;
    g.setAttribute('opacity',o); g.style.display=o>0?'':'none';
  }});
  return g;
}
// At the cut (t0) a carried drawing returns from its accent colour to ink.
function recolor(g,t0,from,to,fillOp=1){
  ITEMS.push({render:t=>{ const after=t>=t0;
    g.querySelectorAll('path').forEach(p=>{
      if(p.dataset.solid){ p.setAttribute('fill',after?to:from); p.setAttribute('fill-opacity',after?fillOp:1); }
      else p.setAttribute('stroke',after?to:from); }); }});
}
