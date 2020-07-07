const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FileManagerPlugin = require('filemanager-webpack-plugin');

/*const PropertiesReader = require('properties-reader');
let properties = PropertiesReader('../src/main/resources/application.properties');*/
module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    entry: {
        intranetButton: ['./src/utils/polyfills.js','./src/intranetButton.js'],
        ctrlEnter: ['./src/utils/polyfills.js','./src/ctrlEnter.js'],
        dummy: ['./src/utils/polyfills.js','./src/dummy.js']
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
        new FileManagerPlugin({
            onEnd: {
                copy: [
                    // кладем бандля в приложение спрингбут как статик ресурс
                    {source: path.resolve(__dirname, 'dist')+'/*.js', destination: path.resolve(__dirname, '../src/main/resources/static')},
                ],
            }
        })
    ],
};
console.warn(process.env.NODE_ENV);
