import json,re,sys
tl=json.load(open('timeline.json'));out=[];n=1
f=lambda t:'%02d:%02d:%02d,%03d'%(t//3600,t%3600//60,int(t%60),int(round((t%1)*1000))%1000)
for s in tl:
    vo=s['vo'];L=len(vo);d=s['vo_end']-s['vo_start'];pos=0
    for p in re.findall(r'[^.]+\.?',vo):
        p2=p.strip()
        if not p2: continue
        i=vo.index(p2,pos);a=s['vo_start']+i/L*d;b=s['vo_start']+(i+len(p2))/L*d;pos=i+len(p2)
        out.append(f"{n}\n{f(a)} --> {f(b)}\n{p2}\n");n+=1
open(sys.argv[1],'w').write('\n'.join(out))
