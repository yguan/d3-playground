/*global d3 */
/*
 var sampleSVG = d3.select('#viz')
 .append('svg')
 .attr('width', 100)
 .attr('height', 100);

 sampleSVG.append('circle')
 .style('stroke', 'gray')
 .style('fill', 'white')
 .attr('r', 40)
 .attr('cx', 50)
 .attr('cy', 50)
 .on('mouseover', function(){d3.select(this).style('fill', 'aliceblue');})
 .on('mouseout', function(){d3.select(this).style('fill', 'white');});
 */
define(function (require, exports, module) {
    var bubbleChart = require('component/sample-bubble-chart'),
        vBars = require('component/vertical-div-bar'),
        hBars = require('component/horizontal-div-bar'),
        svgVBar = require('component/svg-vertical-bar'),
        scatterplot = require('component/scatterplot');

    exports.run = function () {
        'use strict';

        bubbleChart.create();

        var hBarsData = [
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
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
            ];

        hBars.create({
            container: d3.select('body').append('div').attr('class', 'chart'),
            barCls: 'hbar',
            barLabelCls: 'hbar-label',
            data: hBarsData,
            labelKey: 'name',
            valueKey: 'count',
            range: [50, 200]
        });

        vBars.create({
            container: d3.select('body').append('div'),
            barCls: 'teal-vbar',
            data: vBarData,
            range: [0, 100]
        });

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

        scatterplot.create({
            svg: d3.select('body').append('svg').attr('width', '200px').attr('height', '150px'),
            height: 150,
            width: 200,
            dotCls: 'defaultCircle',
            labelColor: 'black',
            dotRadius: 10,
            data: scatterplotData,
            xRange: [0, 200],
            yRange: [0, 150]
        });

    };
});

