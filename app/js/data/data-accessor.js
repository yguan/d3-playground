/*global define */
define(function (require, exports, module) {
    'use strict';

    function getValue(data, valueKey) {
        return valueKey ? data[valueKey] : data;
    }

    exports.create = function (valueKey) {
        return {
            getValue: function (data) {
                return getValue(data, valueKey);
            }
        };
    };
});
