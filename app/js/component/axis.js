/*global define,d3 */
define(function (require, exports, module) {
    'use strict';

    function update(scope, config) {
        var duration = (config && config.transitionDuration) || 300;

        scope.svgAxis
            .transition()
            .duration(duration)
            .call(scope.axis);
    }

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
     * @returns {{svgAxis: *}}
     */
    exports.create = function (config) {
        var translate = config.translate || [0, 0],
            axis = d3.svg.axis().scale(config.scale).orient(config.orient),
            svgAxis;

        if (config.ticks) {
            axis.ticks(config.ticks);
        }

        if (config.tickFormat) {
            axis.tickFormat(d3.format(config.tickFormat));
        }

        svgAxis = config.svg.append('g')
            .attr('class', config.cls || 'axis')
            .attr('transform', 'translate(' + translate.join(',') + ')')
            .call(axis);

        return {
            axis: axis,
            svgAxis: svgAxis,
            update: function (config) {
                update(this, config);
            }
        };
    };
});
