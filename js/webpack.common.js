const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/*const PropertiesReader = require('properties-reader');
let properties = PropertiesReader('../src/main/resources/application.properties');*/

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
        /*  {// заменяем elements_prefix на значение из application.properties в константах для вывода в DOM
                test: /const\.js|.+\.css$/,
                loader: 'string-replace-loader',
                exclude: /node_modules/,
                options: {
                    search: 'elements_prefix',
                    replace: properties.get('jira.issue.project.key'),
                }
            },*/
            {// используем динамическую загрузку CSS
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
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
