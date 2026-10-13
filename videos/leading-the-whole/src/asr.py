import sys, numpy as np, soundfile as sf, sherpa_onnx, glob
m='sherpa-onnx-whisper-tiny.en/'
r=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=m+'tiny.en-encoder.onnx',decoder=m+'tiny.en-decoder.onnx',tokens=m+'tiny.en-tokens.txt')
for f in sorted(glob.glob(sys.argv[1]+'/clips/*.wav')):
    a,sr=sf.read(f,dtype='float32'); a=np.interp(np.arange(0,len(a),sr/16000),np.arange(len(a)),a).astype(np.float32)
    s=r.create_stream(); s.accept_waveform(16000,a); r.decode_stream(s); print(f.split('/')[-1], s.result.text.strip())
