const path = require('path');
const LoadablePlugin = require('/Arcadix.i.Product.React.Bundle/node_modules/@loadable/webpack-plugin')
const WebpackCleanupPlugin = require('/Arcadix.i.Product.React.Bundle/node_modules/webpack-cleanup-plugin');
const Webpack = require('/Arcadix.i.Product.React.Bundle/node_modules/webpack');

const ClientIndexFilePath = "../../../Core/1_AppIndex/Index.js";
const ServerRenderFilePath = '../../../Core/5_ServerRender/ServerRender.js';
const res = p => path.resolve(__dirname, p);
const base = { mode: 'development' };
const BundleAnalyzerPlugin = require('/Arcadix.i.Product.React.Bundle/node_modules/webpack-bundle-analyzer').BundleAnalyzerPlugin;


var babelOptions = {
    "presets": [
        [path.resolve(__dirname, "/Arcadix.i.Product.React.Bundle/node_modules/@babel/preset-env"), {
            "targets": {
                "browsers": ["last 2 versions", "> 2%"]
            }
        }],
        path.resolve(__dirname, "/Arcadix.i.Product.React.Bundle/node_modules/@babel/preset-react")
    ],
    "plugins": [
        path.resolve(__dirname, "/Arcadix.i.Product.React.Bundle/node_modules/@babel/plugin-transform-spread"),
        path.resolve(__dirname, "/Arcadix.i.Product.React.Bundle/node_modules/react-hot-loader/babel"),
        path.resolve(__dirname, "/Arcadix.i.Product.React.Bundle/node_modules/@loadable/babel-plugin"),
        path.resolve(__dirname, "/Arcadix.i.Product.React.Bundle/node_modules/@babel/plugin-transform-runtime")
    ]
};

const loaderRules = [
    {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelOptions
            },
            {
                loader: 'webpack-strip-block'
            }
        ]
    },
    {
        test: [/\.bmp$/,/\.jpe?g$/, /\.png$/],
        loader: require.resolve('/Arcadix.i.Product.React.Bundle/node_modules/url-loader'),
        options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
        }
    },
    {
        test: [/\.svg$/, /\.gif$/],
        loader: "optimized-images-loader",
        options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
        }
    },
    { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
    { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
    { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
    { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' },
];

const webpackPlugins = [
    new WebpackCleanupPlugin(),
    new LoadablePlugin()
];

//Client side webpack configuration
const ClientSideConfiguration = (objParams) => {

    return {
        ...base,
        name: 'client',
        target: 'web',
        devtool: 'source-map',
        mode: 'production',
        node: {
            __dirname: true
        },
        entry: {
            index: res(ClientIndexFilePath)
        },
        output: {
            path: res('/Arcadix.i.Product.React.Bundle/Production/' + objParams.ApplicationFolderName + "/ClientBuild"),
            filename: '[name].js',
            chunkFilename: "[name].chunk.js",
            publicPath: '/Bundle/' + objParams.ApplicationFolderName + "/ClientBuild/",
            libraryTarget: 'commonjs2'
        },
        module: {
            rules: loaderRules
        },
        resolve: {
            modules: [path.join(__dirname, '/Arcadix.i.Product.React.Bundle/node_modules')],
            extensions: [".js", ".css"],
            alias: {
                '@root': path.join(__dirname, '../../../'),
                '@shared': path.join(__dirname, '/Arcadix.h.Product.BusinessLogic'),
                '@appfolder': path.join(__dirname, '../../../' + objParams.ApplicationFolderName),
                '@inlineimage': path.join(__dirname, '/Arcadix.h.Product.Resources/Themes/Default/0.InlineImage'),
                '@intranetdefaulttheme': path.join(__dirname, '/Arcadix.h.Product.Resources/Themes/Default/c.Intranet/Skin2018'),
                'react-dom$': 'react-dom/profiling',
                'scheduler/tracing': 'scheduler/tracing-profiling',
            }
        },
        plugins: [...webpackPlugins,
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'BundleAnalysisReport.html',
            openAnalyzer: false
        })],
        optimization: {
            minimize: objParams.MinimizeChunk,
            splitChunks: {
                minChunks: Infinity,
                cacheGroups: {
                    ReactAndReactDOM: {
                        chunks: 'all',
                        name: 'ReactAndReactDOM',
                        test: /[\\/]node_modules[\\/](react|@hot-loader[\\/]react-dom)[\\/]/,
                        priority: 40,
                        enforce: true,                        
                    },
                    Lodash: {
                        chunks: 'all',
                        name: 'Lodash',
                        test: /[\\/]node_modules[\\/]lodash[\\/]/,
                        priority: 40,
                        enforce: true,
                    },
                    Object: {
                        chunks: 'all',
                        name: 'Object',
                        test: /[\\/]Arcadix.h.Product.BusinessLogic[\\/]Object[\\/]/,
                        priority: 40,
                        enforce: true,
                    },
                },
            },
        }
    };
}

//Server side webpack configuration
const ServerSideConfiguration = (objParams) => {
    return {
        ...base,
        name: 'server',
        target: 'node',
        devtool: 'source-map',
        mode: 'production',
        node: {
            __dirname: true
        },
        entry: {
            serverrender: res(ServerRenderFilePath)
        },
        output: {
            path: res('/Arcadix.i.Product.React.Bundle/Production/' + objParams.ApplicationFolderName + "/ServerBuild"),
            filename: '[name].js',
            chunkFilename: "[name].chunk.js",
            publicPath: '/Bundle/' + objParams.ApplicationFolderName + "/ClientBuild/",
            libraryTarget: 'commonjs2'
        },
        module: {
            rules: loaderRules
        },
        resolve: {
            modules: [path.join(__dirname, '/Arcadix.i.Product.React.Bundle/node_modules')],
            extensions: [".js", ".css"],
            alias: {
                '@root': path.join(__dirname, '../../../'),
                '@shared': path.join(__dirname, '/Arcadix.h.Product.BusinessLogic'),
                '@appfolder': path.join(__dirname, '../../../' + objParams.ApplicationFolderName),
                '@inlineimage': path.join(__dirname, '/Arcadix.h.Product.Resources/Themes/Default/0.InlineImage'),
                '@intranetdefaulttheme': path.join(__dirname, '/Arcadix.h.Product.Resources/Themes/Default/c.Intranet/Skin2018'),
                'react-dom$': 'react-dom/profiling',
                'scheduler/tracing': 'scheduler/tracing-profiling',
            }
        },
        plugins: [...webpackPlugins,
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'BundleAnalysisReport.html',
                openAnalyzer: false
            }),
            new Webpack.IgnorePlugin(/canvas/)
        ]        
    };
}

module.exports = {
    ClientSideConfiguration: ClientSideConfiguration,
    ServerSideConfiguration: ServerSideConfiguration
}; 