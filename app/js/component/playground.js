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
        hBars = require('component/horizontal-div-bar');

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
            data: [ 5, 10, 15, 20, 25 ],
            range: [0, 100]
        });
    };
});

