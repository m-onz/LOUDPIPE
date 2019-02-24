

module.exports = function statistics (data) {
    function is_even(n) {
        return n % 2 == 0;
    }
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
