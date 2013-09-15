define(function (require, exports, module) {
    /**
     * Create linear scale
     * @param data
     * @param valueKey
     * @param range
     * @returns {linear scale}
     */
    exports.create = function (data, valueKey, range) {
        var extent = d3.extent(data, function (d) {
            return valueKey ? d[valueKey] : d;
        });
        return d3.scale.linear()
            .range(range)
            .domain(extent);
    };
});
