define(function (require, exports, module) {
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
