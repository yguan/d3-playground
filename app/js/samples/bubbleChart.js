/*jslint nomen: true*/
/*global define,d3,_ */
define(function (require, exports, module) {
    'use strict';

    var bubbleChart = require('component/sample-bubble-chart');

    exports.run = function () {
        bubbleChart.create();
    };
});

