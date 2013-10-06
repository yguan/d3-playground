/*global define,d3 */
define(function (require, exports, module) {
    'use strict';

    function getLabelPositionAttrs(xScale, yScale, xShifting) {
        return {
            x: function (d, i) {
                return xScale(d[0]) + xShifting;
            },
            y: function (d, i) {
                return yScale(d[1]);
            }
        };
    }

    function getCirclePositionAttrs(xScale, yScale, dotRadius) {
        return {
            cx: function (d, i) {
                return xScale(d[0]) + dotRadius;
            },
            cy: function (d, i) {
                return yScale(d[1]);
            },
            r: dotRadius
        };
    }

    function update(scope, config) {
        var duration = config.transitionDuration || 300,
            labelXShifting = config.dotRadius * 2;

        scope.circles
            .data(config.data)
            .transition()
            .duration(duration)
            .attr(getCirclePositionAttrs(config.xScale, config.yScale, config.dotRadius));

        scope.labels
            .data(config.data)
            .transition()
            .duration(duration)
            .attr(getLabelPositionAttrs(config.xScale, config.yScale, labelXShifting))
            .text(function (d) {
                return d.join(', ');
            });
    }

    /**
     * Create vertical bars with div
     * @param config
     * @param {String} config.svg
     * @param {String} config.barPadding
     * @param {int} config.height
     * @param {int} config.width
     * @param {int} config.x
     * @param {int} config.y
     * @param {int} config.dotRadius
     * @param {int} config.dotCls
     * @param {int} config.labelColor
     * @param {array} config.data
     * @param {array} config.xScale
     * @param {array} config.yScale
     */
    exports.create = function (config) {
        var chartOrigin = {
                x: config.x || 0,
                y: config.y || config.height
            },
            circles,
            labels,
            labelXShifting = config.dotRadius * 2;

        // append bars
        circles = config.svg.selectAll('circle').data(config.data);

        circles.enter()
            .append('circle')
            .attr('class', config.dotCls)
            .attr(getCirclePositionAttrs(config.xScale, config.yScale, config.dotRadius));

        // append labels
        labels = config.svg.selectAll('text').data(config.data);

        labels.enter()
            .append('text')
            .text(function (d) {
                return d.join(', ');
            })
            .attr('font-family', 'sans-serif')
            .attr('font-size', '11px')
            .attr('fill', config.labelColor)
            .attr(getLabelPositionAttrs(config.xScale, config.yScale, labelXShifting));


        return {
            circles: circles,
            labels: labels,
            update: function (config) {
                update(this, config);
            }
        };
    };

});
