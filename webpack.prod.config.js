'use strict'

const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackZipPlugin = require('webpack-zip-plugin');
const config = require("config");

module.exports = {
    mode: 'production',
    resolve: { alias: { src: path.resolve(__dirname, 'src') } },
    entry: ['./src/index.js'],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyPlugin([{ from: './assets', to: './' }]),
        new webpack.DefinePlugin({ CONFIG: JSON.stringify(config) }),
        new WebpackZipPlugin({
            initialFile: './dist/',
            endPath: './dist',
            zipName: 'mtgBuilder.zip',
        }),
    ]
};
