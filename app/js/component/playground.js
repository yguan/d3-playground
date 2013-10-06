/*jslint nomen: true*/
/*global define,d3,_ */
define(function (require, exports, module) {
    'use strict';

    var linearScale = require('component/linear-scale'),
        bubbleChart = require('component/sample-bubble-chart'),
        vBars = require('component/vertical-div-bar'),
        hBars = require('component/horizontal-div-bar'),
        svgVBar = require('component/svg-vertical-bar'),
        scatterplot = require('component/scatterplot-updatable'),
        axis = require('component/axis'),
        vbars = require('component/vbars-updatable'),
        hBarsData = [
            {
                'count': 2677,
                'name': 'Robert F. Kennedy Bridge Bronx Plaza'
            },
            {
                'count': 560,
                'name': 'Robert'
            },
            {
                'count': 1345,
                'name': 'something else'
            }
        ],
        vBarData = [ 5, 10, 15, 20, 25 ],
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

    function createHBars() {
        hBars.create({
            container: d3.select('body').append('div').attr('class', 'chart'),
            barCls: 'hbar',
            barLabelCls: 'hbar-label',
            data: hBarsData,
            labelKey: 'name',
            valueKey: 'count',
            range: [50, 200]
        });
    }

    function createDivVBars() {
        vBars.create({
            container: d3.select('body').append('div'),
            barCls: 'teal-vbar',
            data: vBarData,
            range: [0, 100]
        });
    }

    function createSvgVBars() {
        svgVBar.create({
            svg: d3.select('body').append('svg').attr('width', '200px').attr('height', '150px'),
            barPadding: 2,
            height: 150,
            width: 200,
            labelColor: 'black',
            labelBottomPadding: 5,
            data: vBarData,
            range: [20, 150]
        });
    }

    function createScatterplot() {
        var axisRegionWidth = 30,
            height = 200,
            width = 300,
            svg = d3.select('#svgCollections').append('svg').attr('width', width + 'px').attr('height', height + 'px'),
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

    function createScatterplotUpdatable() {
        var axisRegionWidth = 30,
            height = 200,
            width = 300,
            svg = d3.select('#svgCollections').append('svg').attr('width', width + 'px').attr('height', height + 'px'),
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

    function createVbars() {
        var height = 200,
            width = 300,
            svg = d3.select('#svgCollections').append('svg').attr('width', width + 'px').attr('height', height + 'px'),
            xRange = [0, width],
            xScale = d3.scale.ordinal()
                .domain(d3.range(vBarData.length))
                .rangeRoundBands(xRange, 0.1),
            getValueFn = function (d) {
                return d;
            },
            vbarsInstance,
            sortOrder = {
                asc: true
            };

        vbarsInstance = vbars.create({
            svg: svg,
            height: height,
            width: width,
            labelCls: 'vbar-label',
            barCls: 'yellowish-fill',
            labelBottomPadding: 10,
            data: vBarData,
            xScale: xScale,
            getValueFn: getValueFn
        });

        svg.on('click', function () {
            sortOrder.asc = !sortOrder.asc;
            vbarsInstance.sort(sortOrder);
        });
    }

    function createUpdatableVbars() {
        var height = 200,
            width = 300,
            svg = d3.select('#svgCollections').append('svg').attr('width', width + 'px').attr('height', height + 'px'),
            xRange = [0, width],
            xScale = d3.scale.ordinal()
                .domain(d3.range(vBarData.length))
                .rangeRoundBands(xRange, 0.1),
            getValueFn = function (d) {
                return d;
            },
            vbarsInstance,
            newData = _.clone(vBarData);

        vbarsInstance = vbars.create({
            svg: svg,
            height: height,
            width: width,
            labelCls: 'vbar-label',
            barCls: 'yellowish-fill',
            labelBottomPadding: 10,
            data: vBarData,
            xScale: xScale,
            getValueFn: getValueFn
        });

        svg.on('click', function () {
            _.each(newData, function (d, i) {
                newData[i] = (d + 11) % 30;
            });
            vbarsInstance.update({
                data: newData,
                xScale: xScale,
                transitionDuration: 500,
                getValueFn: getValueFn
            });
        });
    }

    exports.run = function () {
        createUpdatableVbars();
        createVbars();
        createScatterplotUpdatable();
        createScatterplot();
        createSvgVBars();
        bubbleChart.create();
        createHBars();
        createDivVBars();
    };
});

