const path = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';


console.log(`Building for environment: ${nodeEnv}`);

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.bundle.js'
    }),
    new webpack.optimize.DedupePlugin(),

    // expose buddybuild env vars.
    new webpack.EnvironmentPlugin([
      "BUDDYBUILD_BUILD_NUMBER",
      "BUDDYBUILD_BRANCH"
    ])
];

if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap: false,
        minimize: true,
        comments: false,
        mangle: false
    }));
}

module.exports = {
    devtool: isProd ? undefined : 'source-map',
    entry: {
        js: path.resolve(__dirname, 'app/app.ts'),
        vendor: [
            path.normalize('es6-shim/es6-shim.min'),
            'reflect-metadata',
            'zone.js/dist/zone',
            'ionic-angular'
        ]
    },
    output: {
        path: path.resolve('www/build'),
        filename: 'app.bundle.js',
        pathinfo: false,
        publicPath: "/"
    },
    module: {
        preLoaders: [{
            test: /\.ts$/,
            loader: 'tslint'
        }],
        loaders: [{
            test: /\.ts$/,
            loader: 'awesome-typescript',
            query: {
                doTypeCheck: false,
                resolveGlobs: false
            },
            include: [path.resolve(__dirname, 'app')],
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            include: path.resolve('node_modules'),
            loader: 'strip-sourcemap'
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.json/,
            loader: 'json'
        }, {
            test: /.*\.(scss|css)$/i,
            loaders: [ 'style', 'css', 'sass' ]
        }, {
            test: /.*\.(gif|png|jpg|jpeg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=build/[hash].[ext]',
                'image-webpack?{progressive:true, optimizationLevel: 1, interlaced: false, pngquant:{quality: "65-90", speed: 10}}'
            ]
        }, {
            test: /\.(eot|woff|ttf|svg|otf)$/,
            loader: 'url?limit=1000'
        }],
        noParse: [
            /es6-shim/,
            /reflect-metadata/,
            /zone\.js(\/|\\)dist(\/|\\)zone-microtask/
        ]
    },
    tslint: {
        emitErrors: true
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
        modules: [
            path.resolve(__dirname, 'app'),
            'node_modules'
        ],
        alias: {
            assets: path.resolve(__dirname, 'app/assets'),
            components: path.resolve(__dirname, 'app/components'),
            models: path.resolve(__dirname, 'app/models'),
            pages: path.resolve(__dirname, 'app/pages'),
            pipes: path.resolve(__dirname, 'app/pipes'),
            services: path.resolve(__dirname, 'app/services'),
            utils: path.resolve(__dirname, 'app/utils')
        }
    },
    plugins
};
