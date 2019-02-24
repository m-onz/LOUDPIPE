
var osc = require('osc')
var fs = require('fs')
var KNN = require('ml-knn')
var model = JSON.parse(fs.readFileSync('./model.json').toString())
var knn = KNN.load(model)
var statistics = require('../lib/statistics')
var LABEL = 1
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57111,
    metadata: true
})

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
// var c12 = []
// var c13 = []
// var c14 = []
// var c15 = []
// var c16 = []
// var c17 = []
// var c18 = []
// var c19 = []
// var c20 = []
// var c21 = []
// var c22 = []
// var c23 = []
// var c24 = []
// var c25 = []
// var c26 = []
// var c27 = []
// var c28 = []

var batch = []

setInterval(function () {
  // console.log('onsets ', statistics(onsets).skew)
  // console.log('entropy ', statistics(entropy).skew)
  // console.log('centroid ', statistics(centroid).skew)
  // console.log('percentile ', statistics(percentile).skew)
  // console.log('crest ', statistics(crest).skew)
  // console.log('flatness ', statistics(flatness).skew)
  // console.log('slope ', statistics(slope).skew)
  // console.log('pitch ', statistics(pitch).skew)
  // console.log('peak ', statistics(peak).skew)
  // console.log('dissonance ', statistics(dissonance).skew)
  // console.log('flux ', statistics(flux).skew)
  // console.log('fluxpos ', statistics(fluxpos).skew)
  // console.log('c1 ', statistics(c1).skew)
  // console.log('c2 ', statistics(c2).skew)
  // console.log('c3 ', statistics(c3).skew)
  // console.log('c4 ', statistics(c4).skew)
  // console.log('c5 ', statistics(c5).skew)
  // console.log('c6 ', statistics(c6).skew)
  // console.log('c7 ', statistics(c7).skew)
  // console.log('c8 ', statistics(c8).skew)
  // console.log('c9 ', statistics(c9).skew)
  // console.log('c10 ', statistics(c10).skew)
  // console.log('c11 ', statistics(c11))

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
    var ans = parseInt(knn.predict([batch]))
    console.log(ans)
    batch = []
  }

  // console.log('c12 ', statistics(c12).skew)
  // console.log('c13 ', statistics(c13).skew)
  // console.log('c14 ', statistics(c14).skew)
  // console.log('c15 ', statistics(c15).skew)
  // console.log('c16 ', statistics(c16).skew)
  // console.log('c17 ', statistics(c17).skew)
  // console.log('c18 ', statistics(c18).skew)
  // console.log('c19 ', statistics(c19).skew)
  // console.log('c20 ', statistics(c20).skew)
  // console.log('c21 ', statistics(c21).skew)
  // console.log('c22 ', statistics(c22).skew)
  // console.log('c23 ', statistics(c23).skew)
  // console.log('c24 ', statistics(c24).skew)
  // console.log('c25 ', statistics(c25).skew)
  // console.log('c26 ', statistics(c26).skew)
  // console.log('c27 ', statistics(c27).skew)
  // console.log('c28 ', statistics(c28).skew)

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
  // c12.push(msg[23])
  // c13.push(msg[24])
  // c14.push(msg[25])
  // c15.push(msg[26])
  // c16.push(msg[27])
  // c17.push(msg[28])
  // c18.push(msg[29])
  // c19.push(msg[30])
  // c20.push(msg[31])
  // c21.push(msg[32])
  // c22.push(msg[33])
  // c23.push(msg[34])
  // c24.push(msg[35])
  // c25.push(msg[36])
  // c26.push(msg[37])
  // c27.push(msg[38])
  // c28.push(msg[39])
})
udpPort.open()
