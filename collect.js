
var fs = require('fs')
var osc = require('osc')
var LABEL = 0
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57111,
    metadata: true
})
var batch = []
udpPort.on("message", function (oscMsg) {
  var msg = oscMsg.args[0].value
	.split(',')
	.slice(3)
	.map(function (i) { return parseFloat(i); })
	if (!msg.length || !Array.isArray(msg)) return;
  console.log(msg)
})
udpPort.open()
