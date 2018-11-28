const setting = require('./port.json');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const cp = require('child_process');
const config = require('../webpack.config.js');
const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
};
const port = setting.port;
webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);
server.listen(port, 'localhost', () => {
    const url = 'http://localhost:' + port;
    cp.exec('start ' + url);
});