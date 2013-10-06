/*global require */

require.config({
    baseUrl: 'js',
    paths: {
        lib: './lib',
        data: './data',
        component: './component',
        extension: './extension',
        samples: './samples'
    }
});

require([
    'lib/d3',
    'lib/lodash.underscore',
    'extension/lodash.underscore'
], function () {
    'use strict';

    require([
        'samples/all-samples'
    ], function (samples) {
        samples.run();
    });
});

// python -m http.server
