const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const cp = require('child_process');
const config = require('../webpack.config.js');
const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);
const port = 15587;
server.listen(port, 'localhost', () => {
    const url = 'http://localhost:' + port;
    cp.exec('start ' + url);
});