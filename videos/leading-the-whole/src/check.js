const {chromium}=require('playwright');const tl=require('./timeline.json');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1920,height:1080}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/index.html');await p.waitForFunction('window.READY===true',null,{timeout:15000}).catch(()=>{});
if(errs.length){console.log('ERRORS',errs);process.exit(1)}
for(const s of tl){for(const [tag,t] of [['mid',(s.vo_start+s.vo_end)/2],['end',s.id==='s9'?s.end-0.05:s.end-0.35]]){
 const rep=await p.evaluate(t=>{render(t);const out=[];
  document.querySelectorAll('text').forEach(e=>{let n=e,vis=true;while(n&&n.tagName!=='svg'){if(n.style&&n.style.display==='none'||(n.getAttribute&&n.getAttribute('opacity')==='0'))vis=false;n=n.parentNode}
   if(!vis)return;const r=e.getBoundingClientRect();if(r.width<1)return;out.push({t:e.textContent.slice(0,30),x:r.left,y:r.top,r:r.right,b:r.bottom,fs:+e.getAttribute('font-size')})});
  const iss=[];out.forEach((a,i)=>{if(a.x<40||a.r>1880||a.b>1005)iss.push('OUT '+a.t+' '+[a.x,a.r,a.b].map(Math.round));if(a.fs<13)iss.push('SMALL '+a.t);
   out.slice(i+1).forEach(c=>{if(a.x<c.r-2&&c.x<a.r-2&&a.y<c.b-2&&c.y<a.b-2)iss.push('OVERLAP "'+a.t+'" / "'+c.t+'"')})});return iss},t);
 if(tag==='end'&&rep.length)console.log(s.id,rep.join(' | '));
 await p.screenshot({path:`check/${s.id}_${tag}.jpg`,type:'jpeg',quality:70});}}
await b.close();})();
