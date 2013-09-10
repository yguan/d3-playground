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
module.exports = {
    run: function () {
        'use strict';

        /*
         var data = [
         {
         'status': ['GOOD SERVICE', 'NORMAL'],
         'name': ['123'],
         'url': [null],
         'text': ['...'],
         'plannedworkheadline': [null],
         'Time': [' 7:35AM'],
         'Date': ['12/15/2011']
         }
         ];

         d3.select('body')
         .append('ul')
         .selectAll('li')
         .data(data)
         .enter()
         .append('li')
         .text(function (d) {
         return d.name + ': ' + d.status;
         });
         */

        var data = [
            {
                'count': 26774.09756097561,
                'id': 1,
                'name': 'Robert F. Kennedy Bridge Bronx Plaza'
            }
        ];

        d3.select('body')
            .append('div')
            .attr('class', 'chart')
            .selectAll('div.line')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'line');

        d3.selectAll('div.line')
            .append('div')
            .attr('class', 'label')
            .text(function (d) {
                return d.name;
            });

        d3.selectAll('div.line')
            .append('div')
            .attr('class', 'bar')
            .style('width', function (d) {
                return d.count / 100 + 'px';
            })
            .text(function (d) {
                return Math.round(d.count);
            });


        var collision = [
                {n: 2000},
                {n: 1500},
                {n: 4500}
            ],
            x_extent = d3.extent(collision, function (d) {
                return d.n;
            }),
            width = 350,
            height = 250,
            margin = 50,
            x_scale = d3.scale.linear()
                .range([margin, width - margin])
                .domain(x_extent),
            y_scale = d3.scale.linear()
                .range([margin, height - margin])
                .domain(x_extent),
            x_axis = d3.svg.axis().scale(x_scale),
            y_axis = d3.svg.axis().scale(y_scale).orient('left');

        d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .selectAll('circle')
            .data(collision)
            .enter()
            .append('circle')
            .attr('cx', function (d) {
                return x_scale(d.n);
            })
            .attr('cy', function (d) {
                return y_scale(d.n);
            })
            .attr('r', 5);

        d3.select('svg')
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (height - margin) + ')')
            .call(x_axis);

        d3.select('svg')
            .append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + margin + ', 0 )')
            .call(y_axis);

        d3.select('.x.axis')
            .append('text')
            .text('collisions with injury (per million miles)')
            .attr('x', (width / 2) - margin)
            .attr('y', margin / 1.5);

        d3.select('.y.axis')
            .append('text')
            .text('mean distance between failure (miles)')
            .attr('transform', 'rotate (-90, -43, 0) translate(-280)');
    }
};
