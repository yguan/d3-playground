/*global define,d3 */
define(function (require, exports, module) {
    'use strict';

    function getBarAttrs(barCls, barWidth, chartOrigin, xScale) {
        return {
            'class': barCls,
            x: function (d, i) {
                return chartOrigin.x + xScale(i);
            },
            y: function (d) {
                return chartOrigin.y - xScale(d);
            },
            width: barWidth,
            height: function (d) {
                return xScale(d);
            }
        };
    }

    function getLabelAttrs(labelCls, halfBarWidth, chartOrigin, labelY, xScale) {
        return {
            'class': labelCls,
            'text-anchor': 'middle',
            x: function (d, i) {
                return chartOrigin.x + xScale(i) + halfBarWidth;
            },
            y: labelY
        };
    }

    function update(scope, config) {
        var duration = config.transitionDuration || 300,
            chartOrigin = scope.chartOrigin,
            xScale = config.xScale,
            getValueFn = config.getValueFn;

        scope.bars
            .data(config.data)
            .transition()
            .duration(duration)
            .attr({
                height: function (d) {
                    return xScale(d);
                },
                y: function (d) {
                    return chartOrigin.y - xScale(d);
                }
            });

        scope.labels
            .data(config.data)
            .transition()
            .duration(duration)
            .text(function (d) {
                return getValueFn(d);
            });
    }

    function sort(scope, config, sortOrder) {
        var duration = config.transitionDuration || 300,
            chartOrigin = scope.chartOrigin,
            xScale = config.xScale,
            barWidth = xScale.rangeBand(),
            halfBarWidth = barWidth / 2,
            sortFn = function (a, b) {
                if (sortOrder.asc) {
                    return d3.ascending(a, b);
                }
                return d3.descending(a, b);
            };

        // todo: group the bar and label so that only need to sort once
        scope.bars
            .sort(sortFn)
            .transition()
            .duration(duration)
            .attr('x', function (d, i) {
                return chartOrigin.x + xScale(i);
            });

        scope.labels
            .sort(sortFn)
            .transition()
            .duration(duration)
            .attr('x', function (d, i) {
                return chartOrigin.x + xScale(i) + halfBarWidth;
            });
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
            halfBarWidth = barWidth / 2,
            labelY = chartOrigin.y - labelBottomPadding,
            bars,
            labels;

        // append bars
        bars = config.svg.selectAll('rect').data(config.data);


        bars.enter()
            .append('rect')
            .attr(getBarAttrs(config.barCls, barWidth, chartOrigin, xScale));

        // append labels
        labels = config.svg.selectAll('text').data(config.data);


        labels.enter()
            .append('text')
            .text(function (d) {
                return config.getValueFn(d);
            })
            .attr(getLabelAttrs(config.labelCls, halfBarWidth, chartOrigin, labelY, config.xScale));

        return {
            bars: bars,
            labels: labels,
            chartOrigin: chartOrigin,
            config: config,
            update: function (config) {
                update(this, config);
            },
            sort: function (sortOrder) {
                sort(this, config, sortOrder);
            }
        };
    };
});
