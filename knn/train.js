
var fs = require('fs')
var KNN = require('ml-knn')

var dir = fs.readdirSync('../batch')
var dataset = []
var predictions = []

dir.forEach(function (i, index) {
  var p = '../batch/' + i
  var label = parseInt(i.split('-')[0])
  var x = JSON.parse(fs.readFileSync(p).toString())
  dataset.push(x)
  predictions.push(label)
})

var knn = new KNN(dataset, predictions)

var model = knn.toJSON()

fs.writeFileSync('./model.json', JSON.stringify(model))
