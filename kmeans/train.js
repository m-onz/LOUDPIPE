var fs = require('fs');
var DynamicTimeWarping = require('dynamic-time-warping');
var clustering = require('density-clustering');

var kmeans = new clustering.KMEANS();
var dir = fs.readdirSync('../batch')
var dataset = []

var distFunc = function(a, b) {
    return Math.abs(a - b);
}

dir.forEach(function (i, index) {
  var p = '../batch/' + i
  var label = parseInt(i.split('-')[0])
  if (parseInt(label) !== 1) return
  var x = JSON.parse(fs.readFileSync(p).toString())
  dataset.push(x)
})

var clusters = kmeans.run(dataset, 12);

var result = []

clusters.forEach(function (cluster, index) {
  // if (!Array.isArray(cluster) && cluster.length < 1) return cluster[index] = [];
  // var center = dataset[cluster[Math.round(cluster.length/2)]]
  // result.push(dataset[cluster[0]])
  // if (center) result.push(center)
  if (Array.isArray(cluster)) result.push(dataset[cluster])
})

console.log(result)

fs.writeFileSync('./codebook.json', JSON.stringify(result, null, 2))
