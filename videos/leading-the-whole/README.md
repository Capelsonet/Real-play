# Leading the Whole — sketch explainer video

Executive briefing (English, ~1 min 30) adapted from Douglas A. Ready,
"Leading at the Enterprise Level," *MIT Sloan Management Review*, Spring 2004.
Korn Ferry branding in text only (no logo).

| File | Voice | Length |
|---|---|---|
| `Leading_the_Whole_v3_scratch-George.mp4` + `.srt` | Kokoro `bm_george`, en-gb, speed 1.06 (scratch). **Current version**, with scene-to-scene continuity | 1:41 |
| `Leading_the_Whole_v1_scratch-George.mp4` + `.srt` | Same voice, first cut without continuity (superseded) | 1:41 |

The Emma (`bf_emma`) cut was dropped on request; it stays in the git history (commit 8f42385).

## Continuity (carried elements)

An element stays on screen across the cut, in the same place, and returns to ink at the cut (`carryGroup` / `recolor` in `src/engine.js`):

- S1→S2 the four silos, which S2 labels and encloses in the accent ring; the customer circle stays through S3
- S4→S5 the accent dot comes to rest at the loop's centre and becomes the pivot of the balance
- S5→S6 the pivot becomes the hub of the five systems
- S7→S8 the three walls; S8→S9 the accent line, which the closing card stands on
- S3→S4 and S6→S7 are deliberate clean breaks (a new thread opens)

Final voice planned: ElevenLabs "Jodi – Clear British Voice" (`FF59babHL8N8gfTgtBMT`), model `eleven_v4`. Not generated yet.

## Rebuild (src/)

1. `npm i roughjs@4.6.6 playwright@1.56.1 @fontsource/inter` and `pip install kokoro-onnx soundfile`
2. Download `kokoro-v1.0.onnx` and `voices-v1.0.bin` from
   https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
3. `mkdir clips && python3 voice.py` → `clips/`, `voice.wav`, `timeline.json` (a copy for the George voice is in `src/timeline_george.json`) (set the voice in `voice.py`)
4. `node build.js` → `index.html`; `node check.js` → layout report + frames in `check/`
5. `node render.js` → `video_silent.mp4`, then mux `voice.wav` with ffmpeg (loudnorm -16 LUFS, AAC 64k mono)
6. `python3 srt.py out.srt`

To swap in another voice (e.g. ElevenLabs Jodi): replace the per-scene clips, rebuild `timeline.json` (a copy for the George voice is in `src/timeline_george.json`)
with the same pre/post gaps (see `voice.py`), then steps 4–6. All animation cues follow the voice through `wt()`.
