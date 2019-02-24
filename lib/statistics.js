
module.exports = function statistics (data) {
    function is_even(n) {
        return n % 2 == 0;
    }
    var stats = {}
    data = data.sort(function(a, b){ return a - b });
    stats.count = data.length;
    if(is_even(stats.count)) {
        stats.median = (data[((stats.count) / 2) - 1] + data[stats.count / 2]) / 2;
    } else {
        stats.median = data[((stats.count + 1) / 2) - 1];
    }
    stats.maximum = data[stats.count - 1];
    return stats;
}
