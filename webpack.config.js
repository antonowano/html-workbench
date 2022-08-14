const HandlebarsPlugin = require('handlebars-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: devMode ? 'development' : 'production',
    devtool: 'source-map',
    entry: {
        index: './src/pages/index.js',
    },
    devServer: {
        watchFiles: ['src/**/*'],
    },
    output: {
        filename: 'assets/js/[name].js',
        path: __dirname + '/dist',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
        }),
        new HandlebarsPlugin({
            entry: __dirname + '/src/pages/*.hbs',
            output: __dirname + '/dist/[name].html',
            partials: [
                __dirname + '/src/components/*/*.hbs',
            ],
            data: __dirname + '/src/data.json',
            helpers: {
                devMode: () => devMode,
            }
        }),
    ],
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            'imagemin-gifsicle',
                            'imagemin-mozjpeg',
                            'imagemin-optipng',
                            'imagemin-svgo',
                        ]
                    }
                }
            }),
        ]
    }
};
