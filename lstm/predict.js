
var osc = require('osc')
var fs = require('fs')
var neataptic = require('neataptic')
var network = new neataptic.Network.fromJSON(JSON.parse(fs.readFileSync('./model.json').toString()))
var osc = require('osc')
var fs = require('fs')

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
  if (batch.length < 46) batch.push(clamp(i))
  	else {
      var ans = network.activate(batch)
      console.log(ans)
  	  batch = []
  	}
  })
})

udpPort.open()
