const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PropertiesReader = require('properties-reader');
let properties = PropertiesReader('../src/main/resources/application.properties');
module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /const\.js$/,
                loader: 'string-replace-loader',
                options: {
                    search: 'helper',
                    replace: properties.get('jira.issue.project.key'),
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: {source: false}
        }),
    ],
};
console.warn(process.env.NODE_ENV);
