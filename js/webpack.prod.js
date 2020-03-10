const merge = require('webpack-merge');
const common = require('./webpack.common.js');
/*const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');*/

module.exports = merge(common, {
    mode: 'production',
    entry: {
        intranetButton: ['./src/utils/polyfills.js','./src/intranetButton.js']
    },

});