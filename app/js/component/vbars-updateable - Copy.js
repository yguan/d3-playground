/*global define,d3 */
define(function (require, exports, module) {
    'use strict';

    function getBarAttrs(barConfig) {
        return {
            'class': barConfig.barCls,
            x: function (d, i) {
                return barConfig.origin.x + barConfig.xScale(i);
            },
            y: function (d) {
                return barConfig.origin.y - barConfig.xScale(d);
            },
            width: barConfig.barWidth,
            height: function (d) {
                return barConfig.xScale(d);
            }
        };
    }

    function getLabelAttrs(labelConfig) {
        return {
            'class': labelConfig.labelCls,
            'text-anchor': 'middle',
            x: function (d, i) {
                return labelConfig.x + labelConfig.xScale(i) + labelConfig.halfBarWidth;
            },
            y: labelConfig.y
        };
    }

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
            xScale = config.xScale,
            labelBottomPadding = config.labelBottomPadding || 0,
            barWidth = xScale.rangeBand(),
            barConfig = {
                barCls: config.barCls,
                barWidth: barWidth,
                origin: chartOrigin,
                xScale: xScale
            },
            labelConfig = {
                x: chartOrigin.x,
                y: chartOrigin.y - labelBottomPadding,
                labelCls: config.labelCls,
                halfBarWidth: barWidth / 2,
                xScale: config.xScale
            },
            bars,
            labels;

        // append bars
        bars = config.svg.selectAll('rect').data(config.data);

        bars.enter()
            .append('rect')
            .attr(getBarAttrs(barConfig));

        // append labels
        labels = config.svg.selectAll('text').data(config.data);

        labels.enter()
            .append('text')
            .text(function (d) {
                return config.getValueFn(d);
            })
            .attr(getLabelAttrs(labelConfig));

        return {
            bars: bars,
            labels: labels
        };
    };

    exports.update = function (config) {

    };
});
