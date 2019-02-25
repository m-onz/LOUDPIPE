
var osc = require('osc')
var fs = require('fs')
var neataptic = require('neataptic')
var network = new neataptic.Network.fromJSON(JSON.parse(fs.readFileSync('./model.json').toString()))
var statistics = require('../lib/statistics')
var LABEL = 1
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57111,
    metadata: true
})

// var onsets = []
// var entropy = []
// var centroid = []
// var percentile = []
// var crest = []
// var flatness = []
// var slope = []
// var pitch = []
// var peak = []
// var dissonance = []
// var flux = []
// var fluxpos = []
// var c1 = []
// var c2 = []
// var c3 = []
// var c4 = []
// var c5 = []
// var c6 = []
// var c7 = []
// var c8 = []
// var c9 = []
// var c10 = []
// var c11 = []
// var batch = []

function clamp (num) {
	if (typeof num !== 'number' || isNaN(num)) return 0
		else if (num < 0) {
      return 0
    } else if (num > 1) {
      return 1
    } else {
      return Math.abs(num);
  }
}

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

var batch = []

udpPort.on("message", function (oscMsg) {
  var msg = oscMsg.args[0].value
	.split(',')
	.slice(3)
	.map(function (i) { return parseFloat(i); })
	if (!msg.length || !Array.isArray(msg)) return;

  msg.forEach(function (i) {
  if (batch.length < 82) batch.push(clamp(i))
  	else {
      // return console.log(batch)
      var output = network.activate(batch)
      console.log(output)
  	  batch = []
  	}
  })

  /*
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

  if (batch.length < 80) {
    batch.push(clamp(statistics(entropy).median /  statistics(entropy).maximum))
    batch.push(clamp(statistics(centroid).median /  statistics(centroid).maximum))
    batch.push(clamp(statistics(percentile).median / statistics(percentile).maximum))
    batch.push(clamp(statistics(crest).median / statistics(crest).maximum))
    batch.push(clamp(statistics(flatness).median / statistics(flatness).maximum))
    batch.push(clamp(statistics(slope).median / statistics(slope).maximum))
    batch.push(clamp(statistics(pitch).median / statistics(pitch).maximum))
    batch.push(clamp(statistics(peak).median / statistics(peak).maximum))
    batch.push(clamp(statistics(dissonance).median / statistics(dissonance).maximum))
    batch.push(clamp(statistics(c1).median / statistics(c1).maximum))
    batch.push(clamp(statistics(c2).median / statistics(c2).maximum))
    batch.push(clamp(statistics(c3).median / statistics(c3).maximum))
    batch.push(clamp(statistics(c4).median / statistics(c4).maximum))
    batch.push(clamp(statistics(c5).median / statistics(c5).maximum))
    batch.push(clamp(statistics(c6).median / statistics(c6).maximum))
    batch.push(clamp(statistics(c7).median / statistics(c7).maximum))
    batch.push(clamp(statistics(c8).median / statistics(c8).maximum))
    batch.push(clamp(statistics(c9).median/ statistics(c9).maximum))
    batch.push(clamp(statistics(c10).median / statistics(c10).maximum))
    batch.push(clamp(statistics(c11).median / statistics(c11).maximum))
  } else {
    var hasNAN = false
    batch.forEach(function (x) {
      if (isNaN(x)) hasNAN = true
    })
    if (hasNAN) return;
    var output = network.activate(batch)
    console.log(output)
    // var x = Math.round(parseFloat(output))
    // if (isNaN(x)) return console.log('>1 ', 0)
    //   else console.log('>2 ', x)
    batch = []
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
  }*/

})
udpPort.open()
