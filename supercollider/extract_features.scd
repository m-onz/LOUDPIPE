
// extract features

s.boot;

(
d = Buffer.read(s, "/home/xt53/Desktop/audiodata/negativebatch/test.wav");
//d = Buffer.read(s, "/home/xt53/Desktop/audiodata/positivebatch/POSITIVE.wav");
{
	//var sound = SoundIn.ar(0);
	var sound = PlayBuf.ar(1, d, loop: 1, rate: BufRateScale.kr(d));
	var slopeanalysis = AttackSlope.kr(sound, windowsize: 2048, mingap: 0.1, energythreshold: 0.01, numslopesaveraged: 40, peakpicksize: 20, sumthreshold: 40);
	var fft = FFT(LocalBuf(2048), sound, wintype: 1);
	var entropy = AverageOutput.kr(SpectralEntropy.kr(fft, 2048, 1));
	var spec = AverageOutput.kr(SpecCentroid.kr(fft));
	var percentile = AverageOutput.kr(SpecPcile.kr(fft, 0.9, 1));
	var crest = AverageOutput.kr(FFTCrest.kr(fft));
	var flatness = AverageOutput.kr(SpecFlatness.kr(fft));
	var pitch = AverageOutput.kr(Pitch.kr(sound));
	var peak = AverageOutput.kr(FFTPeak.kr(fft, freqlo: 0, freqhi: 50000));
	var dissonance = AverageOutput.kr(SensoryDissonance.kr(fft));
	var flux = AverageOutput.kr(FFTFlux.kr(fft, normalise: 1));
	var fluxpos = FFTFluxPos.kr(fft, normalise: 1);
	var mfcc = AverageOutput.kr(MFCC.kr(fft, numcoeff: 24));
	var key = AverageOutput.kr(KeyClarity.kr(fft, keydecay: 2, chromaleak: 0.5));
	SendReply.kr(fft,'extract_features',
		[spec.linlin(0, 8000, 0, 1)] ++
		[entropy.linlin(0, 50, 0, 1)] ++
		[flux] ++
		[fluxpos] ++
		[key.linlin(0, 11, 0, 1)] ++
		[pitch[0].linlin(0, 4000, 0, 1)] ++
		percentile.linlin(0, 20000, 0, 1) ++
		crest.linlin(0, 1000, 0, 1) ++
		[flatness] ++
		[peak[0].linlin(0, 300, 0, 1)] ++
		[dissonance.round(0.01)] ++
		mfcc
	);
	Out.ar(0, sound!2);
}.play;
)

(
  b = NetAddr.new("127.0.0.1", 57111);
  OSCresponder(s.addr, 'extract_features', { arg time, responder, msg;
	msg.asCompileString.postln;
	//b.sendMsg('/feature', msg.asCompileString);
  }).add
);
