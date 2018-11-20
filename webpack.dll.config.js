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
            'bootstrap/dist/css/bootstrap.css',
            'bootstrap-dialog',
            'bootstrap-table',
            'bootstrap-table/dist/bootstrap-table.min.css',
            'bootstrap-table/dist/locale/bootstrap-table-zh-CN',

            './static/plugin/datetimepicker/bootstrap-datetimepicker',
            './static/plugin/datetimepicker/bootstrap-datetimepicker.zh-CN',
            './static/plugin/datetimepicker/bootstrap-datetimepicker.min.css',

            './static/plugin/bootstrapvalidator_v0.5.3/bootstrapValidator',

            './static/plugin/fileinput/css/fileinput.min.css',
            './static/plugin/fileinput/fileinput',
            './static/plugin/fileinput/zh',

            './static/plugin/zTree_v3.5.37/zTreeStyle.css',
            './static/plugin/zTree_v3.5.37/js/jquery.ztree.core',
            './static/plugin/zTree_v3.5.37/js/jquery.ztree.exedit'

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