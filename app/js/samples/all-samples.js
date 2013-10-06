/*jslint nomen: true*/
/*global define,d3,_ */
define(function (require, exports, module) {
    'use strict';

    var vbarsSamples = require('samples/vbars'),
        scatterplotSamples = require('samples/scatterplot'),
        hbarsSamples = require('samples/hbars'),
        bubbleChartSamples = require('samples/bubbleChart');

    exports.run = function () {
        scatterplotSamples.run();
        vbarsSamples.run();
        hbarsSamples.run();
        bubbleChartSamples.run();
    };
});

