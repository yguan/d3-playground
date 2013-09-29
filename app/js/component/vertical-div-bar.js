/*global define,d3 */
define(function (require, exports, module) {
    'use strict';

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
        var getValueFn = function (d) {
                return config.valueKey ? d[config.valueKey] : d;
            },
            scale = linearScale.create({data: config.data, range: config.range, getValueFn: getValueFn});

        config.container
            .selectAll('div')
            .data(config.data)
            .enter()
            .append('div')
            .attr('class', config.barCls)
            .style('height', function (d) {
                return scale(config.valueKey ? d[config.valueKey] : d) + 'px';
            });
    };
});
