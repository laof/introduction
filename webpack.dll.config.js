/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const rules = require('./build/webpack.rules.js');
const library = '[name]_[hash]';
module.exports = {
    performance: {
        maxAssetSize: 10485760,
        maxEntrypointSize: 10485760
    },
    entry: {
        vendor: [
            'jquery',
            'bootstrap',
            'bootstrap/dist/css/bootstrap.css'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].dll.js',
        library
    },
    module: {
        rules
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dist', '[name]-manifest.json'),
            name: library,
            context: __dirname
        })
    ]
}