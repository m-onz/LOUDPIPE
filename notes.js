
/*
pipeline.

[pre processing phase]
[feature extraction phase]
[codebook clustering phase]
[training phase]
[predictions]

pipeline - BASIC

MFCC
train knn model
knn predictions
LSTM
NN

pipeline A. MFCC codebook

high pass
pre-emphasis
MFCC
VQ codebook
calcuate DTW distance for each point to codebook centroids
knn from distance vectors
prediction

pipeline B - refined feature selection
"
chromogram + feature set.
step foward feature selection
feature metrics
"


need for pipes. stream based library.

pluggable tranforms for each stage

streaming data sources.

reduce training time with pre-calcuated datasets.
or use smaller audio samples and generate from scratch *** dynamic experimentation


*/


function statistics (data) {
    var stats = {}
    var sum_of_squares = 0;
    var lower_quartile_index_1;
    var lower_quartile_index_2;
    data = data.sort(function(a, b){ return a - b });
    stats.count = data.length;
    stats.total = 0;
    for(let i = 0; i < stats.count; i++) {
        stats.total += data[i];
        sum_of_squares += Math.pow(data[i], 2);
    }
    stats.arithmetic_mean = stats.total / stats.count;
    if(is_even(stats.count)) {
        stats.median = (data[((stats.count) / 2) - 1] + data[stats.count / 2]) / 2;
        if(is_even(stats.count / 2)) {
            lower_quartile_index_1 = (stats.count / 2) / 2;
            lower_quartile_index_2 = lower_quartile_index_1 - 1;
            stats.lower_quartile = (data[lower_quartile_index_1] + data[lower_quartile_index_2]) / 2;
            stats.upper_quartile = (data[stats.count - 1 - lower_quartile_index_1] +
              data[stats.count - 1 - lower_quartile_index_2]) / 2;
        } else {
            lower_quartile_index_1 = ((stats.count / 2) - 1) / 2;
            stats.lower_quartile = data[lower_quartile_index_1];
            stats.upper_quartile = data[stats.count - 1 - lower_quartile_index_1];
        }
    } else {
        stats.median = data[((stats.count + 1) / 2) - 1];
        if(is_even((stats.count - 1) / 2)) {
            lower_quartile_index_1 = ((stats.count - 1) / 2) / 2;
            lower_quartile_index_2 = lower_quartile_index_1 - 1;
            stats.lower_quartile = (data[lower_quartile_index_1] + data[lower_quartile_index_2]) / 2;
            stats.upper_quartile = (data[stats.count - 1 - lower_quartile_index_1]
              + data[stats.count - 1 - lower_quartile_index_2]) / 2;
        } else {
            lower_quartile_index_1 = (((stats.count - 1) / 2) - 1) / 2;
            stats.lower_quartile = data[lower_quartile_index_1];
            stats.upper_quartile = data[stats.count - 1 - lower_quartile_index_1];
        }
    }
    stats.minimum = data[0];
    stats.maximum = data[stats.count - 1];
    stats.range = stats.maximum - stats.minimum;
    stats.inter_quartile_range = stats.upper_quartile - stats.lower_quartile;
    stats.variance_population = (sum_of_squares - ((Math.pow(stats.total, 2)) / stats.count)) / stats.count;
    stats.standard_deviation_population = Math.sqrt(stats.variance_population);
    stats.variance_sample = (sum_of_squares - ((Math.pow(stats.total, 2)) / stats.count)) / (stats.count - 1);
    stats.standard_deviation_sample = Math.sqrt(stats.variance_sample);
    stats.skew = (3.0 * (stats.arithmetic_mean - stats.median)) / stats.standard_deviation_population;
    return stats;
}


function is_even(n) {
    return n % 2 == 0;
}

var size = 128;
var data = [];

for (let i = 0; i < size; i++) {
    data[i] = parseInt(Math.random() * 500);
}

console.log (data);

let stats = statistics (data);

console.log (stats);

//
