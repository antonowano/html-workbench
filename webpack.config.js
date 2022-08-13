const PugPlugin = require('pug-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    devtool: 'inline-source-map',
    entry: {
        index: './src/pages/index.pug',
    },
    devServer: {
        watchFiles: ['src/**/*'],
    },
    output: {
        filename: 'assets/js/[name].[contenthash:8].js',
        path: __dirname + '/dist',
    },
    module: {
        rules: [
            {
                test: /\.pug$/i,
                loader: PugPlugin.loader,
                options: {
                    method: 'render',
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['css-loader', 'sass-loader'],
            },
        ]
    },
    plugins: [
        new PugPlugin({
            extractCss: {
                filename: 'assets/css/[name].[contenthash:8].css',
            },
        }),
    ]
};
