define(function(require, exports, module) {

    var linearScale = require('component/linear-scale');

    /**
     * Create vertical bars with div
     * @param config
     * @param {String} config.container
     * @param {String} config.barCls
     * @param {String} config.data
     * @param {String} config.valueKey
     * @param {String} config.range
     */
    exports.create = function (config) {
        var scale = linearScale.create(config.data, config.valueKey, config.range);

        config.container
            .data(config.data)
            .enter()
            .append('div')
            .attr('class', config.barCls)
            .style('height', function (d) {
                return scale(config.valueKey ? d[config.valueKey] : d) + 'px';
            });
    };
});
