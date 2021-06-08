const path = require('path');
//console.log("**************INDIVIDUAL WEBPACK CONFIG**********", path.resolve(__dirname, '../Application/' + process.env.ApplicationFolderName + "/Controller/Bundles/ServerBuild"));
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const res = p => path.resolve(__dirname, p);
const LoadablePlugin = require('../../../../Arcadix.i.Product.React.Bundle/node_modules/@loadable/webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const Webpack = require('../../../../Arcadix.i.Product.React.Bundle/node_modules/webpack');

var ClientIndexFilePath = "../../../Core/1_AppIndex/Index.js";
const ServerRenderFilePath = '../../../Core/5_ServerRender/ServerRender.js';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AppFolderClient = process.env.ApplicationRoot !== undefined ? process.env.ApplicationRoot + '/' : '';
const RootClient = process.env.ApplicationRoot !== undefined ? process.env.ApplicationRoot : '';

var babelOptions = {
    "presets": [
        [path.resolve(__dirname, "../../../../Arcadix.i.Product.React.Bundle/node_modules/@babel/preset-env"), {
            "targets": {
                "browsers": ["last 2 versions", "> 2%"]
            }
        }],
        path.resolve(__dirname, "../../../../Arcadix.i.Product.React.Bundle/node_modules/@babel/preset-react")
    ],
    "plugins": [
        path.resolve(__dirname, "../../../../Arcadix.i.Product.React.Bundle/node_modules/@babel/plugin-transform-spread"),
        path.resolve(__dirname, "../../../../Arcadix.i.Product.React.Bundle/node_modules/react-hot-loader/babel"),
        path.resolve(__dirname, "../../../../Arcadix.i.Product.React.Bundle/node_modules/@loadable/babel-plugin"),
        path.resolve(__dirname, "../../../../Arcadix.i.Product.React.Bundle/node_modules/@babel/plugin-transform-runtime")
    ]
};

const loaderRules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelOptions
            }
        ]
    },
    {
        test: [/\.bmp$/, /\.jpe?g$/, /\.png$/],
        use: [
            {
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    {
        test: [/\.svg$/, /\.gif$/],
        use: [
            {
                loader: "optimized-images-loader",
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    }, 
    { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
    { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
    { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
    { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }    
];

const webpackPlugins = [
    new WebpackCleanupPlugin(),
    new LoadablePlugin()
];

const csr = {
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    mode: 'development',
    node: {
        __dirname: true
    },
    entry: {
        index: res(ClientIndexFilePath)
    },
    output: {
        path: res('../../../../Arcadix.i.Product.React.Bundle/Development/' + process.env.ApplicationFolderName + "/ClientBuild/"),
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        publicPath: '/Bundle/' + process.env.ApplicationFolderName + "/ClientBuild/",
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: loaderRules
    },
    resolve: {
        modules: [path.join(__dirname, '../../../../Arcadix.i.Product.React.Bundle/node_modules')],
        extensions: [".js", ".css"],
        alias: {
            '@root': path.join(__dirname, '../../../'),
            '@rootclient': path.join(__dirname, '../../../' + RootClient),
            '@shared': path.join(__dirname, '../../../../Arcadix.h.Product.BusinessLogic'),
            '@sharedclient': path.join(__dirname, '../../../../Arcadix.h.Product.BusinessLogic.Client'),
            '@appfolder': path.join(__dirname, '../../../' + AppFolderClient + process.env.ApplicationFolderName),
            '@inlineimage': path.join(__dirname, '../../../../Arcadix.h.Product.Resources/Themes/Default/0.InlineImage'),
            'react-dom': '@hot-loader/react-dom',
            '@intranetdefaulttheme': path.join(__dirname, '../../../../Arcadix.h.Product.Resources/Themes/Default/c.Intranet/Skin2018')
        }
    },
    plugins: [...webpackPlugins,
        new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'BundleAnalysisReport.html',
        openAnalyzer: false
        })],
    optimization: {
        minimize: false,
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

const csrAdditionalBuild = {
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    mode: 'development',
    node: {
        __dirname: true
    },
    entry: {
        index: res(ClientIndexFilePath)
    },
    output: {
        path: res('../../../../Arcadix.i.Product.React.Bundle/Development/' + process.env.AdditionalBuildFolderName + "/ClientBuild/"),
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        publicPath: '/Bundle/' + process.env.AdditionalBuildFolderName + "/ClientBuild/",
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: loaderRules
    },
    resolve: {
        modules: [path.join(__dirname, '../../../../Arcadix.i.Product.React.Bundle/node_modules')],
        extensions: [".js", ".css"],
        alias: {
            '@root': path.join(__dirname, '../../../'),
            '@rootclient': path.join(__dirname, '../../../' + RootClient),
            '@shared': path.join(__dirname, '../../../../Arcadix.h.Product.BusinessLogic'),
            '@sharedclient': path.join(__dirname, '../../../../Arcadix.h.Product.BusinessLogic.Client'),
            '@appfolder': path.join(__dirname, '../../../' + AppFolderClient + process.env.ApplicationFolderName),
            '@appfolderclient': path.join(__dirname, '../../../../Arcadix.i.Product.React.Client/' + process.env.ApplicationFolderName),
            '@inlineimage': path.join(__dirname, '../../../../Arcadix.h.Product.Resources/Themes/Default/0.InlineImage'),
            'react-dom': '@hot-loader/react-dom',
            '@intranetdefaulttheme': path.join(__dirname, '../../../../Arcadix.h.Product.Resources/Themes/Default/c.Intranet/Skin2018')
        }
    },
    plugins: [...webpackPlugins,
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'BundleAnalysisReport.html',
        openAnalyzer: false
    })]
};

const ssr = {
    name: 'server',
    target: 'node',
    mode: 'development',
    devtool: 'source-map',
    node: {
        __dirname: true
    },
    entry: {
        ServerRender: res(ServerRenderFilePath)
    },
    output: {
        path: res('../../../../Arcadix.i.Product.React.Bundle/Development/' + process.env.ApplicationFolderName + "/ServerBuild"),
        filename: '[name].js',
        chunkFilename: "[name].chunk.js",
        publicPath: '/Bundle/' + process.env.ApplicationFolderName + "/ServerBuild/",
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: loaderRules
    },
    resolve: {
        modules: [path.join(__dirname, '../../../../Arcadix.i.Product.React.Bundle/node_modules')],
        extensions: [".js", ".css"],
        alias: {
            '@root': path.join(__dirname, '../../../'),
            '@rootclient': path.join(__dirname, '../../../' + RootClient),
            '@shared': path.join(__dirname, '../../../../Arcadix.h.Product.BusinessLogic'),
            '@sharedclient': path.join(__dirname, '../../../../Arcadix.h.Product.BusinessLogic.Client'),
            '@appfolder': path.join(__dirname, '../../../' + AppFolderClient + process.env.ApplicationFolderName),
            '@appfolderclient': path.join(__dirname, '../../../../Arcadix.i.Product.React.Client/' + process.env.ApplicationFolderName),
            '@inlineimage': path.join(__dirname, '../../../../Arcadix.h.Product.Resources/Themes/Default/0.InlineImage'),
            '@intranetdefaulttheme': path.join(__dirname, '../../../../Arcadix.h.Product.Resources/Themes/Default/c.Intranet/Skin2018')
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

const ssrAdditionalBuild = {
    name: 'server',
    target: 'node',
    mode: 'development',
    devtool: 'source-map',
    node: {
        __dirname: true
    },
    entry: {
        ServerRender: res(ServerRenderFilePath)
    },
    output: {
        path: res('../../../../Arcadix.i.Product.React.Bundle/Development/' + process.env.AdditionalBuildFolderName + "/ServerBuild"),
        filename: '[name].js',
        chunkFilename: "[name].chunk.js",
        publicPath: '/Bundle/' + process.env.AdditionalBuildFolderName + "/ServerBuild/",
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: loaderRules
    },
    resolve: {
        modules: [path.join(__dirname, '../../../../Arcadix.i.Product.React.Bundle/node_modules')],
        extensions: [".js", ".css"],
        alias: {
            '@root': path.join(__dirname, '../../../'),
            '@rootclient': path.join(__dirname, '../../../' + RootClient),
            '@shared': path.join(__dirname, '../../../../Arcadix.h.Product.BusinessLogic'),
            '@sharedclient': path.join(__dirname, '../../../../Arcadix.h.Product.BusinessLogic.Client'),
            '@appfolder': path.join(__dirname, '../../../' + AppFolderClient + process.env.ApplicationFolderName),
            '@appfolderclient': path.join(__dirname, '../../../../Arcadix.i.Product.React.Client/' + process.env.ApplicationFolderName),
            '@inlineimage': path.join(__dirname, '../../../../Arcadix.h.Product.Resources/Themes/Default/0.InlineImage'),
            '@intranetdefaulttheme': path.join(__dirname, '../../../../Arcadix.h.Product.Resources/Themes/Default/c.Intranet/Skin2018')
        }
    },
    plugins: [...webpackPlugins,
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'BundleAnalysisReport.html',
        openAnalyzer: false
    })]
};

if (process.env.DevIndex && process.env.DevIndex == "Y") {
    //if (process.env.AdditionalBuildFolderName != undefined)
    //    module.exports = [csr, csrAdditionalBuild];
    //else
        module.exports = [csr];
}
else {
    //if (process.env.AdditionalBuildFolderName != undefined)
    //    module.exports = [csr, ssr, csrAdditionalBuild, ssrAdditionalBuild];
    //else
        module.exports = [csr, ssr];
}



