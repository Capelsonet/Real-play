"""Scratch voice (Kokoro bm_george) -> per-scene clips, voice.wav, timeline.json."""
import json, sys
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

VOICE, LANG, SPEED = "bf_emma", "en-gb", 1.06
k = Kokoro("kokoro-v1.0.onnx", "voices-v1.0.bin")
script = json.load(open("script.json"))

def trim(a, sr, thr=0.01):
    idx = np.where(np.abs(a) > thr)[0]
    if not len(idx):
        return a
    s, e = max(0, idx[0] - int(0.02 * sr)), min(len(a), idx[-1] + int(0.06 * sr))
    return a[s:e]

out, tl, t, SR = [], [], 0.0, 24000
for sc in script:
    ph = k.tokenizer.phonemize(sc["vo"], LANG)
    a, sr = k.create(ph, voice=VOICE, speed=SPEED, lang=LANG, is_phonemes=True)
    SR = sr
    a = trim(a, sr)
    sf.write(f"clips/{sc['id']}.wav", a, sr)
    d = len(a) / sr
    start = t
    vs = start + sc["pre"]
    ve = vs + d
    end = ve + sc["post"]
    tl.append({"id": sc["id"], "start": round(start, 3), "vo_start": round(vs, 3),
               "vo_end": round(ve, 3), "end": round(end, 3), "vo": sc["vo"]})
    out += [np.zeros(int(sc["pre"] * sr)), a, np.zeros(int(sc["post"] * sr))]
    t = end
full = np.concatenate(out).astype(np.float32)
# pad to exact total length
full = np.pad(full, (0, max(0, int(round(t * SR)) - len(full))))
sf.write("voice.wav", full, SR, subtype="PCM_16")
json.dump(tl, open("timeline.json", "w"), indent=1)
for s in tl:
    print(s["id"], s["start"], s["vo_start"], s["vo_end"], s["end"])
print("TOTAL", round(t, 2))
