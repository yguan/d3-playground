define(function (require, exports, module) {

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
     * @param {array} config.xRange
     * @param {array} config.yRange
     */
    exports.create = function (config) {
        var xExtend = d3.extent(config.data, function (d) {
                return d[0];
            }),
            yExtend = d3.extent(config.data, function (d) {
                return d[1];
            }),
            xScale = d3.scale.linear()
                .domain(xExtend)
                .range(config.xRange),
            yScale = d3.scale.linear()
                .domain(yExtend)
                .range(config.yRange),
            chartOrigin = {
                x: config.x || 0,
                y: config.y || config.height
            };

        // append bars
        config.svg.selectAll('circle')
            .data(config.data)
            .enter()
            .append('circle')
            .attr('class', config.dotCls)
            .attr('cx', function (d) {
                return xScale(d[0]);
            })
            .attr('cy', function (d) {
                return yScale(d[1]);
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
                return xScale(d[0]) + config.dotRadius;
            })
            .attr('y', function (d) {
                return yScale(d[1]);
            });
    };

});
