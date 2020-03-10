const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        intranetButton: ['./src/utils/polyfills.js','./src/intranetButton.js']
    },
});