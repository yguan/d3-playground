/*global define,d3 */
define(function (require, exports, module) {
    'use strict';

    var linearScale = require('component/linear-scale');

    /**
     * Create horizontal bars with div
     * @param config
     * @param {String} config.container
     * @param {String} config.barCls
     * @param {String} config.barLabelCls
     * @param {String} config.data
     * @param {String} config.valueKey
     * @param {String} config.labelKey
     * @param {String} config.range
     */
    exports.create = function (config) {
        var getValueFn = function (d) {
                return config.valueKey ? d[config.valueKey] : d;
            },
            scale = linearScale.create({data: config.data, range: config.range, getValueFn: getValueFn}),
            lines = config.container
                .selectAll('div.line')
                .data(config.data);

        lines.enter()
            .append('div')
            .attr('class', 'line');

        lines.append('div')
            .attr('class', config.barLabelCls)
            .text(function (d) {
                return config.labelKey ? d[config.labelKey] : d;
            });

        lines.append('div')
            .attr('class', config.barCls)
            .style('width', function (d) {
                return scale(config.valueKey ? d[config.valueKey] : d) + 'px';
            })
            .text(function (d) {
                return Math.round(config.valueKey ? d[config.valueKey] : d);
            });
    };
});


