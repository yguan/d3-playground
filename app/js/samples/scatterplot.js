/*jslint nomen: true*/
/*global define,d3,_ */
define(function (require, exports, module) {
    'use strict';

    var linearScale = require('component/linear-scale'),
        scatterplot = require('component/scatterplot-updatable'),
        axis = require('component/axis'),
        scatterplotData = [
            [5, 20],
            [480, 90],
            [250, 50],
            [100, 33],
            [330, 95],
            [410, 12],
            [475, 44],
            [25, 67],
            [85, 21],
            [220, 88]
        ];

    function createScatterplot(container) {
        var axisRegionWidth = 30,
            height = 200,
            width = 300,
            svg = container.append('svg').attr('width', width + 'px').attr('height', height + 'px'),
            xRange = [axisRegionWidth, 300],
            yRange = [0, height - axisRegionWidth],
            xScale = linearScale.create({data: scatterplotData, range: xRange, getValueFn: function (d) {
                return d[0];
            }}),
            yScale = linearScale.create({data: scatterplotData, range: yRange, getValueFn: function (d) {
                return d[1];
            }}),
            scatterplotInstance;

        scatterplotInstance = scatterplot.create({
            svg: svg,
            height: 150,
            width: 200,
            dotCls: 'defaultCircle',
            labelColor: 'black',
            dotRadius: 10,
            data: scatterplotData,
            xScale: xScale,
            yScale: yScale
        });

        axis.create({
            svg: svg,
            translate: [0, height - axisRegionWidth],
            range: xRange,
            scale: xScale,
            orient: 'bottom',
            ticks: 5
        });

        axis.create({
            svg: svg,
            translate: [axisRegionWidth, 0],
            range: yRange,
            scale: yScale,
            orient: 'left'
        });

        svg.on('click', function () {
            var x = -10,
                y = 300,
                duration = 1000;

            // remove data point one-by-one
            scatterplotData.shift();

            scatterplotInstance.circles
                .data(scatterplotData)
                .exit()
                .transition()
                .duration(duration)
                .attr('cx', x)
                .attr('cy', y)
                .remove();

            scatterplotInstance.labels
                .data(scatterplotData)
                .exit()
                .transition()
                .duration(duration)
                .attr('x', x)
                .attr('y', y)
                .remove();

            // remove all data points at once
//            scatterplotInstance.circles
//                .transition()
//                .duration(1000)
//                .attr('cx', -10)
//                .attr('cy', 300)
//                .remove();
//
//            scatterplotInstance.labels
//                .transition()
//                .duration(1000)
//                .attr('x', -10)
//                .attr('y', 300)
//                .remove();
        });
    }

    function createScatterplotUpdatable(container) {
        var axisRegionWidth = 30,
            height = 200,
            width = 300,
            svg = container.append('svg').attr('width', width + 'px').attr('height', height + 'px'),
            xRange = [axisRegionWidth, 300],
            yRange = [0, height - axisRegionWidth],
            xScale = linearScale.create({data: scatterplotData, range: xRange, getValueFn: function (d) {
                return d[0];
            }}),
            yScale = linearScale.create({data: scatterplotData, range: yRange, getValueFn: function (d) {
                return d[1];
            }}),
            xAxis,
            yAxis,
            scatterplotInstance;

        scatterplotInstance = scatterplot.create({
            svg: svg,
            height: 150,
            width: 200,
            dotCls: 'defaultCircle',
            labelColor: 'black',
            dotRadius: 10,
            data: scatterplotData,
            xScale: xScale,
            yScale: yScale
        });

        xAxis = axis.create({
            svg: svg,
            translate: [0, height - axisRegionWidth],
            range: xRange,
            scale: xScale,
            orient: 'bottom',
            ticks: 5
        });

        yAxis = axis.create({
            svg: svg,
            translate: [axisRegionWidth, 0],
            range: yRange,
            scale: yScale,
            orient: 'left'
        });

        svg.on('click', function () {
            var maxX = Math.random() * 500,
                maxY = Math.random() * 200;
            _.each(scatterplotData, function (d, i) {
                scatterplotData[i][0] = Math.floor((d[0] + 11) % maxX);
                scatterplotData[i][1] = Math.floor((d[1] + 11) % maxY);
            });

            // update scale
            xScale.domain([0, maxX]);
            yScale.domain([0, maxY]);

            // update axes
            xAxis.update();
            yAxis.update();

            scatterplotInstance.update({
                data: scatterplotData,
                xScale: xScale,
                yScale: yScale,
                transitionDuration: 500,
                dotRadius: 10
            });
        });

        // update scale
        //yScale.domain([minY, maxY]);
    }

    exports.run = function () {
        var container = d3.select('body').append('div');
        createScatterplotUpdatable(container);
        createScatterplot(container);
    };
});

