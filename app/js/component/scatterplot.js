/*global define,d3 */
define(function (require, exports, module) {
    'use strict';

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
        // append bars
        config.svg.selectAll('circle')
            .data(config.data)
            .enter()
            .append('circle')
            .attr('class', config.dotCls)
            .attr('cx', function (d) {
                return config.xScale(d[0]);
            })
            .attr('cy', function (d) {
                return config.yScale(d[1]);
            })
            .attr('r', config.dotRadius);

        // append labels
        config.svg.selectAll('text')
            .data(config.data)
            .enter()
            .append('text')
            .text(function (d) {
                return d.join(', ');
            })
            .attr('font-family', 'sans-serif')
            .attr('font-size', '11px')
            .attr('fill', config.labelColor)
            .attr('x', function (d, i) {
                return config.xScale(d[0]) + config.dotRadius;
            })
            .attr('y', function (d) {
                return config.yScale(d[1]);
            });
    };

});
