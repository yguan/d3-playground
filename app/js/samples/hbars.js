/*jslint nomen: true*/
/*global define,d3,_ */
define(function (require, exports, module) {
    'use strict';

    var hbars = require('component/horizontal-div-bar'),
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
        ];

    function createHBars(container) {
        hbars.create({
            container: container.append('div').attr('class', 'chart'),
            barCls: 'hbar',
            barLabelCls: 'hbar-label',
            data: hBarsData,
            labelKey: 'name',
            valueKey: 'count',
            range: [50, 200]
        });
    }

    exports.run = function () {
        var container = d3.select('body').append('div');
        createHBars(container);
    };
});

