/*global require */

require.config({
    baseUrl: 'js',
    paths: {
        lib: './lib',
        data: './data',
        component: './component',
        extension: './extension'
    }
});

require([
    'lib/d3',
    'lib/lodash.underscore',
    'extension/lodash.underscore'
], function () {
    'use strict';

    require([
        'component/playground'
    ], function (playground) {
        playground.run();
    });
});

// python -m http.server
