const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    port: 4000,
    host: 'localhost',
    watchOptions: { poll: true },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
