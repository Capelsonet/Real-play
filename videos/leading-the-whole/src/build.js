const fs=require('fs');
const f=w=>'node_modules/@fontsource/inter/files/inter-latin-'+w+'-normal.woff2';
const ff=[400,600,700].map(w=>`@font-face{font-family:Inter;font-weight:${w};src:url(${f(w)}) format('woff2')}`).join('')+
 [400,600].map(w=>`@font-face{font-family:Inter;font-style:italic;font-weight:${w};src:url(node_modules/@fontsource/inter/files/inter-latin-${w}-italic.woff2) format('woff2')}`).join('');
const html=`<!doctype html><html><head><meta charset="utf-8"><title>Leading the Whole</title><style>${ff}
html,body{margin:0;background:#FBF6F1}svg{display:block}</style></head><body>
<svg id="stage" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="#FBF6F1"/></svg>
<script src="node_modules/roughjs/bundled/rough.js"></script>
<script>const TIMELINE=${fs.readFileSync('timeline.json','utf8')};</script>
<script src="engine.js"></script><script src="scenes.js"></script>
<script>document.fonts.ready.then(()=>{window.READY=true;render(0)})</script></body></html>`;
fs.writeFileSync('index.html',html);
