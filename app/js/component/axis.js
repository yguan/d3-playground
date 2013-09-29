/*global define,d3 */
define(function (require, exports, module) {
    'use strict';

    /**
     * Create axis for chart
     * @param config
     * @param {object} config.svg
     * @param {function} config.scale
     * @param {string} config.orient
     * @param {array} config.translate [x,y]
     * @param {string} config.cls
     * @param {int} config.ticks
     * @param {string} config.tickFormat
     * @returns {axis}
     */
    exports.create = function (config) {
        var translate = config.translate || [0, 0],
            axis = d3.svg.axis()
                .scale(config.scale)
                .orient(config.orient);

        if (config.ticks) {
            axis.ticks(config.ticks);
        }

        if (config.tickFormat) {
            axis.tickFormat(d3.format(config.tickFormat));
        }

        config.svg.append('g')
            .attr('class', config.cls || 'axis')
            .attr('transform', 'translate(' + translate.join(',') + ')')
            .call(axis);
    };
});
