# Leading the Whole — sketch explainer video

Executive briefing (English, ~1 min 30) adapted from Douglas A. Ready,
"Leading at the Enterprise Level," *MIT Sloan Management Review*, Spring 2004.
Korn Ferry branding in text only (no logo).

| File | Voice | Length |
|---|---|---|
| `Leading_the_Whole_v1_scratch-George.mp4` + `.srt` | Kokoro `bm_george`, en-gb, speed 1.06 (scratch) | 1:41 |
| `Leading_the_Whole_v2_scratch-Emma.mp4` + `.srt` | Kokoro `bf_emma`, en-gb, speed 1.06 + warmth EQ (scratch, closest to the chosen ElevenLabs voice) | 1:28 |

Final voice planned: ElevenLabs "Jodi – Clear British Voice" (`FF59babHL8N8gfTgtBMT`), model `eleven_v4`. Not generated yet.

## Rebuild (src/)

1. `npm i roughjs@4.6.6 playwright@1.56.1 @fontsource/inter` and `pip install kokoro-onnx soundfile`
2. Download `kokoro-v1.0.onnx` and `voices-v1.0.bin` from
   https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
3. `mkdir clips && python3 voice.py` → `clips/`, `voice.wav`, `timeline.json` (set the voice in `voice.py`)
4. `node build.js` → `index.html`; `node check.js` → layout report + frames in `check/`
5. `node render.js` → `video_silent.mp4`, then mux `voice.wav` with ffmpeg (loudnorm -16 LUFS, AAC 64k mono)
6. `python3 srt.py out.srt`

To swap in another voice (e.g. ElevenLabs Jodi): replace the per-scene clips, rebuild `timeline.json`
with the same pre/post gaps (see `voice.py`), then steps 4–6. All animation cues follow the voice through `wt()`.
