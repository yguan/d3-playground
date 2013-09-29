/*global define,d3 */
define(function (require, exports, module) {
    'use strict';

    var linearScale = require('component/linear-scale'),
        dataAccessor = require('data/data-accessor');

    /**
     * Create vertical bars with div
     * @param config
     * @param {String} config.svg
     * @param {String} config.barPadding
     * @param {int} config.height
     * @param {int} config.width
     * @param {int} config.x
     * @param {int} config.width
     * @param {int} config.labelColor
     * @param {int} config.labelBottomPadding
     * @param {array} config.data
     * @param {String} config.valueKey
     * @param {array} config.range
     */
    exports.create = function (config) {
        var getValueFn = function (d) {
                return config.valueKey ? d[config.valueKey] : d;
            },
            scale = linearScale.create({data: config.data, range: config.range, getValueFn: getValueFn}),
            chartOrigin = {
                x: config.x || 0,
                y: config.y || config.height
            },
            dataLength = config.data.length,
            valueAccessor = dataAccessor.create(config.valueKey);

        // append bars
        config.svg.selectAll('rect')
            .data(config.data)
            .enter()
            .append('rect')
            .attr({
                x: function (d, i) {
                    return chartOrigin.x + i * (config.width / dataLength);
                },
                y: function (d) {
                    return chartOrigin.y - scale(valueAccessor.getValue(d));
                },
                width: config.width / dataLength - config.barPadding,
                height: function (d) {
                    return scale(valueAccessor.getValue(d));
                },
                fill: function (d) {
                    return 'rgb(200, 250, ' + scale(valueAccessor.getValue(d)) * 2 + ')';
                }
            });

        // append labels
        config.svg.selectAll('text')
            .data(config.data)
            .enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .text(function (d) {
                return valueAccessor.getValue(d);
            })
            .attr('font-family', 'sans-serif')
            .attr('font-size', '11px')
            .attr('fill', config.labelColor)
            .attr('x', function (d, i) {
                return i * (config.width / dataLength) + (config.width / dataLength - config.barPadding) / 2;
            })
            .attr('y', function (d) {
                return chartOrigin.y - config.labelBottomPadding;
            });
    };

});
