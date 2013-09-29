/*global define,d3 */
define(function (require, exports, module) {
    'use strict';

    /**
     * Create linear scale
     * @param config
     * @param {array} config.data
     * @param {array} config.range
     * @param {function} config.getValueFn
     * @returns {linear scale}
     */
    exports.create = function (config) {
        return d3.scale.linear()
            .range(config.range)
            .domain(d3.extent(config.data, config.getValueFn));
    };
});
