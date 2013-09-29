/*global define,d3 */
define(function (require, exports, module) {
    'use strict';

    /**
     * Create vertical bars with svg and ordinal scale
     * @param config
     * @param {String} config.svg
     * @param {int} config.height
     * @param {int} config.width
     * @param {int} config.x
     * @param {int} config.y
     * @param {int} config.width
     * @param {int} config.barCls
     * @param {int} config.labelCls
     * @param {int} config.labelBottomPadding
     * @param {array} config.data
     * @param {function} config.xScale
     * @param {function} config.getValueFn
     */
    exports.create = function (config) {
        var chartOrigin = {
                x: config.x || 0,
                y: config.y || config.height
            },
            labelBottomPadding = config.labelBottomPadding || 0,
            barWidth = config.xScale.rangeBand();

        // append bars
        config.svg.selectAll('rect')
            .data(config.data)
            .enter()
            .append('rect')
            .attr('class', config.barCls)
            .attr({
                x: function (d, i) {
                    return chartOrigin.x + config.xScale(i);
                },
                y: function (d) {
                    return chartOrigin.y - config.xScale(d);
                },
                width: barWidth,
                height: function (d) {
                    return config.xScale(d);
                }
            });

        // append labels
        config.svg.selectAll('text')
            .data(config.data)
            .enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .text(function (d) {
                return config.getValueFn(d);
            })
            .attr('class', config.labelCls)
            .attr('x', function (d, i) {
                return chartOrigin.x + config.xScale(i) + config.xScale.rangeBand() / 2;
            })
            .attr('y', function (d) {
                return chartOrigin.y - labelBottomPadding;
            });
    };

});
