const {chromium}=require('playwright');const {spawn}=require('child_process');const tl=require('./timeline.json');
const FPS=30, T=tl[tl.length-1].end, N=Math.ceil(T*FPS), out=process.argv[2]||'video_silent.mp4';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+process.cwd()+'/index.html');await p.waitForFunction('window.READY===true');
const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate',''+FPS,'-i','-','-c:v','libx264','-crf','18','-tune','animation','-preset','slow','-pix_fmt','yuv420p',out],{stdio:['pipe','inherit','inherit']});
for(let i=0;i<N;i++){await p.evaluate(t=>render(t),i/FPS);const buf=await p.screenshot({type:'jpeg',quality:92});
 if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('frames',N);})();
