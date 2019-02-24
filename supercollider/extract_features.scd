
// extract features

s.boot;

(
//d = Buffer.read(s, "/home/xt53/Desktop/audiodata/negative/14.wav");
d = Buffer.read(s, "/home/xt53/Desktop/audiodata/positivebatch/POSITIVE.wav");
  {
/*	var sound = SinOsc.ar(240,mul:0.2)
	+ Resonz.ar(ClipNoise.ar,2000,0.6,mul:SinOsc.kr(0.05).range(0,0.5))
	+ Saw.ar(2000,mul:SinOsc.kr(0.1).range(0,0.3));*/
	//var sound = SoundIn.ar(0);
    var sound = PlayBuf.ar(1, d, loop: 1, rate: BufRateScale.kr(d));
	var slopeanalysis = AttackSlope.kr(sound, windowsize: 2048, mingap: 0.1, energythreshold: 0.01, numslopesaveraged: 40, peakpicksize: 20, sumthreshold: 40);
    var fft = FFT(LocalBuf(2048), sound, wintype: 1);
    var entropy = SpectralEntropy.kr(fft, 2048, 1);
    var spec = SpecCentroid.kr(fft);
    var percentile = SpecPcile.kr(fft, 0.9, 1);
    var crest = FFTCrest.kr(fft);
    var flatness = SpecFlatness.kr(fft);
    var slope = FFTSlope.kr(fft);
    var pitch = Pitch.kr(sound);
    var peak = FFTPeak.kr(fft, freqlo: 0, freqhi: 50000);
    var dissonance = SensoryDissonance.kr(fft);
    var flux = FFTFlux.kr(fft, normalise: 1);
    var fluxpos = FFTFluxPos.kr(fft, normalise: 1);
    var mfcc = MFCC.kr(fft, numcoeff: 12);
    var chromagram = Chromagram.kr(fft);
    var mode = KeyMode.kr(fft, 2.0, 0.5);
    var key = KeyClarity.kr(fft, keydecay: 2, chromaleak: 0.5);
	  SendReply.kr(fft,'extract_features',
		[slopeanalysis[4]] ++
		[entropy] ++
		spec ++
		percentile ++
		crest ++
		flatness ++
		slope ++
		pitch ++
		peak ++
		dissonance ++
		flux ++
		fluxpos ++
		[mode] ++
		[key] ++
		chromagram
		//mfcc
	);
	Out.ar(0, sound!2);
  }.play;
)

(
  b = NetAddr.new("127.0.0.1", 57111);
  OSCresponder(s.addr, 'extract_features', { arg time, responder, msg;
	//msg.asCompileString.postln;
	b.sendMsg('/feature', msg.asCompileString);
  }).add
);
