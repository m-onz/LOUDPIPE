
var fs = require('fs')
var neataptic = require('neataptic')
//
var network = new neataptic.architect.LSTM(48, 48, 1)

var dataset = []
var dir = fs.readdirSync('./batch')
var dataset = []
var predictions = []

dir.forEach(function (i, index) {
  var p = './batch/' + i
  var label = parseInt(i.split('-')[0])
  var x = JSON.parse(fs.readFileSync(p).toString())
  dataset.push({ input: x, output: [label] })
})

network.train(dataset, {
  log: 1,
  iterations: 10000,
  error: 0.01,
  clear: true,
  rate: 0.01,
});

var model = network.toJSON()

fs.writeFileSync('./model.json', JSON.stringify(model))
