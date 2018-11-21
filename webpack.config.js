const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rules = require('./build/webpack.rules.js');
const par = process.argv
const dev = par.includes('development');
const { extname } = require('path');
const minifyJs = require('uglify-es');
const CleanCSS = require('clean-css');
const minifyCss = new CleanCSS({});

module.exports = {
    performance: {
        maxAssetSize: 838860,
        maxEntrypointSize: 1048576
    },
    mode: dev ? 'development' : 'production',
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd', // 通用模块定义
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.html'],
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@serve': path.resolve(__dirname, 'src/serve'),
            '@node_modules': path.resolve(__dirname, 'node_modules'),
            '@load': path.resolve(__dirname, 'src/serve/load'),
            '@plugin': path.resolve(__dirname, 'static/plugin'),
            '@component': path.resolve(__dirname, 'src/component'),
            '@static': path.resolve(__dirname, 'static'),
        }
    },
    module: {
        rules
    },
    plugins: (() => {
        const arr = [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'static'),
                    to: 'static',
                    ignore: ['.*'],
                    transform: (content, path) => {
                        if (dev) {
                            return content;
                        }
                        const type = extname(path)
                        if (/\.js/.test(type)) {
                            const code = minifyJs.minify(content.toString()).code
                            if (!code) {
                                console.log('minifyJs error：-------------------：' + path)
                            }
                            return code || content
                        } else if (/\.css/.test(type)) {
                            const styles = minifyCss.minify(content.toString()).styles;
                            if (!styles) {
                                console.log('minifyCss error：-------------------：' + path)
                            }
                            return styles || content
                        }
                        return content;
                    }
                },
                {
                    from: path.resolve(__dirname, 'src/index.html'),
                    to: '',
                    ignore: ['.*'],
                    transform: (content, path) => {
                        if (dev) {
                            content = (content.toString()).replace(/dllscript/ig, 'script');
                        }
                        return content;
                    }
                }
            ])
        ]
        if (dev) {
            arr.push(new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./dist/vendor-manifest.json')
            }))
        }
        return arr;
    })()
};