'use strict';

const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');
const config = require('config');

module.exports = {
  resolve: { alias: { src: path.resolve(__dirname, 'src') } },
  entry: ['./src/index.js'],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({ patterns: [{ from: './assets', to: './' }] }),
    new webpack.DefinePlugin({ CONFIG: JSON.stringify(config) }),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
  },
};
