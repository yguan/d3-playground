/*jslint nomen: true*/
/*global define,d3,_ */
define(function (require, exports, module) {
    'use strict';

    var divVBars = require('component/vertical-div-bar'),
        svgVBar = require('component/svg-vertical-bar'),
        vbars = require('component/vbars-updatable'),
        vBarData = [ 5, 10, 15, 20, 25 ];

    function createDivVBars(container) {
        divVBars.create({
            container: container.append('div'),
            barCls: 'teal-vbar',
            data: vBarData,
            range: [0, 100]
        });
    }

    function createSvgVBars(container) {
        svgVBar.create({
            svg: container.append('svg').attr('width', '200px').attr('height', '150px'),
            barPadding: 2,
            height: 150,
            width: 200,
            labelColor: 'black',
            labelBottomPadding: 5,
            data: vBarData,
            range: [20, 150]
        });
    }

    function createVbars(container) {
        var height = 200,
            width = 300,
            svg = container.append('svg').attr('width', width + 'px').attr('height', height + 'px'),
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

    function createUpdatableVbars(container) {
        var height = 200,
            width = 300,
            svg = container.append('svg').attr('width', width + 'px').attr('height', height + 'px'),
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
        var container = d3.select('body').append('div');
        createUpdatableVbars(container);
        createVbars(container);
        createSvgVBars(container);
        createDivVBars(container);
    };
});

