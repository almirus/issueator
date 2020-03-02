const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(common, {
    mode: 'production',
    entry: {
        index: ['./src/utils/polyfills.js','./src/helper.js']
    },
    plugins: [
        new BundleAnalyzerPlugin(),
    ]
});