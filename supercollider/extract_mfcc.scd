
// extract mfcc

s.boot;

(
  d = Buffer.read(s, "/home/xt53/Desktop/audiodata/humans/11.wav");
  //d = Buffer.read(s, "/home/xt53/Desktop/audiodata/positivebatch/POSITIVE.wav");
  {
	//var sound = SoundIn.ar(0);
    var sound = PlayBuf.ar(1, d, loop: 1, rate: BufRateScale.kr(d));
    var fft = FFT(LocalBuf(2048), sound, wintype: 1);
    var mfcc = MFCC.kr(fft, numcoeff: 24);
    SendReply.kr(fft,'extract_features',
      mfcc
    );
    Out.ar(0, sound!2);
  }.play;
)

(
  b = NetAddr.new("127.0.0.1", 57111);
  OSCresponder(s.addr, 'extract_features', {
    arg time, responder, msg;
  	//msg.asCompileString.postln;
  	b.sendMsg('/feature', msg.asCompileString);
  }).add
);
