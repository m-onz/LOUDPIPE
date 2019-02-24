
var osc = require('osc')
var fs = require('fs')
var DynamicTimeWarping = require('dynamic-time-warping')
var statistics = require('../lib/statistics')
var clusters = JSON.parse(fs.readFileSync('./codebook.json').toString())

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57111,
    metadata: true
})

var distFunc = function( a, b ) {
    return Math.abs( a - b );
};

var onsets = []
var entropy = []
var centroid = []
var percentile = []
var crest = []
var flatness = []
var slope = []
var pitch = []
var peak = []
var dissonance = []
var flux = []
var fluxpos = []
var c1 = []
var c2 = []
var c3 = []
var c4 = []
var c5 = []
var c6 = []
var c7 = []
var c8 = []
var c9 = []
var c10 = []
var c11 = []

var batch = []

setInterval(function () {
  if (batch.length < 48) {
    batch.push(statistics(onsets).median / statistics(onsets).maximum)
    batch.push(statistics(entropy).median / statistics(entropy).maximum)
    batch.push(statistics(centroid).median / statistics(centroid).maximum)
    batch.push(statistics(percentile).median / statistics(percentile).maximum)
    batch.push(statistics(crest).median / statistics(crest).maximum)
    batch.push(statistics(flatness).median / statistics(flatness).maximum)
    batch.push(statistics(slope).median / statistics(slope).maximum)
    batch.push(statistics(pitch).median / statistics(pitch).maximum)
    batch.push(statistics(peak).median / statistics(peak).maximum)
    batch.push(statistics(dissonance).median / statistics(dissonance).maximum)
    batch.push(statistics(flux).median / statistics(flux).maximum)
    batch.push(statistics(fluxpos).median / statistics(fluxpos).maximum)
    batch.push(statistics(c1).median / statistics(c1).maximum)
    batch.push(statistics(c2).median / statistics(c2).maximum)
    batch.push(statistics(c3).median / statistics(c3).maximum)
    batch.push(statistics(c4).median / statistics(c4).maximum)
    batch.push(statistics(c5).median / statistics(c5).maximum)
    batch.push(statistics(c6).median / statistics(c6).maximum)
    batch.push(statistics(c7).median / statistics(c7).maximum)
    batch.push(statistics(c8).median / statistics(c8).maximum)
    batch.push(statistics(c9).median/ statistics(c9).maximum)
    batch.push(statistics(c10).median / statistics(c10).maximum)
    batch.push(statistics(c11).median / statistics(c11).maximum)
  } else {
    // console.log('batch', batch)
    var output = predict(batch)
    console.log(output)
    batch = []
  }

  onsets = []
  entropy = []
  centroid = []
  percentile = []
  crest = []
  flatness = []
  slope = []
  pitch = peak = []
  dissonance = []
  flux = []
  fluxpos = []
  c1 = []
  c2 = []
  c3 = []
  c5 = []
  c6 = []
  c7 = []
  c8 = []
  c9 = []
  c10 = []
  c11 = []
  // c12 = []
  // c13 = []
  // c14 = []
  // c15 = []
  // c16 = []
  // c17 = []
  // c18 = []
  // c19 = []
  // c20 = []
  // c21 = []
  // c22 = []
  // c23 = []
  // c24 = []
  // c25 = []
  // c26 = []
  // c27 = []
  // c28 = []
}, 500)

udpPort.on("message", function (oscMsg) {
  var msg = oscMsg.args[0].value
	.split(',')
	.slice(3)
	.map(function (i) { return parseFloat(i); })
	if (!msg.length || !Array.isArray(msg)) return;

  onsets.push(msg[0])
  entropy.push(msg[1])
  centroid.push(msg[2])
  percentile.push(msg[3])
  crest.push(msg[4])
  flatness.push(msg[5])
  slope.push(msg[6])
  pitch.push(msg[7])
  peak.push(msg[8])
  dissonance.push(msg[9])
  flux.push(msg[10])
  fluxpos.push(msg[11])
  c1.push(msg[12])
  c2.push(msg[13])
  c3.push(msg[14])
  c4.push(msg[15])
  c5.push(msg[16])
  c6.push(msg[17])
  c7.push(msg[18])
  c8.push(msg[19])
  c9.push(msg[20])
  c10.push(msg[21])
  c11.push(msg[22])
})
udpPort.open()

function predict (prediction, debug = true) {
  var result = []
  clusters.forEach(function (c, index) {
    if (!c || !Array.isArray(c) || !prediction) return
    var dtw = new DynamicTimeWarping (c, prediction, distFunc)
    var d = dtw.getDistance()
    if (typeof d !== 'number') return
    result.push({ distance: d, index: index })
  })
  var THRESHOLD = 7;
  var match = result.sort(function (a, b) { return b.distance - a.distance }).reverse()[0]
  if (!match) return 0
  if (debug) console.log('distance ', match.distance)
  if (match && match.distance < THRESHOLD) {
    return 1
  } else {
    return 0
  }
}
