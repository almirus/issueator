const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        index: ['./src/utils/polyfills.js','./src/helper.js']
    },
});