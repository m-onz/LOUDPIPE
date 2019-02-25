
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

var batch = []
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

udpPort.on("message", function (oscMsg) {
  var msg = oscMsg.args[0].value
	.split(',')
	.slice(3)
	.map(function (i) { return parseFloat(i); })
	if (!msg.length || !Array.isArray(msg)) return;
  msg.forEach(function (i) {
  if (batch.length < 82) batch.push(clamp(i))
  	else {
	    // fs.writeFileSync('./batch/'+LABEL+'-'+Date.now()+'.json', JSON.stringify(batch))
      var ans = predict(batch)
      console.log(ans)
  	  batch = []
  	}
  })
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
  var THRESHOLD = 2.9;
  var match = result.sort(function (a, b) { return b.distance - a.distance }).reverse()[0]
  if (!match) return 0
  if (debug) console.log('distance ', match.distance)
  if (match && match.distance < THRESHOLD) {
    return 1
  } else {
    return 0
  }
}
