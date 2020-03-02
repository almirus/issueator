const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    mode: 'production',
    entry: {
        index: ['./src/utils/polyfills.js','./src/helper.js']
    },
});